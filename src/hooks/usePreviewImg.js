import { useState } from "react"
import useShowToast from "./useShowToast"


function usePreviewImg() {
  const [selectedFile, setSelectedFile] = useState(null);
  const showToast = useShowToast();
  const maxFileSizeInBytes = 2 * 1024 * 1024; // 2MB

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if(file && file.type.startsWith("image/")) {
        if(file.size > maxFileSizeInBytes) {
            showToast("Error", "File size too large. Max size is 2MB", "error");
            setSelectedFile(null);
            return
        }
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedFile(reader.result);
        }

        reader.readAsDataURL(file);

    } else {
        showToast("Error", "Please upload an image file", "error");
        setSelectedFile(null);
    }
  }

  return {selectedFile, handleImageChange, setSelectedFile}
}

export default usePreviewImg