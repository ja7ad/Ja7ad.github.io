
import React from 'react';
import './Avatar.css';

const AVATAR_URL = "https://avatars.githubusercontent.com/u/56496801?v=4";

const Avatar: React.FC = () => {
  return (
    <div className="avatar-container" title="Javad Rajabzadeh">
      <a href="https://github.com/ja7ad" target="_blank" rel="noreferrer">
        <img src={AVATAR_URL} alt="Javad Rajabzadeh" />
      </a>
    </div>
  );
};

export default Avatar;
