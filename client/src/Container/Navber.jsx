import React, {useEffect} from 'react'
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

const Navber = ({ isLogin }) => {

    useEffect(() => {
        // window.location.reload();
    
    }, [isLogin])
    

    // logOut
    const handleLogout = () => {
        const cookies = new Cookies();
        cookies.remove('token')

    }


    return (
        <header className="p-4 dark:bg-gray-800 dark:text-gray-100">
            <div className="container flex justify-between items-center h-16 mx-auto">
                <Link to='/'>  <h1 className='text-3xl font-bold'>Todo App</h1></Link>
                <div className="flex">
                </div>
                <div className="items-center flex-shrink-0 lg:flex">
                    {isLogin ? <button className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900 ml-3" onClick={handleLogout}>Logout</button> :
                        <>
                            <Link to='/login'> <button className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900 mr-3">Log in</button> </Link>
                            <Link to='/register'> <button className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Register</button> </Link>
                        </>
                    }
                    {/* <Link to='/login'> <button className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900 mr-3">Log in</button> </Link> */}
                    {/* <Link to='/register'> <button className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Register</button> </Link> */}
                    {/* <button className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900 ml-3">Logout</button>  */}
                </div>

            </div>
        </header>
    )
}

export default Navber