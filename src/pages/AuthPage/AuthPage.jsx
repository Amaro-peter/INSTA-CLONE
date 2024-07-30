import { Box, Container, Flex, VStack, Image } from '@chakra-ui/react'
import AuthForm from '../../components/AuthForm/AuthForm';


export default function AuthPage() {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
        {/*Flex coloca os itens um do lado do outro como linha*/}
        <Container maxW={"container.md"} padding={0}>
            {/*O segundo flex faz com que estejam alinhados os itens dentro do container 
            e repassa os boxes filhos como filhos do container */}
            <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
                {/* {{base: para telas menores não mostra nada, md: para maiores mostra o bloco inteiro (reponsividade)}} */}
                {/*Parte esquerda da tela */}
                <Box display={{base:"none", md:"block"}}> 
                    <Image src="./auth.png" h={650} alt="Telefone img"/>
                </Box>
                {/*Parte direita da tela */}
                {/*Vstack coloca os intens um do lado do outro coluna*/}
                <VStack spacing={4} align={"stretch"}>
                    {/*formulario*/}
                    <AuthForm />
                    <Box textAlign={"center"}>Get the app.</Box>
                    <Flex gap={5} justifyContent={"center"}>
                        <Image src="/playstore.png" h={"10"} alt="Playstore logo"/>
                        <Image src="/microsoft.png" h={"10"} alt="Microsoft logo"/>
                    </Flex>
                </VStack>
            </Flex>
        </Container>
    </Flex>
  )
}
