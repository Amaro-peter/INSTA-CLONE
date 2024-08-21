import { Avatar, Divider, Flex, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { timeAgo } from "../../utils/timeAgo"
import useUserProfileStore from "../../store/userProfileStore"

function Caption({post}) {
  const userProfile = useUserProfileStore((state) => state.userProfile)

  return (
    <VStack w={"full"} alignItems={"flex-start"} spacing={2}>
        <Flex gap={4}>
            <Link to={`/${userProfile?.username}`}>
                <Avatar src={userProfile?.profilePicURL} size={"sm"}/>
            </Link>
            
            <Flex direction={"column"}>
                <Flex gap={2} alignItems={"center"}>
                    <Link to={`/${userProfile?.username}`}>
                        <Text fontWeight={"bold"} fontSize={12}>
                            {userProfile?.username}
                        </Text>
                    </Link>
                    <Text fontSize={14} color={"white"}>
                        {post.caption}
                    </Text>
                </Flex>
                <Text fontSize={12} color={"gray"}>
                    {timeAgo(post.createdAt)}
                </Text>
            </Flex>

        </Flex>
        <Divider my={4} bg={"gray.500"}/>
    </VStack>    
  )
}

export default Caption