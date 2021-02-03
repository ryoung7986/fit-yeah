import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, uploadUserAvatar } from './user/userSlice';


function UploadForm() {
  const [image, setImage] = useState(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const imgSubmit = (e) => {
    e.preventDefault();
    const userId = user.id
    console.log(typeof userId)
    dispatch(uploadUserAvatar(image, userId));
  }

  const handleImageUpload = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <div className="modal">
      <form
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
