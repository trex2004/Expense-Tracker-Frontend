import React, { useEffect, useState } from 'react'
import { DatePicker, Form, Input, message, Modal, Select, Table } from 'antd';
import axios from 'axios'
import { AreaChartOutlined, DeleteTwoTone, EditOutlined, UnorderedListOutlined } from '@ant-design/icons'
import Layout from './../components/layout/Layout.js'
import moment from 'moment';
import Charts from '../components/Charts.js';
const { RangePicker } = DatePicker

const HomePage = () => {
    const [showModal, setShowmodal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [frequency, setFrequency] = useState('7')
    const [selectedDate, setSelectedDate] = useState([])
    const [selectedType, setSelectedType] = useState('all')
    const [viewData, setViewData] = useState('table')
    const [edit,setEdit] = useState(null)
    const [reload,setReload] = useState(0)

    //get all transactions
    //useEffect 
    useEffect(() => {
        const getAllTransactions = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'))
                setLoading(true)
                const res = await axios.post('/api/v1/transactions/get-transactions', { userId: user._id, frequency, selectedDate, selectedType })
                setLoading(false)
                setTransactions(res.data)
                // console.log(res.data)
            } catch (error) {
                setLoading(false)
                message.error("Could not get transactions")
            }
        }
        console.log(edit)
        getAllTransactions()
    }, [frequency, selectedDate, selectedType,edit,reload])

    //just cause
    if(loading){}
    //table setup
    // const dataSource = [transactions]
    const collumns = [
        {
            title: "Date",
            dataIndex: "date",
            render: (text) => { return <span>{moment(text).format('YYYY-MM-DD')}</span> }
        },
        {
            title: "Amount",
            dataIndex: "amount"
        },
        {
            title: "Type",
            dataIndex: "type"
        },
        {
            title: "Category",
            dataIndex: "category"
        },
        {
            title: "Description",
            dataIndex: "description"
        },
        {
            title: "Actions",
            render : (test,record) => (
                <div>
                    <EditOutlined onClick={() => {
                        setEdit(record)
                        setShowmodal(true)
                    }}/>
                    <DeleteTwoTone twoToneColor="#FF0000" className='mx-2' onClick={() => deleteHandler(record)}/>
                </div>
            )
        }
    ]

    //handlers
    const submitHandler = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            setLoading(true)
            if(edit){
                await axios.post('/api/v1/transactions/edit-transaction', { payload:{...values, userId: user._id }, transactionId:edit._id})
                message.success("Transaction edited")
            }
            else{
                await axios.post('/api/v1/transactions/add-transaction', { ...values, userId: user._id })
                message.success("Transaction added")
            }
            setShowmodal(false)
            setLoading(false)
            setEdit(null)
            setReload(!reload)
        } catch (error) {
            setLoading(false)
            message.error("Transaction not added/edited")
        }
    }
    
    const deleteHandler = async (record) => {
        try {
            setLoading(true)
            await axios.post('/api/v1/transactions/delete-transaction',{transactionId:record._id})
            setLoading(false)
            message.success("Transaction deleted")
            setReload(!reload)
        } catch (error) {
            setLoading(false)
            message.error("Transaction not deleted")
        }
    }

    return (
        <Layout>
            {/* {loading && <Spinner />} */}
            <div className='d-flex mx-5 flex-column lato'>
                <div className=' mt-2'>
                    <div className='filters border mb-1 rounded-2'>
                        <div>
                            <h6>Select Frequency</h6>
                            <Select dropdownStyle={{ backgroundColor: '#D8EFD3' }} value={frequency} onChange={(values) => { setFrequency(values) }}>
                                <Select.Option value="7">Last 1 Week</Select.Option>
                                <Select.Option value="30">Last 1 Month</Select.Option>
                                <Select.Option value="365">Last 1 Year</Select.Option>
                                <Select.Option value="custom">Custom</Select.Option>
                            </Select>
                            {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => { setSelectedDate(values) }} />}
                        </div>
                        <div>
                            <h6>Select Type</h6>
                            <Select dropdownStyle={{ backgroundColor: '#D8EFD3' }} style={{ width: 80 }} value={selectedType} onChange={(values) => { setSelectedType(values) }}>
                                <Select.Option value="all">All</Select.Option>
                                <Select.Option value="credit">Credit</Select.Option>
                                <Select.Option value="debit">Debit</Select.Option>
                            </Select>
                        </div>
                        <div className='p-10 border border-secondary rounded icon-div'>
                            <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('table')} />
                            <AreaChartOutlined className={`mx-2 ${viewData === 'chart' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('chart')} />
                        </div>
                        <div>
                            <button className='btn btn-primary' onClick={() => setShowmodal(true)}>Add new transaction</button>
                        </div>
                    </div>
                    <div className='content'>
                        {viewData === 'table' ? <Table  columns={collumns} dataSource={transactions} /> : <Charts transactions={transactions} />}
                    </div>
                </div>
            </div>
            <Modal title={edit? "Edit Transaction":"Add transaction"} open={showModal} onCancel={() => setShowmodal(false)} afterClose={() => setEdit(null)} destroyOnClose={true} footer={false}>
                <Form layout='vertical' onFinish={submitHandler} initialValues={edit} >
                    <Form.Item label="Amount" name="amount" rules={[{ required: true, message: "Enter amount!!" }]}>
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item label="Type" name="type" rules={[{ required: true, message: "Enter type!!" }]}>
                        <Select>
                            <Select.Option value="credit">Credit</Select.Option>
                            <Select.Option value="debit">Debit</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Category" name="category" rules={[{ required: true, message: "Enter category!!" }]}>
                        <Select>
                            <Select.Option value="Utilities">Utilities</Select.Option>
                            <Select.Option value="Commute">Commute</Select.Option>
                            <Select.Option value="Food">Food</Select.Option>
                            <Select.Option value="Cashback">Cashback</Select.Option>
                            <Select.Option value="Groceries">Groceries</Select.Option>
                            <Select.Option value="Bills">Bills</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Date" name="date" rules={[{ required: true, message: "Enter date!!" }]}>
                        <Input type='date' />
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={[{ required: false }]}>
                        <Input type='text' />
                    </Form.Item>
                    <div className='d-flex justify-content-end'>
                        <button type='submit' className='btn btn-primary'>SAVE</button>
                    </div>
                </Form>
            </Modal>

        </Layout>
    )
}

export default HomePage