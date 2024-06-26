import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { MdDelete, MdThumbDownAlt, MdMore } from "react-icons/md";
import { Button, CardMedia } from "@mui/material";
import moment from "moment";
import ImageSlider from "./ImageSlider";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDeleteProductMutation } from "../../redux/api/postApi";
const PostItem = ({ item, liked }) => {
  const { user } = useSelector((state) => state.auth);
  const [deleteProduct] = useDeleteProductMutation();
  return (
    <Card className={"card"}>
      <div className={"overlay"}>
        <Typography variant="h6">{item?.user?.name}</Typography>
        <Typography className="body2" variant="body2">
          {moment(item.createdAt).format("LL")}
        </Typography>
      </div>
      <ImageSlider item={item} />
      <div className={"details"}>
        {item.tags.map((item) => (
          <Link to={`/tags/${item}`}>
            <Button variant="contained">#{item}</Button>
          </Link>
        ))}
      </div>

      <Typography className={"title"} gutterBottom variant="h5" component="h2">
        {item.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {item.message}
        </Typography>
      </CardContent>
      <CardActions className={"actions"}>
        <Button onClick={() => liked(item._id)} size="small" color="primary">
          <MdThumbDownAlt fontSize="small" /> Like {item.likeCount}
        </Button>
        {user && user._id === item.user._id && (
          <Button
            onClick={() => deleteProduct(item._id)}
            size="small"
            color="primary"
          >
            <MdDelete fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default PostItem;
