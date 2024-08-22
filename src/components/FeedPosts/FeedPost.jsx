import { Box, Image } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

export default function FeedPost ({post}) {
  return (
    <>
      {/*<PostHeader post={post} />*/}
      <Box
      my={2}
      borderRadius={"4"}
      overflow={"hidden"}

      >
        <Image src={post.imageURL} alt={"FEED POST IMAGE"}/>
      </Box>
      {/*<PostFooter username={username}/>*/}
    </>  
  );
};
