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
        comment: "Didn't really like him",
      },
      {
        id: 3,
        userEmail: "vardas.test@gmail.com",
        rating: 1,
        comment: "Very bad, rude and arrogant",
      },
      {
        id: 4,
        userEmail: "vardas.test@gmail.com",
        rating: 3,
        comment: "Could improve his technical knowledge",
      },
      {
        id: 5,
        userEmail: "vardas.test@gmail.com",
        rating: 4,
        comment: "Not bad",
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              width: "80%",
              maxWidth: "900",
              "@media (max-width: 900px)": {
                width: "100%",
              },
            }}
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Typography align="center" variant="h5" sx={{ mb: 5 }}>
              APPLICANT REVIEWS
            </Typography>
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
