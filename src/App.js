import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Components/Home.js"
import Auth from "./Components/Auth.js"
import Profile from "./Routes/Profile.js"
import Contact from "./Routes/Profile.js"
import Main from "./Routes/Main.js"
import Test from "./Routes/Test.js"
import Upload from "./Routes/Upload.js";
import FirstLogin from "./Routes/FirstLogin.js";
import Feedback from "./Routes/Feedback.js";


function App() {
  const [loginCheck, setLoginCheck] = useState(false);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="firstlogin" element={<FirstLogin />}/>
          <Route path="upload" element={<Upload />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="feedback" element={<Feedback />}/>
          <Route path="contact" element={<Contact />}/>
          <Route path="test" element={<Test/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
