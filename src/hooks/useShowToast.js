import { useToast } from '@chakra-ui/react'

function useShowToast() {
  const toast = useToast()
  const showToast = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status ,
      duration: 3000,
      isClosable: true,
      positiion: "top",
    })
  } 
  
    return showToast
}

export default useShowToast