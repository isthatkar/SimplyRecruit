import { createTheme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";
import * as React from "react";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  interface Palette {
    neutral: Palette["primary"];
  }

  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }

  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }

  interface ThemeOptions {
    status: {
      danger: React.CSSProperties["color"];
    };
  }
}

export const Theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#1a237e",
    },
    error: {
      main: "#ff0000",
    },
    neutral: {
      main: "#a5adf5",
    },
    secondary: {
      main: "#7986cb",
    },
  },
});

export const useStyles = makeStyles(() =>
  createStyles({
    calendarContainer: {
      margin: "0 auto",
      padding: "20px",
      width: "80%",
      maxHeight: "5px",
    },
    calendarHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    listItemWithHover: {
      width: "100%",
      borderRadius: 2,
      "&:hover": {
        backgroundColor: "#e0e2f2",
      },
    },
    root: {
      flexGrow: 1,
      height: "100vh",
    },
    imageContainer: {
      height: "100%",
      [Theme.breakpoints.up("md")]: {
        flexBasis: "40%",
      },
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: Theme.spacing(2),
      [Theme.breakpoints.up("md")]: {
        flexBasis: "60%",
      },
    },
    title: {
      fontWeight: "bold",
      marginBottom: Theme.spacing(2),
      textAlign: "center",
    },
    button: {
      marginTop: Theme.spacing(2),
    },
  })
);

export const RowStackCenter = styled(Stack)({
  paddingTop: 4,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

export const RowStackLeft = styled(Stack)({
  paddingTop: 4,
  display: "flex",
  flexDirection: "row",
  justifyContent: "left",
  alignItems: "center",
});

export const RowStackItemsBetween = styled(Stack)({
  paddingTop: 4,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

export const ColumnStackCenter = styled(Stack)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const ColumnStackStrech = styled(Stack)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "strech",
});

export const CenteredContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
