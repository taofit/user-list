import './App.css';
import List from './components/List';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./components/UserPropfile";
import React from "react";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<List />} />
                  <Route path="user/:username" element={<UserProfile />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
