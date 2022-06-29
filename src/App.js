import React from 'react';
import { Counter } from './features/counter/Counter';
import { Tree} from "./features/tree/Tree";
import "./features/tree/Tree.css";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
          <hr style={{margin: '15px 0'}}/>
          <Tree/>
      </header>
    </div>
  );
}

export default App;
