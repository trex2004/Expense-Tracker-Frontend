import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { message } from 'antd'

const Header = () => {
    const [loginUser,setLoginUser] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            setLoginUser(user)
        }
    },[])

    const logoutHandler = () => {
        localStorage.removeItem('user')
        message.success("Logout Successful")
        navigate('/login')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary lato">
                <div className="container-fluid">
                    <div className=" navbar-collapse" >
                        <Link className="navbar-brand" to="/">Expense Management</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <p className="nav-link" >{loginUser && loginUser.name}</p>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-primary" onClick={logoutHandler}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header