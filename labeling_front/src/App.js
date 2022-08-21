import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { createTheme } from '@mui/material/styles';

import './App.css';
import LocalUpload from './components/LocalUpload';
import Main from './components/main';
import ObjectUpload from "./components/ObjectUpload";
import Editpage from "./components/Editpage";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/LocalUpload" element={<LocalUpload />} />
          <Route path="/ObjectUpload" element={<ObjectUpload />} />
          <Route path="/editpage/:id" element={<Editpage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
