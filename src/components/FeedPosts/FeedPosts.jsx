import { Box, Container, Flex, Text, VStack, SkeletonCircle, Skeleton } from '@chakra-ui/react'
import FeedPost from './FeedPost';
import useGetFeedPosts from '../../hooks/useGetFeedPosts';

export default function FeedPosts() {
  const {isLoading, posts} = useGetFeedPosts()

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading && 
      [0, 1, 2].map((_, idx) => (
        <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
          <Flex gap="2">
            <SkeletonCircle size='10' />
            <VStack gap={2} alignItems={"flex-start"} >
              <Skeleton height='10px' w={"200px"} />
              <Skeleton height='10px' w={"100px"} />
            </VStack>
          </Flex>
          <Skeleton w={"full"}>
            <Box h={"400px"}>contents wrapped</Box>
          </Skeleton>
        </VStack>
      ))}
      {!isLoading && posts.length > 0 && posts.map((post) => <FeedPost key={post.id} post={post} />)}
      {!isLoading && posts.length === 0 && (
        <Flex justifyContent={"center"} alignItems={"center"} h={"full"}>
          <Box 
          fontSize={"large"} 
          color={"white"} 
          fontWeight={"medium"} 
          whiteSpace={"pre-wrap"} 
          wordBreak={"break-word"}
          maxW={"300px"} // Adjust the width as needed
          textAlign={"center"}
          >
            Follow users to see their posts.
          </Box>
        </Flex>
      )}
    </Container>
  );
}
