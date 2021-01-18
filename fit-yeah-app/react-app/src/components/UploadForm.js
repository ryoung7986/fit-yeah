import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './user/userSlice';


function UploadForm() {
  const [image, setImage] = useState(null);
  const [userAvatarUrl, setUserAvatarUrl] = useState('');
  const user = useSelector(selectUser);
  const userId = user.id

  useEffect(() => {
    imgUrl(userId, userAvatarUrl)
    console.log(userAvatarUrl)
  }, [userAvatarUrl])

  const imgUrl = (userId) => {
    (async () => {
      const imgUrl = userAvatarUrl
      const response = await fetch(`/api/users/upload-avatar/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imgUrl })
      })
      const responseData = await response.json();
    })()
  }

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
    const responseData = await response.json();
    console.log(responseData.img_url)
    setUserAvatarUrl(responseData.img_url);
    return responseData;
  }

  const imgSubmit = (e) => {
    e.preventDefault();
    uploadImg(image);
  }

  const handleImageUpload = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <div className="modal">
      <form
        // enctype="multipart/form-data"
        onSubmit={imgSubmit}>
        <h3>
          Upload image
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
