import React from 'react'
import Login from '../pages/Login/Login.js';
import DashBoard from '../pages/Dashboard/DashBoard.js';
import Pormodoro from '../pages/Pomodoro/Pomodoro.js';
import { Route,Routes } from 'react-router-dom';
export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/dashboard" element={<DashBoard/>}></Route>
        <Route path="/dashboard/timer" element={<Pormodoro/>}></Route>
    </Routes>
  )
}
