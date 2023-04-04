import { Box, Pagination, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReviewListItem from "./ReviewListItem";
import AddReviewDialog from "./AddReviewDialog";
import { ColumnStackCenter, RowStackCenter } from "../../Styles/Theme";
import { Rating } from "../../Types/types";
import axios from "axios";

interface ReviewsTabProps {
  applicationId: number;
}
const ReviewsTab = ({ applicationId }: ReviewsTabProps) => {
  const itemsPerPage = 10;
  const [ratings, setRatings] = React.useState<Rating[]>([]);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);
  const [currentPageItems, setCurrentPageItems] = useState<Rating[]>(ratings);

  const getReviews = useCallback(async () => {
    const response = await axios.get(`applications/${applicationId}/ratings`);
    console.log(response.data);
    const ratings = response.data;

    setRatings(ratings);
    setNumPages(Math.ceil(ratings.length / itemsPerPage));
    setCurrentPageItems(ratings.slice(startIndex, endIndex));
  }, []);

  useEffect(() => {
    getReviews();
  }, []);

  const handleAddObject = (newObject: Rating) => {
    const newRatings = [...ratings, newObject];
    setRatings(newRatings);
    setNumPages(Math.ceil(newRatings.length / itemsPerPage));
    setCurrentPageItems(newRatings.slice(startIndex, endIndex));
  };

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setStartIndex((value - 1) * itemsPerPage);
    setEndIndex(value * itemsPerPage);
  };

  useEffect(() => {
    setCurrentPageItems(ratings.slice(startIndex, endIndex));
  }, [page]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 5,
        }}
      >
        <AddReviewDialog
          applicationId={applicationId}
          onAddObject={handleAddObject}
        ></AddReviewDialog>
      </Box>

      {ratings.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ColumnStackCenter
            sx={{
              width: "80%",
              mb: 8,
              maxWidth: "900",
              "@media (max-width: 900px)": {
                width: "100%",
              },
            }}
            spacing={1}
          >
            <Typography align="center" variant="h5" sx={{ mb: 5 }}>
              APPLICANT REVIEWS
            </Typography>
            <Pagination
              count={numPages}
              page={page}
              onChange={handlePageChange}
            />

            {currentPageItems.map((review) => (
              <ReviewListItem
                key={review.id}
                rating={review}
                onObjectChange={getReviews}
              ></ReviewListItem>
            ))}
          </ColumnStackCenter>
        </Box>
      ) : (
        <RowStackCenter spacing={1}>
          <InfoOutlinedIcon fontSize="large"></InfoOutlinedIcon>
          <Typography align="center" variant="h5">
            NO REVIEWS ADDED YET
          </Typography>
        </RowStackCenter>
      )}
    </div>
  );
};

export default ReviewsTab;
