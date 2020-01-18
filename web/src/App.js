import React from 'react';

import './global.css';
import './App.css';

import Aside from './Aside';
import DevList from './DevList';

function App() {
  return (
    <div id="app">
      <aside>
        <Aside/>
      </aside>
      <main>
        <DevList/>
      </main>
    </div>
  );
}

export default App;
