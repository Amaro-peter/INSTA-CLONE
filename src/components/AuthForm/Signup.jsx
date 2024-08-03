import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { InputGroup, InputRightElement, Button, Alert, AlertIcon } from '@chakra-ui/react';
import { Input } from "@chakra-ui/input";
import { useState } from 'react';
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword';  

export default function Signup() {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
      });

    const [showPassword, setShowPassword] = useState(false);
    const {signup, errorMessage} = useSignUpWithEmailAndPassword();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await signup(inputs);
    };

  return (
    <>
      <Input 
        placeholder='Email'
        fontSize={14}
        type='email'
        value={inputs.email}
        size={"sm"}
        onChange={(e) => setInputs({...inputs, email: e.target.value})}
      />

      <Input 
        placeholder='Username'
        fontSize={14}
        type='email'
        value={inputs.username}
        size={"sm"}
        onChange={(e) => setInputs({...inputs, username: e.target.value})}
      />

      <Input 
        placeholder='Full Name'
        fontSize={14}
        type='email'
        value={inputs.fullName}
        size={"sm"}
        onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
      />    

      <InputGroup>
        <Input 
          placeholder='Password'
          fontSize={14}
          type= {showPassword ? "text" : "password"}
          value={inputs.password}
          size={"sm"}
          onChange={(e) => setInputs({...inputs, password: e.target.value})}
        />

        <InputRightElement h="full">
          <Button varian={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <ViewIcon /> : <ViewOffIcon /> }

          </Button>
        </InputRightElement>
      </InputGroup>

      <Button w="full" colorScheme='blue' size={"sm"} fontSize={14}
      onClick={handleSubmit}>
        Sign up
      </Button>

      {errorMessage && (
                <Alert status="error" w="full" fontSize={14}>
                    <AlertIcon />
                    {errorMessage}
                </Alert>
      )}
    </>

    
  )
}