import React from "react";
import { blogItemDeleted } from "../Features/BlogItems/blogItemsSlice";
import { useDispatch } from "react-redux";
import store from "../store";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export interface IBlogCard {
  title: string;
  body: string;
  id: number;
}

const styles = {
  cardHeight: {
    height: "170px",
  },
  deleteIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    color: "primary.main",
  },
};

const BlogCard: React.FC<IBlogCard> = ({ title, body, id }) => {
  const dispatch = useDispatch();
  return (
    <Card sx={{ position: "relative" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image="./images/blog.jpg"
          alt="blog-item"
        />
        <CardContent sx={styles.cardHeight}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {body}
          </Typography>
          <DeleteOutlineIcon
            onClick={() => dispatch(blogItemDeleted(id))}
            //option with axios:
            // @ts-ignore
            // onClick={() => store.dispatch(deleteBlogItem(id))}
            sx={styles.deleteIcon}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
