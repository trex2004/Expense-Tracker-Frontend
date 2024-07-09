import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, message } from 'antd'
import axios from 'axios' 
import Spinner from '../components/layout/Spinner.js'
import bgnd from '../one.jpg'


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
                <div  className='shadow-lg '>
                    <div>
                        <img src={bgnd} className='register-img rounded-top-3' alt="Background"/>
                    </div>
                    <div className='bg-white px-3 py-2'>
                        <Form className='register-form' layout='vertical' onFinish={submitHandler} style={{ width: 430 }}>
                            <h2 className='register-heading py-2'>Login Form</h2>
                            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please Enter your Email!!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please Enter your Password!' }]}>
                                <Input.Password />
                            </Form.Item>
                            <div className='d-flex justify-content-between align-content-center  '>
                                <span>Not Registered? <Link to='/register' className='align-content-center'>Click Here</Link></span>
                                <button className='btn btn-primary'>Login</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage