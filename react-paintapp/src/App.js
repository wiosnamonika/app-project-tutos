import React, { Component, Fragment } from 'react';
import Canvas from './canvas';
import './App.css';

class App extends Component {
  render() {
    return (
        <Fragment>
            <h3 style={{ textAlign: 'center' }}>Draw something...</h3>
            <div className="main">
            <div className="main">
                <div className="color-guide">
                    <h5>Color Legend</h5>
                    <div className="user user">User</div>
                    <div className="user guest">Guest</div>
                </div>
            <Canvas />
            </div>
            </div>
        </Fragment>
    );
  }
}

export default App;
