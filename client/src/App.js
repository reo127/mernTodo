import { useState, useEffect } from 'react'
import './index.css'
import Cookies from 'universal-cookie';
import TodoLocalhost from './Container/TodoLocalhost';
import Navber from './Container/Navber';
import { Routes, Route } from "react-router-dom";
import Login from './Container/Login';
import Register from './Container/Register';

function App() {

  

    const [isLogin, setIsLogin] = useState(false)
    const [token, setToken] = useState('')

    useEffect(() => {
        // Check user is authenticated or not
        const cookies = new Cookies();
        let token = cookies.get('token');
        if (token) {
            setToken(token) 
           setIsLogin(true)
        }
    }, [isLogin])






    return (
        <>
            <Navber isLogin={isLogin} />
            <Routes>
                <Route path='/' element={<TodoLocalhost isLogin={isLogin} token={token} />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </>
    )
}

export default App;