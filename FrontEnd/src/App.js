
import './App.css';
import Login from './Login.js';
import DashBoard from './DashBoard.js';
import Pormodoro from './Pormodoro.js';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/dashboard" element={<DashBoard/>}></Route>
        <Route path="/dashboard/timer" element={<Pormodoro/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
