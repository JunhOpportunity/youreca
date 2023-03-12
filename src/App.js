import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./Routes/Profile.js";
import Contact from "./Routes/Profile.js";
import Main from "./Routes/Main.js";
import Upload from "./Routes/UploadReputation";
import FirstLoginName from "./Routes/FirstLoginName.js";
import FirstLoginJob from "./Routes/FirstLoginJob.js";
import Feedback from "./Routes/Feedback.js";
import Overview from "./Routes/Overview.js";
import NotFound from "./Routes/NotFound.js";
import FirstLoginVerification from "./Routes/FirstLoginVerification.js";
import RegistPerson from "./Routes/RegistPerson.js";
import { FirstLoginImage } from "./Routes/FirstLoginImage";
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
          <Route path="/firstlogin-1" element={<FirstLoginName />} />
          <Route path="/firstlogin-2" element={<FirstLoginJob />} />
          <Route path="/firstlogin-3" element={<FirstLoginImage />} />
          <Route path="/firstlogin-4" element={<FirstLoginVerification />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user-reputations/:id" element={<UserReputations />} />
          <Route path="/upload/:id" element={<Upload />} />
          <Route path="/regist" element={<RegistPerson />} />
          <Route path="/admin" element={<ManagerSite />} />
          <Route
            path="/client-service-center"
            element={<ClientServiceCenter />}
          />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
