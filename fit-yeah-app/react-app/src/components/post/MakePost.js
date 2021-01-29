import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from '../post/postSlice';
import { Avatar } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import UploadImgForm from '../UploadImgForm';
import UploadVideoForm from '../UploadVideoForm';
import Modal from 'react-modal';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import './MakePost.css';

function MakePost({ user }) {
  const [imgUploadDisplay, setImgUploadDisplay] = useState(false);
  const [videoUploadDisplay, setVideoUploadDisplay] = useState(false);
  const [description, setDescription] = useState('');
  const [trigger, setTrigger] = useState(0);
  const [imgUrl, setImgUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const form = useRef(null);
  const dispatch = useDispatch();
  const modalRef = useRef();


  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('description', description);
    formData.append('user_id', user.id)
    if (imgUrl !== '') {
      console.log(imgUrl)
      formData.append('img_url', imgUrl)
    }
    if (videoUrl !== '') {
      formData.append('video_url', videoUrl)
    }
    // for (let value of formData.values()) {
    //   console.log(value)
    // }
    const response = await fetch('api/posts/new', {
      method: 'POST',
      body: formData
    })
    setDescription('')
    setImgUrl('')
    setVideoUrl('')
    setTrigger(trigger => trigger + 1)
    return await response.json()
  }

  useEffect(() => {
    dispatch(getPosts(user.id))
  }, [trigger, dispatch, user.id])

  useEffect(() => {
    setImgUploadDisplay(false);
    setVideoUploadDisplay(false);
  }, [imgUrl, videoUrl])

  const onModalClose = () => {
    setImgUrl(modalRef.current.imgUrl);
    setImgUploadDisplay(false);
  }

  const onVidModalClose = () => {
    setVideoUrl(modalRef.current.videoUrl);
    setVideoUploadDisplay(false);
  }

  return (
    <>
      <div className='makePost'>
        <div className="makePost__top">
          <Avatar src={user.avatar_url} />
          <form ref={form} onSubmit={handleSubmit}>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="makePost__input"
              placeholder={`What's on your mind, ${user.first_name}?`} />
            <button
              type="submit">
              Hidden Submit
            </button>
          </form>
        </div>
        <div className="makePost__bottom">
          <div className="makePost__option" onClick={() => setVideoUploadDisplay(true)}>
            <VideocamIcon />
            <h3>Add Video</h3>
          </div>
          <div className="makePost__option" onClick={() => setImgUploadDisplay(true)}>
            <AddPhotoAlternateIcon />
            <h3>Add Photo</h3>
          </div>
          {imgUploadDisplay && (
            <Modal
              isOpen={imgUploadDisplay}
              onRequestClose={onModalClose}
              style={{
                overlay: {
                  backgroundColor: 'rgba(16, 125, 126, 0.5)'
                },
                content: {
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'space-evenly',
                  justifyContent: 'space-evenly',
                  top: '33%',
                  left: '33%',
                  right: '33%',
                  bottom: '33%',
                  border: '1px solid #ccc',
                  background: '#107D7E',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: "0px 5px 8px -2px rgba(0, 0, 0, 0.75);"
                }
              }}
            >
              <div className="modal__body">
                <UploadImgForm ref={modalRef} />
              </div>
            </Modal>
          )}
          {videoUploadDisplay && (
            <Modal
              isOpen={videoUploadDisplay}
              onRequestClose={onVidModalClose}
              style={{
                overlay: {
                  backgroundColor: 'rgba(16, 125, 126, 0.5)'
                },
                content: {
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'space-evenly',
                  justifyContent: 'space-evenly',
                  top: '33%',
                  left: '33%',
                  right: '33%',
                  bottom: '33%',
                  border: '1px solid #ccc',
                  background: '#107D7E',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: "0px 5px 8px -2px rgba(0, 0, 0, 0.75);"
                }
              }}
            >
              <div className="modal__body">
                <UploadVideoForm ref={modalRef} />
              </div>
            </Modal>
          )}
        </div>
      </div>
      {videoUrl || imgUrl ?
        <div className="makePost__mediaAdded">
          <PermMediaIcon />
          <p>Media added</p>
        </div> : null}
    </>
  )
}

export default MakePost
