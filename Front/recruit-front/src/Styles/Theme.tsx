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
  })
);

export const RowStackCenter = styled(Stack)({
  paddingTop: 4,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
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
