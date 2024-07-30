import { Box, Button, VStack, Image, Input, Text, Flex } from '@chakra-ui/react';
import { useState } from 'react';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  return <>
    <Box border={"1px solid gray"} borderRadius={4} padding={5}>
      <VStack spacing={4}>
        <Image src='/logo.png' h={24} cursor={"pointer"} alt='Insta Logo' />

        <Input 
          placeholder='Email'
          fontsize={14}
          type='email'
        />

        <Input 
          placeholder='Password'
          fontsize={14}
          type="password"
        />

        {!isLogin ? (<Input placeholder='Confirm Password' fontsize={14} type="password"/>) : null}
        
        <Button w={"full"} colorScheme={"blue"} size={"sm"} fontsize={14}>
          {isLogin?  "Log in" : "Sign up"}
        </Button>

        {/*------------------Or text -------------*/}
        <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
          <Box flex={2} h={"1px"} bg={"gray.400"}/>
          <Text mx={1} color={"white"}>OR</Text>
          <Box flex={2} h={"1px"} bg={"gray.400"}/>
        </Flex>
      </VStack>
    </Box>
  </>;
}

