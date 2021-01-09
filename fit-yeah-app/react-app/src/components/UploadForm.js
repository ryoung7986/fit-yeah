import React, { useState, useEffect } from 'react'


function UploadForm() {
  const [image, setImage] = useState(null)

  useEffect(() => {
    console.log(image)
  }, [image])

  const uploadImg = async (data) => {
    console.log('Uploading image...');
    let formData = new FormData();
    formData.append('image', data);
    formData.append('test', 'stringvaluetest');
    // for (let value of formData.values()) {
    //   console.log(value)
    // }
    console.log(formData.get('image'))
    const response = await fetch('/api/aws/upload', {
      method: 'POST',
      body: formData
    })
    return response.json()
  }

  const imgSubmit = (e) => {
    e.preventDefault();
    uploadImg(image);
  }

  const handleImageUpload = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <div>
      <form
        // enctype="multipart/form-data"
        onSubmit={imgSubmit}>
        <h3>
          File Upload using React!
        </h3>
        <div>
          <input
            type="file"
            name="image"
            onChange={handleImageUpload}
            required />
          <button type="submit">
            Upload!
          </button>
        </div>
      </form>
    </div>
  )
}

export default UploadForm
