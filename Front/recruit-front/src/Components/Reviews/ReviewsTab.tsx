import { Box, Button, Stack, ThemeProvider, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Theme from "../../Styles/Theme";
import { Meeting, Review } from "../../Types/types";
import ReviewListItem from "./ReviewListItem";
import AddReviewDialog from "./AddReviewDialog";

const ReviewsTab = (props: any) => {
  const [reviews, setReviews] = React.useState<Review[]>([]);

  const getReviews = useCallback(async () => {
    const upcomingMeetings: Review[] = [
      {
        id: 1,
        userEmail: "vardas.test@gmail.com",
        rating: 5,
        comment: "Perfect candidate for this possition in my opinion",
      },
      {
        id: 2,
        userEmail: "vardas.test@gmail.com",
        rating: 2,
        comment: "Perfect candidate for this possition in my opinion",
      },
      {
        id: 3,
        userEmail: "vardas.test@gmail.com",
        rating: 1,
        comment: "Perfect candidate for this possition in my opinion",
      },
      {
        id: 4,
        userEmail: "vardas.test@gmail.com",
        rating: 3,
        comment: "Perfect candidate for this possition in my opinion",
      },
      {
        id: 5,
        userEmail: "vardas.test@gmail.com",
        rating: 4,
        comment: "Perfect candidate for this possition in my opinion",
      },
    ];

    setReviews(upcomingMeetings);
  }, []);

  useEffect(() => {
    getReviews();
  }, []);
  return (
    <ThemeProvider theme={Theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 5,
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <AddReviewDialog></AddReviewDialog>
        </Stack>
      </Box>

      {reviews.length > 0 ? (
        <Box>
          <Typography align="center" variant="h5">
            APPLICANT REVIEWS
          </Typography>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            {reviews.map((review) => (
              <ReviewListItem
                key={review.id}
                rating={review.rating}
                comment={review.comment}
                email={review.userEmail}
              ></ReviewListItem>
            ))}
          </Stack>
        </Box>
      ) : (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <InfoOutlinedIcon fontSize="large"></InfoOutlinedIcon>
          <Typography align="center" variant="h5">
            NO REVIEWS ADDED YET
          </Typography>
        </Stack>
      )}
    </ThemeProvider>
  );
};

export default ReviewsTab;
