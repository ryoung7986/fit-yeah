import React from "react";

function UserCard({ user }) {

  return (
    <div className="userCard">
      <h2>{user.username}</h2>
      <h4>{`${user.first_name} ${user.last_name}`}</h4>
      <h6>{`Points earned: ${user.points_earned}`}</h6>
    </div>
  );
}
export default UserCard;
