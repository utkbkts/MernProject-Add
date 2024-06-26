import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
const ImageUpload = ({ setImages }) => {
  const [imagePreview, setimagePreview] = useState([]);
  const FileInputRef = useRef(null);

  const handleImagePreviewDelete = (image) => {
    const filteredImagePreview = imagePreview.filter((img) => img !== image);

    setImages(filteredImagePreview);
    setimagePreview(filteredImagePreview);
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setimagePreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  //silinen resimleri dosya yükleme yerinden silmek için
  const handleResetFileInput = () => {
    //dosya girişi var mı kontrol
    if (FileInputRef.current) {
      FileInputRef.current.value = "";
    }
  };
  return (
    <div>
      <input
        type="file"
        name="product_images"
        className="form-control"
        id="customFile"
        multiple
        ref={FileInputRef}
        onChange={onChange}
        onClick={handleResetFileInput}
      />
      {imagePreview?.length > 0 && (
        <>
          <div className="image">
            <p>New Images:</p>
            {imagePreview.map((img) => (
              <>
                <img src={img} alt={"image"} />
                <Button
                  onClick={() => handleImagePreviewDelete(img)}
                  type="button"
                  variant="text"
                >
                  <MdClose />
                </Button>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
