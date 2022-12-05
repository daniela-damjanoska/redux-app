import React, { useEffect, useState, useCallback, useMemo } from "react";
import useFetch from "../Hooks/useFetch";

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

const Blog: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>(""),
    [id, setId] = useState<number | string>(""),
    [isFiltering, setIsFiltering] = useState<boolean>(false);

  const matches = useMediaQuery("(min-width:768px)");

  const [data, loading, error, setData] = useFetch<DataArr>(
    "http://jsonplaceholder.typicode.com/posts/?_limit=20",
    []
  );

  useEffect(() => {
    searchValue === "" ? setIsFiltering(false) : setIsFiltering(true);
  }, [searchValue]);

  useEffect(() => {
    const filteredBlogs = data.filter((el) => el.id !== id);
    setData(filteredBlogs);
  }, [id, data, setData]);

  const dataToRender = useMemo(() => {
    if (!isFiltering) return data;

    return data.filter(
      (el) => el.title.includes(searchValue) || el.body.includes(searchValue)
    );
  }, [isFiltering, searchValue, data]);

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
            {dataToRender.map(({ id, title, body }) => (
              <Grid item xs={12} lg={6} key={id}>
                <BlogCard
                  title={title}
                  desc={body}
                  id={id}
                  onGetId={getBlogId}
                />
              </Grid>
            ))}
            {isFiltering && dataToRender.length === 0 && (
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
