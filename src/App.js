import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./Routes/Profile.js";
import Contact from "./Routes/Profile.js";
import Main from "./Routes/Main.js";
import Test from "./Routes/Test.js";
import Upload from "./Routes/Upload.js";
import FirstLogin from "./Routes/FirstLogin.js";
import Feedback from "./Routes/Feedback.js";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Responses-Chat" element={<Main />} />
          <Route path="/Responses-Chat/firstlogin" element={<FirstLogin />} />
          <Route path="/Responses-Chat/upload" element={<Upload />} />
          <Route path="/Responses-Chat/profile" element={<Profile />} />
          <Route path="/Responses-Chat/feedback" element={<Feedback />} />
          <Route path="/Responses-Chat/contact" element={<Contact />} />
          <Route path="/Responses-Chat/test" element={<Test />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
