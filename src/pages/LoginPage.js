import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, message } from 'antd'
import axios from 'axios' 
import Spinner from '../components/layout/Spinner.js'

const LoginPage = () => {

    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)

    //on submit
    const submitHandler = async (values) => {
        try {
            setLoading(true)
            const {data} = await axios.post('/users/login',values)
            message.success('Login successful')
            setLoading(false)
            localStorage.setItem('user',JSON.stringify({...data.user,password:''}))
            navigate('/')
        } catch (error) {
            setLoading(false);
            message.error("something went wrong")
        }
    }

    //prevent for login user
    useEffect(() => {
        if(localStorage.getItem('user')){
            navigate('/')
        }
    },[navigate])


    return(
        <>
            <div className='register-page d-flex align-items-center justify-content-center'>
                {loading && <Spinner/>}
                <Form layout='vertical' onFinish={submitHandler} style={{ width: 500 }}>
                    <h1>Login From</h1>
                    <Form.Item label="Username" name="name" rules={[{ required: true, message: 'Please Enter your Username!!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please Enter your Password!' }]}>
                        <Input.Password />
                    </Form.Item>
                    <div className='d-flex justify-content-between align-content-center  '>
                        <Link to='/register' className='align-content-center'>Not Registered? Click Here</Link>
                        <button className='btn btn-primary'>Login</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default LoginPage