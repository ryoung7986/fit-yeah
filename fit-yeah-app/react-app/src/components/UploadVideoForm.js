import React, { useState, forwardRef, useImperativeHandle } from 'react';


const UploadVideoForm = forwardRef((props, ref) => {
  const [video, setVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [mimeType, setMimeType] = useState('');

  useImperativeHandle(ref, () => {
    return {
      videoUrl: videoUrl
    }
  });

  const uploadVideo = async (data) => {
    console.log('Uploading video...');
    console.log("MIMETYPE", mimeType);
    let formData = new FormData();
    formData.append('video', data);
    formData.append('mimeType', mimeType);
    const response = await fetch('/api/aws/upload/video', {
      method: 'POST',
      body: formData
    })
    const responseData = await response.json();
    console.log("video upload successful");
    setVideoUrl(responseData.video_url);
    return responseData;
  }

  const videoSubmit = (e) => {
    e.preventDefault();
    uploadVideo(video);
  }

  const handleVideoUpload = (e) => {
    setMimeType(e.target.files[0].name.slice(e.target.files[0].name.length - 3))
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
            name="image"
            onChange={handleVideoUpload}
          />
          <button type="submit">
            Upload!
          </button>
        </div>
      </form>
    </div>
  )
})

export default UploadVideoForm
