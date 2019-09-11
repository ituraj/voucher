import React, { Component } from 'react';
import './App.scss';

import Nav from './components/Nav';
import Voucher from './components/Voucher';

class App extends Component {
  render() {
    return (
      <>
        <Nav></Nav>
        <Voucher></Voucher>
      </>
    );
  }
}

export default App;
