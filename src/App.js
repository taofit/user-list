import './App.css';
import List from './components/List';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./components/UserPropfile";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<List />} />
              <Route path="user" element={<UserProfile />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
