import React from "react";
import UserRank from '../profile/UserRank';
import './UserCard.css';

function UserCard({ user }) {
  const userBio = user.bio;

  return (
    <div className="userCard">
      <div className="userCard__left">
        <div className="userCard__avatar">
          <img
            src={user.avatar_url}
            width="200"
            height="200"
            alt=''
            className="userCard__avatar--image" />
        </div>
      </div>
      <div className="userCard__middle">
        <div className="userCard__username">
          <h1>{`@${user.username}`}</h1>
        </div>
        <div className="userCard__fullName">
          <h3>{`${user.first_name} ${user.last_name}`}</h3>
        </div>
        <div className="userCard__rank">
          <UserRank user={user} />
        </div>
        <div className="userCard__points">
          {user.points_earned ? (
            <div>
              <h5>{`Points Earned: ${user.points_earned}`}</h5>
            </div>
          ) : <h5>Points earned: 0</h5>}
        </div>
        <div className="userCard__userbio">
          {userBio ? (
            <p>{userBio}</p>
          ) : null}
        </div>
      </div>
    </div >
  );
}
export default UserCard;
