import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { selectUserAvatarUrl, selectUser, addUserAvatarUrl } from './user/userSlice';


function UploadForm() {
  const [video, setVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const user = useSelector(selectUser);
  const userId = user.id
  const dispatch = useDispatch();

  const videoUrl = (userId) => {
    (async () => {
      const imgUrl = videoUrl
      const response = await fetch(`/api/users/upload-avatar/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imgUrl })
      })
      const responseData = await response.json();
      const url = responseData.avatar_url
      dispatch(addUserAvatarUrl(url))
    })()
  }

  const uploadVideo = async (data) => {
    console.log('Uploading image...');
    let formData = new FormData();
    formData.append('image', data);
    const response = await fetch('/api/aws/upload', {
      method: 'POST',
      body: formData
    })
    const responseData = await response.json();
    console.log("video upload successful");
    setVideoUrl(responseData.img_url);
    return responseData;
  }

  const videoSubmit = (e) => {
    e.preventDefault();
    uploadVideo(video);
  }

  const handleVideoUpload = (e) => {
    setVideo(e.target.files[0])
  }

  return (
    <div className="modal">
      <form onSubmit={videoSubmit}>
        <h3>
          Upload Video
        </h3>
        <div>
          <input
            type="file"
            name="video"
            onChange={handleVideoUpload}
          />
          <button type="submit">
            Upload!
          </button>
        </div>
      </form>
    </div>
  )
}

export default UploadForm
