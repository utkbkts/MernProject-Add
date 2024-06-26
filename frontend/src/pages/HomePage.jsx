import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PostItem from "../components/posts/PostItem";
import Search from "../components/search/Search";
import Form from "../components/form/Form";
import PaginationPage from "../components/pagination/PaginationPage";
import { useSearchParams } from "react-router-dom";
import { useGetPostsQuery, useLikePostMutation } from "../redux/api/postApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const HomePage = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const title = searchParams.get("title") || "";
  const name = searchParams.get("name") || "";
  const tags = searchParams.get("tags") || "";

  const params = { page, title, name, tags };

  const { data, isLoading, isError, error } = useGetPostsQuery(params);
  const { user } = useSelector((state) => state.auth);
  //liked
  const [likePost, { isSuccess, isError: isErrorLiked, error: likeError }] =
    useLikePostMutation();

  const handleLike = async (id) => {
    await likePost({ id, userId: user._id });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Post liked successfully!");
    }
    if (isErrorLiked) {
      toast.error("You may like it once");
    }
  }, [isSuccess, isErrorLiked]);
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth={"xl"}>
      <Box display={"flex"} mt={4} gap={4}>
        <Box flex={"2"}>
          <Grid container alignItems="center" spacing={3}>
            {data?.posts?.map((item) => (
              <Grid key={item._id} item xs={12} sm={6}>
                <PostItem item={item} liked={handleLike} />
              </Grid>
            ))}
          </Grid>
        </Box>
        {user ? (
          <Box flex={"1"}>
            <Search />
            <Form />
          </Box>
        ) : null}
      </Box>
      <PaginationPage
        filteredProductsCount={data?.FilteredProductCount}
        resPerPage={data?.resPerPage}
      />
    </Container>
  );
};

export default HomePage;
