import { Box, Grid, Skeleton, VStack } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import NoPostsFound from "../FeedPosts/NoPostsFound";


export default function ProfilePosts() {

  
  const { isLoading, posts } = useGetUserPosts();

  const noPostFound = !isLoading && posts.length === 0
  if(noPostFound) {
    return <NoPostsFound />
  }

  return (
    <Grid
    templateColumns={{sm:"repeat(1, 1fr)", md:"repeat(3, 1fr)"}}
    gap={1}
    columnGap={1}
    >
      {isLoading && [0, 1, 2].map((_,idx) => (
        <VStack key={idx} alignItems={"flex-start"} >
          <Skeleton w={"full"}>
            <Box h="300px">
              Contents wrapped
            </Box>
          </Skeleton>
        </VStack>
      ))}

      {!isLoading  && (
        <>
          {posts.map((post) => (
            <ProfilePost post={post} key={post.id} posts={posts} />
          ))}
        </>
      )}
    </Grid>
  )
}
