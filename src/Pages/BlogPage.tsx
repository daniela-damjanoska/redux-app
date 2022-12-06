import React, { useEffect, useState, useCallback } from "react";
import useFetch from "../Hooks/useFetch";
import { useSelector, useDispatch } from "react-redux";
import { IBlogCard } from "../Components/BlogCard";
import {
  blogItemsFilteredByQuery,
  allblogItemsShown,
  blogItemDeleted,
} from "../Features/BlogItems/blogItemsSlice";

import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import BlogCard from "../Components/BlogCard";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

interface IDataItem {
  id: number;
  title: string;
  body: string;
}

type DataArr = IDataItem[];

const styles = {
  boxHeight: { height: "70vh" },
  img: {
    width: "100%",
    display: "block",
    height: "100%",
  },
};

const selectBlogItems = (state: any) => state.blogItems;

const Blog: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>(""),
    [id, setId] = useState<number | string>(""),
    [isFiltering, setIsFiltering] = useState<boolean>(false);

  const matches = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();

  const [data, loading, error] = useFetch<DataArr>(
    "http://jsonplaceholder.typicode.com/posts/?_limit=20",
    []
  );

  const blogItems = useSelector(selectBlogItems);

  useEffect(() => {
    searchValue === "" ? setIsFiltering(false) : setIsFiltering(true);
  }, [searchValue]);

  useEffect(() => {
    if (isFiltering) dispatch(blogItemsFilteredByQuery(searchValue));
    else dispatch(allblogItemsShown());
    //eslint-disable-next-line
  }, [isFiltering]); // dispatch, searchValue -> eslint

  useEffect(() => {
    if (typeof id === "number") dispatch(blogItemDeleted(id));
    //eslint-disable-next-line
  }, [id]); // dispatch -> eslint

  const getSearchValue = useCallback(
    (value: string) => setSearchValue(value),
    []
  );

  const getBlogId = useCallback((id: number) => setId(id), []);

  if (error) {
    return (
      <>
        <Navbar />
        <Typography marginTop={20} textAlign="center">
          Something went wrong, please try again later!
        </Typography>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={styles.boxHeight}>
        <img src="./images/banner.jpg" alt="banner" style={styles.img} />
      </Box>
      {!loading ? (
        <Box
          sx={{
            marginY: 7,
            marginX: matches ? 17 : 7,
          }}
        >
          <Search onSearch={getSearchValue} isFiltering={isFiltering} />
          <Grid container spacing={4}>
            {isFiltering
              ? blogItems.filteredBlogItems.map((item: IBlogCard) => (
                  <Grid item xs={12} lg={6} key={item.id}>
                    <BlogCard
                      title={item.title}
                      body={item.body}
                      id={item.id}
                      onGetId={getBlogId}
                    />
                  </Grid>
                ))
              : blogItems.blogItems.map((item: IBlogCard) => (
                  <Grid item xs={12} lg={6} key={item.id}>
                    <BlogCard
                      title={item.title}
                      body={item.body}
                      id={item.id}
                      onGetId={getBlogId}
                    />
                  </Grid>
                ))}
            {isFiltering && blogItems.filteredBlogItems.length === 0 && (
              <Typography
                variant="body2"
                component="div"
                marginTop={5}
                flexGrow={1}
                textAlign="center"
              >
                No post found, please try again!
              </Typography>
            )}
          </Grid>
        </Box>
      ) : (
        <Typography textAlign="center" marginTop={5}>
          Loading...
        </Typography>
      )}
    </>
  );
};

export default Blog;
