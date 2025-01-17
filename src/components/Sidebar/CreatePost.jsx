import { BsFillImageFill } from 'react-icons/bs';
import { CreatePostLogo } from '../../assets/constants'
import {
 Box,
 Flex,
 Tooltip,
 useDisclosure,
 Modal,
 ModalBody,
 ModalOverlay, 
 ModalContent, 
 ModalHeader, 
 ModalCloseButton, 
 Textarea, 
 Input,
 Image, 
 ModalFooter, 
 Button,
 CloseButton,
} from "@chakra-ui/react";
import { useState, useRef } from 'react';
import usePreviewImg from '../../hooks/usePreviewImg';
import useCreatePost from '../../hooks/useCreatePost';
import useShowToast from '../../hooks/useShowToast';
import useAuthUser from '../../store/authStore';

function CreatePost() {
  const {isOpen, onOpen, onClose} = useDisclosure()

  const [caption, setCaption] = useState("")

  const imageRef = useRef(null)

  const {selectedFile, handleImageChange, setSelectedFile}= usePreviewImg()

  const {isLoading, handleCreatePost} = useCreatePost()

  const showToast = useShowToast()

  const authUser = useAuthUser((state) => state.user)


  const handlePostCreation = async () => {
    if(isLoading) {
      return
    }
    try{
        await handleCreatePost(selectedFile, caption, authUser.uid)
        onClose()
        setCaption("")
        setSelectedFile(null)

    } catch(error) {
      showToast("Error", error.message, "error")
    }
  }

  return (
    <>
      <Tooltip
      hasArrow
      label={"Create"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{base: "block", md: "none"}}
      >
          <Flex
          display={"flex"}
          alignItems={"center"}
          gap={4}
          _hover={{bg:"whiteAlpha.400"}}
          borderRadius={6}
          p={2}
          w={{base: 10, md:"full"}}
          justifyContent={{base: "center", md: "flex-start"}}
          onClick={onOpen}
          >
              <CreatePostLogo />
              <Box display={{base:"none", md:"block"}}>
                  Create
              </Box>
          </Flex>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />

        <ModalContent bg={"black"} border={"1px solid gray"}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea 
            placeholder='Post caption...'
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            />
            <Input type="file" hidden ref={imageRef} onChange={handleImageChange}/>
            <Flex w="full" position={"relative"} just>
              <BsFillImageFill 
                onClick={() => imageRef.current.click()}
                left={2}
                style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
                size={16}
              />
              {selectedFile && (
                <CloseButton 
                position={"absolute"}
                top={2}
                right={2}
                onClick={() => {setSelectedFile(null)}}
                />
              )}
            </Flex>
            
            {selectedFile && (
              <Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
                <Image src={selectedFile} alt="Selected image" />
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePost