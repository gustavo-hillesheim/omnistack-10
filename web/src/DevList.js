import React, { useState, useEffect } from 'react';

import api from './api';
import './DevList.css';

import DevInfo from './DevInfo';

function DevList() {
  const [ devs, setDevs ] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/dev');
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  return (
    <ul>
      { 
        devs.map(dev => (
          <li className="dev-item" key={ dev._id }>
            <DevInfo dev={ dev }/>
          </li>
        )) 
      }
    </ul>
  );
}

export default DevList;