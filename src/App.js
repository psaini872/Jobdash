import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import CreateJob from './Pages/CreateJob.jsx';
import ViewJobs from './Pages/ViewJobs.jsx';
import ApplicationsDetail from './Pages/ApplicationsDetail.jsx';
import PostedJob from './Pages/PostedJob.jsx';
import Dashboard from './Pages/Dashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/createjob" element={<CreateJob />} />
        <Route path="/viewjobs" element={<ViewJobs />} />
        <Route path="/jobsdetails/:jobid" element={<ApplicationsDetail />} />
        <Route path="/postedJob" element={<PostedJob />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
