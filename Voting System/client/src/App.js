import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import UserHome from "./Components/UserHome";
import Canidateform from "./Components/Canidateform";
import AdminHome from "./Components/AdminHome";
import NewElection from "./Components/NewElection";
import Adminrequest from "./Components/Adminrequest";
import ElectionHistory from "./Components/ElectionHistory";
import AdminSearch from "./Components/AdminSearch";
import { SharedPropsProvider } from "./Components/UserConext";
import ElectionStatus from "./Components/ElectionStatus";
import ElectionPage from "./Components/ElectionPage";
import ShowResult from "./Components/ShowResult";
import UserResult from "./Components/UserResult";
import PagenotFound from "./Components/PagenotFound";

function App() {
  return (
    <SharedPropsProvider>
      
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userhome/:cnic" element={<UserHome />} />
        <Route path="/userhome/:cnic/canidateform" element={<Canidateform />} />
        <Route path="/adminhome/:cnic" element={<AdminHome />} />
        <Route path="/adminhome/:cnic/createelection" element={<NewElection />} />
        <Route path="/adminhome/:cnic/requests" element={<Adminrequest />} />
        <Route path="/adminhome/:cnic/history" element={<ElectionHistory />} />
        <Route path="/adminhome/:cnic/calculateresult" element={<AdminSearch />} />
        <Route path="/userhome/:cnic/electionstatus" element={<ElectionStatus />} />
        <Route path="/userhome/:cnic/election/:electionid" element={<ElectionPage />} />
        <Route path="/userhome/:cnic/results/:electionid" element={<UserResult />} />
        <Route path="/showresult/:id" element={<ShowResult />} />
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </Router>
    </SharedPropsProvider>
  );
}

export default App;
