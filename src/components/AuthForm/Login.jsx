import { Alert, AlertIcon } from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import {Button} from "@chakra-ui/button";
import { useState } from "react";
import userLogin from "../../hooks/useLogin";


export default function Login() {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
      });
      const {loading, error, setError, login} = userLogin()

      const handleInputFocus = () => {
        if (error) {
            setError(null);
        }
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
          onFocus={handleInputFocus}
        />

        <Input 
          placeholder='Password'
          fontSize={14}
          type="password"
          value={inputs.password}
          size={"sm"}
          onChange={(e) => setInputs({...inputs, password: e.target.value})}
          onFocus={handleInputFocus}
        />

        {error && (
          <Alert status="error" w="full" fontSize={14}>
              <AlertIcon />
              {error}
          </Alert>
      )}  
        <Button w={"full"} colorScheme={"blue"} size={"sm"} fontSize={14} 
        isLoading={loading}
        onClick={() => login(inputs)}>
            Log in
        </Button>
    </>
  )
}
