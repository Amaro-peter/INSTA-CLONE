import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { InputGroup, InputRightElement, Button, Alert, AlertIcon } from '@chakra-ui/react';
import { Input } from "@chakra-ui/input";
import { useState, useEffect } from 'react';
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword';  

export default function Signup() {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
      });

    const [showPassword, setShowPassword] = useState(false);
    const {signup, errorMessage, setErrorMessage, loading} = useSignUpWithEmailAndPassword();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await signup(inputs);
    };

    const handleInputFocus = () => {
      if (errorMessage) {
          setErrorMessage(null);
      }
    };

    useEffect(() => {
      // No need to reset errorMessage here as it's handled by handleInputFocus
    }, [inputs, setErrorMessage]);

    

  return (
    <>
      <Input 
        placeholder='Email'
        fontSize={14}
        type='email'
        value={inputs.email}
        size={"sm"}
        onChange={(e) => setInputs({...inputs, email: e.target.value})}
        onFocus={handleInputFocus}
      />

      <Input 
        placeholder='Username'
        fontSize={14}
        type='email'
        value={inputs.username}
        size={"sm"}
        onChange={(e) => setInputs({...inputs, username: e.target.value})}
        onFocus={handleInputFocus}
      />

      <Input 
        placeholder='Full Name'
        fontSize={14}
        type='email'
        value={inputs.fullName}
        size={"sm"}
        onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
        onFocus={handleInputFocus}
      />    

      <InputGroup>
        <Input 
          placeholder='Password'
          fontSize={14}
          type= {showPassword ? "text" : "password"}
          value={inputs.password}
          size={"sm"}
          onChange={(e) => setInputs({...inputs, password: e.target.value})}
          onFocus={handleInputFocus}
        />

        <InputRightElement h="full">
          <Button varian={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <ViewIcon /> : <ViewOffIcon /> }

          </Button>
        </InputRightElement>
      </InputGroup>

      <Button w="full" colorScheme='blue' size={"sm"} fontSize={14}
      onClick={handleSubmit}
      isLoading={loading}
      >
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
