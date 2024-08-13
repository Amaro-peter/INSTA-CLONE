import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'

function useShowToast() {
  const toast = useToast()
  //callback function is used to prevent infinite loop and to avoid re-rendering through caching
  const showToast = useCallback(
    (title, description, status) => {
      toast({
        title: title,
        description: description,
        status: status ,
        duration: 3000,
        isClosable: true,
        position: "top",
      })
    },
    [toast] 
  );
    return showToast
}

export default useShowToast