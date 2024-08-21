import { Box, Text, Flex, VStack, Link, SkeletonCircle, Skeleton } from '@chakra-ui/react';
import SuggestedHeader from './SuggestedHeader';
import SuggestedUser from './SuggestedUser';
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers';

export default function SuggestedUsers() {
  const {isLoading, suggestedUsers} = useGetSuggestedUsers()

  if(isLoading) {
    return (
      <>
        <VStack py={8} px={6} gap={4}>
          <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"} gap={4}>
            <Flex alignItems={"center"} gap={1}>
              <SkeletonCircle size="10" />
              <Skeleton height={"20px"} width={"100px"} />
            </Flex>
            <Skeleton height="20px" width="50px" />
          </Flex>

          <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
            <Skeleton height={"20px"} width={"30%"} />
            <Box width={"40%"} />
            <Skeleton height={"20px"} width={"10%"} />
          </Flex>
          <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
            <SkeletonCircle size="10" />
            <Skeleton height="20px" width="70%" />
          </Flex>
          <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
            <SkeletonCircle size="10" />
            <Skeleton height="20px" width="70%" />
          </Flex>
          <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
            <SkeletonCircle size="10" />
            <Skeleton height="20px" width="70%" />
          </Flex>
        </VStack>
      </>
    )
  }



  return (
    <VStack py={8} px={6} gap={4}>
        <SuggestedHeader />

        {suggestedUsers.length !== 0 && (
          <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
            <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
              Suggested for you
            </Text>
            <Text fontSize={12} fontWeight={"bold"} _hover={{color:"gray.500"}} cursor={"pointer"}>
              See all
            </Text>
          </Flex>
        )}

        {suggestedUsers.map((user) => (
          <SuggestedUser user={user} key={user.id} />

        ))}


        <Box
        fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}
        >
          2024 Built By{" "}
          <Link href='https://github.com/Amaro-peter' target='blank' color='blue.500' fontSize={14}>
            Pedro Amaro
          </Link>
        </Box>
    </VStack>
  )
}
