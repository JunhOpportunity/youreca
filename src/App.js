import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Routes/Home.js"
import Auth from "./Components/Auth.js"
import Profile from "./Routes/Profile.js"
import Contact from "./Routes/Profile.js"


function App() {
  const [loginCheck, setLoginCheck] = useState(false);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home loginCheck={loginCheck}/>}/>
          <Route path="profile" element={<Profile loginCheck={loginCheck}/>}/>
          <Route path="contact" element={<Contact loginCheck={loginCheck}/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
