import { Badge, Box, Button, Chip, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useCreatePostMutation } from "../../redux/api/postApi";
import ImageUpload from "./ImageUpload";
const Form = () => {
  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [createPost, { isLoading, error, isSuccess }] = useCreatePostMutation();
  //create post start
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Post Create");
      setMessage("");
      setTitle("");
      setTagValue("");
      setImages([]);
      setTags([]);
    }
  }, [isSuccess, error]);
  console.log(images);
  const submitHandler = (e) => {
    e.preventDefault();
    const product = {
      title,
      message,
      tags,
      images,
    };
    createPost(product);
  };

  const clearPost = () => {
    setMessage("");
    setTitle("");
    setTagValue("");
    setImages([]);
    setTags([]);
  };

  //create post finish

  //tags start
  const addTags = (e) => {
    if (e.keyCode === 13 && tagValue) {
      e.preventDefault();
      setTags([...tags, tagValue]);
      setTagValue("");
    }
  };
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };
  //tags finish

  return (
    <>
      <Paper
        sx={{
          padding: 2,
          width: "100%",
          mt: "1rem",
        }}
      >
        <form onSubmit={submitHandler} className="form">
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="filled-basic"
            label="Title"
            name="title"
            variant="filled"
          />
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="filled-basic"
            label="Message"
            name="message"
            variant="filled"
          />
          {tags.length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
                mt: 2,
              }}
            >
              {tags.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => handleDelete(item)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          )}
          <TextField
            id="filled-basic"
            value={tagValue}
            onChange={(e) => setTagValue(e.target.value)}
            label="Tags & Enter"
            name="tagValue"
            variant="filled"
            onKeyDown={addTags}
          />
          <ImageUpload setImages={setImages} />
          <Button disabled={isLoading} type="submit" variant="contained">
            {isLoading ? "Loading" : "Create"}
          </Button>
          <Button onClick={clearPost} type="button" variant="outlined">
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Form;
