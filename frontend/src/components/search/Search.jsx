import { Button, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const queryString = [
      title && `title=${encodeURIComponent(title)}`,
      name && `name=${encodeURIComponent(name)}`,
      tags && `tags=${encodeURIComponent(tags)}`,
    ]
      .filter(Boolean)
      .join("&");

    navigate(`/?${queryString}`);
  };

  return (
    <>
      <Paper
        sx={{
          padding: 2,
          width: "100%",
        }}
      >
        <form onSubmit={submitHandler} className="form">
          <TextField
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="search-title"
            label="Search Title"
            variant="filled"
          />
          <TextField
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            id="search-tags"
            label="Search Tags"
            variant="filled"
          />
          <TextField
            id="search-creator"
            label="Search Creator"
            variant="filled"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Search
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Search;
