import React from 'react';

import './DevInfo.css';

function DevInfo({ dev: { name, techs, bio, avatar_url, github_username } }) {

  return (
    <>
      <header>
        <img src={ avatar_url } alt={ name }></img>
        <div className="user-info">
          <strong>{ name }</strong>
          <span>{ techs.join(', ') }</span>
        </div>
      </header>
        <p>{ bio }</p>
        <a href={ "http://www.github.com/" + github_username }>Acessar perfil no Github</a>
    </>
  );
}

export default DevInfo;