import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser, selectUser, selectUserWorkoutPlan } from '../user/userSlice';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import UploadForm from '../UploadForm';
import Modal from 'react-modal';

import './ProfileComponent.css'

function ProfileComponent() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bioIsOpen, setBioIsOpen] = useState(false);
  const [bio, setBio] = useState('');
  const user = useSelector(selectUser);
  const userId = user.id;
  const userBio = user.bio;
  const dispatch = useDispatch();


  const updateBio = (e) => {
    setBio(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/users/upload-bio/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bio })
    })
    const responseData = await response.json();
    dispatch(addUser(responseData))
  }

  return (
    <div className="profile">
      <div className="profile__left">
        <div className="profile__userinfo">
          <div className="profile__avatar">
            {user.avatar_url ? (
              <div className="profile__avatar--div">
                <img src={user.avatar_url} className="profile__avatar--image" />
              </div>
            ) : (
                <div className="profile__avatar--noimage">
                  <img src='http://www.fillmurray.com/140/200' className="profile__avatar--image" />
                  <Button
                    variant="contained"
                    style={{ textTransform: 'none' }}
                    startIcon={<CloudUploadIcon />}
                    onClick={() => setModalIsOpen(true)}
                  >
                    Upload Img
                  </Button>
                  <div className="modal">
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={() => setModalIsOpen(false)}
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
                        <UploadForm />
                      </div>
                    </Modal>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
      <div className="profile__middle">
        <div className="profile__username">
          <h1>{`${user.first_name} ${user.last_name}`}</h1>
        </div>
        <div className="profile__rank">
          {user.rank ? (
            <p>{user.rank}</p>
          ) : (
              <p>Rank: rookie</p>
            )}
        </div>
        <div className="profile__points">
          {user.points_earned ? (
            <div>
              <h5>{`Points Earned: ${user.points_earned}`}</h5>
            </div>
          ) : <h5>Points earned: 0</h5>}
        </div>
        <div className="profile__userbio">
          {userBio ? (
            <p>{userBio}</p>
          ) :
            <div className="userBio">
              {!bioIsOpen && (
                <Button
                  variant="contained"
                  style={{ textTransform: 'none' }}
                  startIcon={<CloudUploadIcon />}
                  onClick={() => setBioIsOpen(true)}
                >
                  Add a blurb about yourself!
                </Button>
              )}
              {bioIsOpen && (
                <form className="bioInput" onSubmit={onSubmit}>
                  <input
                    className="userBio__input"
                    name="userBio"
                    type="textarea"
                    placeholder="What makes you so special?"
                    value={bio}
                    onChange={updateBio}
                  />
                </form>
              )}
            </div>}
        </div>
      </div>
    </div >
  )
}

export default ProfileComponent
