import {h} from "preact";
import {Logo} from './logo'
import {axiosInstance} from 'src/api'
import Card from 'src/components/Card'
import {useEffect, useState} from "preact/hooks";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from 'src/Routes/Home'
import Profile from 'src/Routes/Profile'
import Navbar from "src/components/Navbar";


export function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile/:id" element={<Profile />} />
            </Routes>
        </Router>
    )
}
