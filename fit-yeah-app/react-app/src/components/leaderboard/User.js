import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllUsers, selectUser, submitFollow, submitUnfollow } from '../user/userSlice';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

import '../profile/ProfileComponent.css';

function User() {
  const { id } = useParams();
  const user = useSelector(selectUser);
  const following = user.following;
  const userId = user.id;
  const allUsers = useSelector(selectAllUsers);
  const allUsersMap = allUsers.filter((user) => {
    return (user.id.toString() === id.toString())
  })
  const currUser = allUsersMap[0];
  const currUserId = parseInt(currUser.id);
  const dispatch = useDispatch();
  const followingIds = following.map((person) => {
    return person.id
  })

  return (
    <div>
      <div className="profile">
        <div className="profile__left">
          <div className="profile__userinfo">
            <div className="profile__avatar">
              {currUser.avatar_url ? (
                <div className="profile__avatar--div">
                  <img
                    src={currUser.avatar_url}
                    alt=''
                    className="profile__avatar--image"
                  />
                </div>
              ) : (
                  <div className="profile__avatar--noimage">
                    <img
                      src='http://www.fillmurray.com/140/200'
                      alt=''
                      className="profile__avatar--image"
                    />
                  </div>
                )}
            </div>

          </div>
        </div>
        <div className="profile__middle">
          <div className="profile__username">
            <h1>{`${currUser.first_name} ${currUser.last_name}`}</h1>
          </div>
          <div className="profile__rank">
            {currUser.rank ? (
              <p>{currUser.rank}</p>
            ) : (
                <p>Rank: rookie</p>
              )}
          </div>
          <div className="profile__points">
            {currUser.points_earned ? (
              <div>
                <h5>{`Points Earned: ${currUser.points_earned}`}</h5>
              </div>
            ) :
              <div>
                <h5>{`Points Earned: 0`}</h5>
              </div>}
          </div>
          <div className="profile__userbio">
            <p>{currUser.bio}</p>
          </div>
        </div>
        <div className="profile__right">
          <div className="profile__right--followButton">
            {!followingIds.includes(currUserId) ? (
              <Button
                variant="contained"
                style={{ textTransform: 'none' }}
                startIcon={<PersonAddIcon />}
                onClick={() => dispatch(submitFollow({ userId, id }))}>
                {`follow ${currUser.first_name}`}
              </Button>
            ) : (
                <Button
                  variant="contained"
                  style={{ textTransform: 'none' }}
                  startIcon={<PersonAddDisabledIcon />}
                  onClick={() => dispatch(submitUnfollow({ userId, id }))}>
                  {`unfollow ${currUser.first_name}`}
                </Button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
