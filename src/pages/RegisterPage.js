import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, message } from 'antd'
import axios from 'axios' 
import Spinner from '../components/layout/Spinner.js'

const RegisterPage = () => {

    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)

    //on submit
    const submitHandler = async (values) => {
        try {
            setLoading(true)
            await axios.post("/users/register", values);
            message.success('Registertion successful')
            setLoading(false)
            navigate('/login')
        } catch (error) {
            setLoading(false);
            console.log(error)
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
                <Form layout='vertical' onFinish={submitHandler} style={{ width: 500 }} >
                    <h1>Register From</h1>
                    <Form.Item label="Email" name="email" rules={[{required:true, message:'Please Enter your Email!!'}]}>
                        <Input type='email'/>
                    </Form.Item>
                    <Form.Item label="Username" name="name" rules={[{ required: true, message: 'Please Enter your Username!!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please Enter your Password!' }]}>
                        <Input.Password />
                    </Form.Item>
                    <div className='d-flex justify-content-between align-content-center  '>
                        <Link to='/login' className='align-content-center'>Registered? Click Here</Link>
                        <button className='btn btn-primary'>Register</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default RegisterPage