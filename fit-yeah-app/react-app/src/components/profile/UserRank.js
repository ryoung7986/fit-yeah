import React from 'react';
import './UserRank.css';

function UserRank({ user }) {
  const points = user.points_earned;

  const userRank = () => {
    if (points < 100) {
      return (
        <p>Rank: Novice</p>
      )
    }
    if (points >= 100 && points < 500) {
      return (
        <p>Rank: Rookie</p>
      )
    }
    if (points >= 500 && points < 1000) {
      return (
        <p>Rank: Flyweight</p>
      )
    }
    if (points >= 1000 && points < 1500) {
      return (
        <p>Rank: Bantamweight</p>
      )
    }
    if (points >= 1500 && points < 2000) {
      return (
        <p>Rank: Featherweight</p>
      )
    }
    if (points >= 2000 && points < 2500) {
      return (
        <p>Rank: Lightweight</p>
      )
    }
    if (points >= 2500 && points < 3000) {
      return (
        <p>Rank: Welterweight</p>
      )
    }
    if (points >= 3000 && points < 3500) {
      return (
        <p>Rank: Middleweight</p>
      )
    }
    if (points >= 3500 && points < 4000) {
      return (
        <p>Rank: Light Heavyweight</p>
      )
    }
    if (points >= 4000 && points < 4500) {
      return (
        <p>Rank: Heavyweight</p>
      )
    }
    if (points >= 4500 && points < 5000) {
      return (
        <p>Rank: Super Heavyweight</p>
      )
    }
    if (points >= 5000 && points < 5500) {
      return (
        <p>Rank: Contender</p>
      )
    }
    if (points >= 5500) {
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
