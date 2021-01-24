import React, { useState, forwardRef, useImperativeHandle } from 'react';


const UploadForm = forwardRef((props, ref) => {
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [uploaded, setUploaded] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      imgUrl: imgUrl
    }
  });

  const uploadImg = async (data) => {
    console.log('Uploading image...');
    let formData = new FormData();
    formData.append('image', data);
    const response = await fetch('/api/aws/upload', {
      method: 'POST',
      body: formData
    })
    const responseData = await response.json();
    console.log("image upload successful");
    setUploaded(true);
    setImgUrl(responseData.img_url);
    return responseData;
  }

  const imgSubmit = (e) => {
    e.preventDefault();
    console.log(img)
    uploadImg(img);
  }

  const handleImgUpload = (e) => {
    setImg(e.target.files[0])
  }

  return (
    <div className="modal">
      <form onSubmit={imgSubmit}>
        <h3>
          Upload Image
        </h3>
        <div>
          <input
            type="file"
            name="image"
            onChange={handleImgUpload}
          />
          {uploaded ?
            <h1>Uploaded!</h1> :
            <button type="submit">
              Upload!
            </button>
          }
        </div>
      </form>
    </div>
  )
})

export default UploadForm
