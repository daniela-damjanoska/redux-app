import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IBlogCard } from "../Components/BlogCard";

import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import BlogCard from "../Components/BlogCard";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

const styles = {
  boxHeight: { height: "70vh" },
  img: {
    width: "100%",
    display: "block",
    height: "100%",
  },
};

const BlogPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>(""),
    [isFiltering, setIsFiltering] = useState<boolean>(false),
    matches = useMediaQuery("(min-width:768px)");

  const blogItems = useSelector((state: any) => state.blogItems.blogItems),
    filteredItems = useSelector(
      (state: any) => state.blogItems.filteredBlogItems
    ),
    loading = useSelector((state: any) => state.blogItems.loading),
    error = useSelector((state: any) => state.blogItems.error); //selector function

  useEffect(() => {
    searchValue === "" ? setIsFiltering(false) : setIsFiltering(true);
  }, [searchValue]);

  const getSearchValue = (value: string) => setSearchValue(value);

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
              ? filteredItems?.map((item: IBlogCard) => (
                  <Grid item xs={12} lg={6} key={item.id}>
                    <BlogCard
                      title={item.title}
                      body={item.body}
                      id={item.id}
                    />
                  </Grid>
                ))
              : blogItems?.map((item: IBlogCard) => (
                  <Grid item xs={12} lg={6} key={item.id}>
                    <BlogCard
                      title={item.title}
                      body={item.body}
                      id={item.id}
                    />
                  </Grid>
                ))}
            {isFiltering && filteredItems?.length === 0 && (
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

export default BlogPage;
