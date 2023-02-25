import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./Routes/Profile.js";
import Contact from "./Routes/Profile.js";
import Main from "./Routes/Main.js";
import Upload from "./Routes/UploadReputation";
import FirstLogin from "./Routes/FirstLogin.js";
import Feedback from "./Routes/Feedback.js";
import Overview from "./Routes/Overview.js";
import NotFound from "./Routes/NotFound.js";
import EmailVerification from "./Routes/EmailVerification.js";
import RegistPerson from "./Routes/RegistPerson.js";
import { UploadProfileImage } from "./Routes/UploadProfileImage.js";
import UserReputations from "./Components/DetailPage.js";
import HeaderTest from "./Components/HeaderTest.js";
import Loading from "./Components/Loading.js";
import ClientServiceCenter from "./Routes/ClientServiceCenter.js";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/Responses-Chat" element={<Main />} />
          <Route path="/Responses-Chat/firstlogin" element={<FirstLogin />} />
          <Route path="/Responses-Chat/first-profile-img" element={<UploadProfileImage />} />
          <Route path="/Responses-Chat/profile" element={<Profile />} />
          <Route path="/Responses-Chat/feedback" element={<Feedback />} />
          <Route path="/Responses-Chat/contact" element={<Contact />} />
          <Route
            path="/Responses-Chat/emailverification"
            element={<EmailVerification />}
          />
          <Route
            path="/Responses-Chat/user-reputations/:id"
            element={<UserReputations />}
          />
          <Route path="/Responses-Chat/upload/:id" element={<Upload />} />
          <Route path="/Responses-Chat/regist" element={<RegistPerson />} />
          <Route path="/Responses-Chat/test" element={<Loading />} />
          <Route path="/Responses-Chat/client-service-center" element={<ClientServiceCenter />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
