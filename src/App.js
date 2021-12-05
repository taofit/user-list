import './App.css';
import Main from './components/Main';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./components/UserPropfile";
import React from "react";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="user/:username" element={<UserProfile />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
