import React, { useState } from 'react'
import { } from '@ant-design/icons'
import { Progress } from 'antd'
import { VictoryPie } from 'victory'

const Charts = ({ transactions }) => {

    const [dataType,setDataType] = useState('type') 

    const categories = ["Utilities","Commute","Food","Cashback","Groceries","Bills"]

    //transactions
    const totalTransactions = transactions.length
    const totalCredit = transactions.filter(oneTransaction => oneTransaction.type === 'credit')
    const totalDebit = transactions.filter(oneTransaction => oneTransaction.type === 'debit')
    const creditPercentage = (totalCredit.length / totalTransactions) * 100 || 0
    const debitPercentage = (totalDebit.length / totalTransactions) * 100 || 0

    //turnover
    const totalTurnover = transactions.reduce((acc, oneTransaction) => acc + oneTransaction.amount, 0)
    const totalCreditAmount = totalCredit.reduce((acc, oneTransaction) => acc + oneTransaction.amount, 0)
    const totalDebitAmount = totalDebit.reduce((acc, oneTransaction) => acc + oneTransaction.amount, 0)
    const totalCreditAmountPercent = (totalCreditAmount / totalTurnover) * 100 || 0
    const totalDebitAmountPercent = (totalDebitAmount / totalTurnover) * 100 || 0

    const data = [{ x: "Credit", y: totalCreditAmount, fill: "green" }, { x: "Debit", y: totalDebitAmount, fill: "red" }]
    const creditData = categories.map((categorie) => {
        const amount = transactions.filter((oneTransaction) => oneTransaction.type==='credit' && oneTransaction.category===categorie).reduce((acc,oneTransaction)=>acc+oneTransaction.amount,0)
        return({x:categorie,y:amount})
    })
    const debitData = categories.map((categorie) => {
        const amount = transactions.filter((oneTransaction) => oneTransaction.type==='debit' && oneTransaction.category===categorie).reduce((acc,oneTransaction)=>acc+oneTransaction.amount,0)
        return({x:categorie,y:amount})
    })
    const creditDatax = creditData.filter((oneTransaction) => oneTransaction.y>0)
    const debitDatax = debitData.filter((oneTransaction) => oneTransaction.y>0)
    const datax = data.filter((oneTransaction) => oneTransaction.y>0)


    return (
        <>
            <div className='row d-flex responsive-flex-charts'>
                <div className='col'>
                    <div className='row d-flex responsive-flex'>
                        <div className='col mt-1'>
                            <div className='card'>
                                <div className='card-header'>
                                    Total Transaction : {totalTransactions}
                                </div>
                                <div className='card-body'>
                                    <h6>Number of Credit Transactions: {totalCredit.length}</h6>
                                    <h6>Number of Debit Transactions : {totalDebit.length}</h6>
                                    <div className='d-flex justify-content-center'>
                                        <Progress type='circle' strokeColor={'green'} className='mx-2' percent={creditPercentage.toFixed(0)} format={(percent) => `${percent}%`} />
                                        <Progress type='circle' strokeColor={'red'} className='mx-2' percent={debitPercentage.toFixed(0)} format={(percent) => `${percent}%`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col mt-1'>
                            <div className='card'>
                                <div className='card-header'>
                                    Total Turnover : {totalTurnover}
                                </div>
                                <div className='card-body'>
                                    <h6>Total Credit Amount: {totalCreditAmount}</h6>
                                    <h6>Total Debit Amount: {totalDebitAmount}</h6>
                                    <div className='d-flex justify-content-center'>
                                        <Progress type='circle' strokeColor={'green'} className='mx-2' percent={totalCreditAmountPercent.toFixed(0)} format={(percent) => `${percent}%`} />
                                        <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalDebitAmountPercent.toFixed(0)} format={(percent) => `${percent}%`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 mt-1'>
                    <div className='card'>
                        <div className='card-header'>
                            <ul className="nav nav-pills card-header-pills">
                                <li className="nav-item  pie-header"> 
                                    <a className="nav-link tabs " href='/#' onClick={() => setDataType('type')}>By Type</a>
                                </li>
                                <li className="nav-item  pie-header">
                                    <a className="nav-link tabs " href='/#' onClick={() => setDataType('credit-categories')}>By Credit Categories</a>
                                </li>
                                <li className="nav-item  pie-header">
                                    <a className="nav-link tabs " href='/#' onClick={() => setDataType('debit-categories')}>By Debit Categories</a>
                                </li>
                            </ul>
                        </div>
                        <div className='card-body'>
                            <h6>Total Turnover : {totalTurnover}</h6>
                            <h6>Total Credit Amount: {totalCreditAmount}</h6>
                            <h6>Total Debit Amount: {totalDebitAmount}</h6>
                            <div className='d-flex justify-content-center'>
                                {dataType==='type' && datax.length>0 && <VictoryPie height={300} data={datax} labels={({ datum }) => `${datum.x}: ${datum.y}`} style={{ data: { fill: ({ datum }) => datum.fill } }} />}
                                {dataType==='credit-categories' && creditDatax.length>0 && <VictoryPie height={300} data={creditDatax} labels={({ datum }) => `${datum.x}: ${datum.y}`} colorScale={["green", "orange", "gold", "cyan", "navy" ]}/>}
                                {dataType==='debit-categories' && debitDatax.length>0 && <VictoryPie height={300} data={debitDatax} labels={({ datum }) => `${datum.x}: ${datum.y}`} colorScale={["red", "orange", "gold", "cyan", "navy" ]}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Charts