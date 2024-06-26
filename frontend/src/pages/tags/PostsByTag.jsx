import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useGetPostsByTagQuery } from "../../redux/api/postApi";
import PostItem from "../../components/posts/PostItem";
const PostsByTag = () => {
  const { tag } = useParams();

  const { data, isLoading, isError, error } = useGetPostsByTagQuery(tag);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "An error occurred");
    }
  }, [isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Container maxWidth={"xl"}>
        <Typography variant="h4" gutterBottom>
          Posts tagged with #{tag}
        </Typography>
        <Box display={"flex"} mt={4} gap={4}>
          <Box flex={"2"}>
            <Grid container alignItems="center" spacing={3}>
              {data?.posts?.map((item) => (
                <Grid key={item._id} item xs={12} sm={6}>
                  <PostItem item={item} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default PostsByTag;
