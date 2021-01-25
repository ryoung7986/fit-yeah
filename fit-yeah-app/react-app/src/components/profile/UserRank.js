import React from 'react';
import './UserRank.css';

function UserRank({ user }) {
  const points = user.points_earned;

  const userRank = () => {
    if (points < 1000) {
      return (
        <p>Rank: Novice</p>
      )
    }
    if (points >= 1000 && points < 3000) {
      return (
        <p>Rank: Rookie</p>
      )
    }
    if (points >= 3000 && points < 6000) {
      return (
        <p>Rank: Flyweight</p>
      )
    }
    if (points >= 6000 && points < 10000) {
      return (
        <p>Rank: Bantamweight</p>
      )
    }
    if (points >= 10000 && points < 15000) {
      return (
        <p>Rank: Featherweight</p>
      )
    }
    if (points >= 15000 && points < 21000) {
      return (
        <p>Rank: Lightweight</p>
      )
    }
    if (points >= 21000 && points < 28000) {
      return (
        <p>Rank: Welterweight</p>
      )
    }
    if (points >= 28000 && points < 36000) {
      return (
        <p>Rank: Middleweight</p>
      )
    }
    if (points >= 36000 && points < 45000) {
      return (
        <p>Rank: Light Heavyweight</p>
      )
    }
    if (points >= 45000 && points < 55000) {
      return (
        <p>Rank: Heavyweight</p>
      )
    }
    if (points >= 55000 && points < 66000) {
      return (
        <p>Rank: Super Heavyweight</p>
      )
    }
    if (points >= 66000 && points < 78000) {
      return (
        <p>Rank: Contender</p>
      )
    }
    if (points >= 78000) {
      return (
        <p>Rank: Champ</p>
      )
    }
  }

  return (
    <div className="userRank">
      {userRank()}
    </div>
  )
}

export default UserRank
