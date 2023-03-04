import { Grid, Typography, Button } from "@mui/material";
import React from "react";
import { useStyles } from "../Styles/Theme";
import image from "../img/Projects/project4.png";

const Home = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} md={6} className={classes.imageContainer}>
        <img src={image} alt="background" className={classes.image} />
      </Grid>
      <Grid item xs={12} md={6} className={classes.contentContainer}>
        <Typography variant="h4" component="h1" className={classes.title}>
          Welcome to our recruiting website!
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center">
          We help connect top talent with leading companies. Whether youre an
          employer looking to hire, or a job seeker looking for your next
          opportunity, were here to help.
        </Typography>
        <Button variant="contained" color="primary" className={classes.button}>
          Learn More
        </Button>
      </Grid>
    </Grid>
  );
};

export default Home;
