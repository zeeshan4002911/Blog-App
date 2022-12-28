import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./component/Login";
import Register from "./component/Register";
import Home from "./component/Home";
import Create from "./component/Create";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/create' element={<Create />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
