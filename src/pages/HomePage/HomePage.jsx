import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'

export default function HomePage() {
  return (
    <Container maxW={"container.lg"}>
      <Flex>
        <Box>
          FeedPosts
        </Box>
        <Box>
          Suggested
        </Box>
      </Flex>

    </Container>
  )
}
