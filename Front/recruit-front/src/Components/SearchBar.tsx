import {
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  TextField,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}
const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <Box
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 250 }}
    >
      <TextField
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        inputProps={{ "aria-label": "search..." }}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          "aria-label": "search",
        }}
      />
    </Box>
  );
};

export default SearchBar;
