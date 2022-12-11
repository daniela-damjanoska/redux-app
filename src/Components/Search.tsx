import React, { useState, ChangeEvent } from "react";
import {
  blogItemsFilteredByQuery,
  filteredItemsNull,
} from "../Features/BlogItems/blogItemsSlice";
import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface ISearch {
  onSearch: (value: string) => void;
  isFiltering: boolean;
}

const styles = {
  box: { mb: 5, display: "flex" },
  color: { color: "primary.main" },
  marginLeft: { ml: 2 },
};

const Search: React.FC<ISearch> = ({ onSearch, isFiltering }) => {
  const [value, setValue] = useState<string>(""),
    dispatch = useDispatch();

  const handleValue = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return (
    <Box sx={styles.box}>
      {!isFiltering && (
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ input: styles.color }}
          value={value}
          onChange={handleValue}
        />
      )}
      {!isFiltering ? (
        <Button
          variant="contained"
          sx={styles.marginLeft}
          onClick={() => {
            onSearch(value);
            setValue("");
            dispatch(blogItemsFilteredByQuery(value));
          }}
        >
          SEARCH
        </Button>
      ) : (
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            onSearch(value);
            dispatch(filteredItemsNull());
          }}
        >
          BACK TO ALL POSTS
        </Button>
      )}
    </Box>
  );
};

export default Search;
