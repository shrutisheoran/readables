import React, { Component } from 'react';
import '../index.css';
import Main from './Main';
import { withRouter } from 'react-router-dom';


class App extends Component {
  state = {}

  render() {
    return (
      <div className='body'>
        <Main/>
      </div>
    );
  }
}

export default withRouter(App);
