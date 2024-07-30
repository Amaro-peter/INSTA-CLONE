import { Box, VStack, Image, Input } from '@chakra-ui/react';
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

        {!isLogin ? (
          <Input 
          placeholder='Confirm Password'
          fontsize={14}
          type="password"
        />
        ) : null}

        
      </VStack>
    </Box>
  </>;
}

