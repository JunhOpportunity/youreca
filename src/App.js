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
import ClientServiceCenter from "./Routes/ClientServiceCenter.js";
import ManagerSite from "./Routes/ManagerSite.js";
import Test from "./Routes/Test.js";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/invitation" element={<Overview />} />
          <Route path="/" element={<Main />} />
          <Route path="/firstlogin" element={<FirstLogin />} />
          <Route path="/first-profile-img" element={<UploadProfileImage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/emailverification"
            element={<EmailVerification />}
          />
          <Route
            path="/user-reputations/:id"
            element={<UserReputations />}
          />
          <Route path="/upload/:id" element={<Upload />} />
          <Route path="/regist" element={<RegistPerson />} />
          <Route path="/admin" element={<ManagerSite />} />
          <Route path="/client-service-center" element={<ClientServiceCenter />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
