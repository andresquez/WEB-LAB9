import './App.scss';
import React from 'react';
import Calculator from './components/Calculator/Calculator';

function App() {
  return (
    <div>
      <div id="spacer_v" />
      <div className="title">quesoCalc</div>
      <div id="spacer_v" />
      <Calculator />
    </div>
  );
}

export default App;
