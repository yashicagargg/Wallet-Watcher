import React,{useState,useEffect} from "react";
import Spinner from "../components/Spinner";
import {Modal,Form,message, Input,Select, Table} from 'antd';
import Layout from "./../components/Layout/Layout";
import axios from 'axios';

const HomePage = () => {
  const [showModal, setShowModal]=useState(false);
  const [loading, setLoading]=useState(false);
  const [allTransaction, setAllTransaction]=useState([]);
  
  const columns=[
    {
      title:'Date',
      dataIndex:'date',
    },
    {
      title:'Amount',
      dataIndex:'amount',
    },
    {
      title:'Type',
      dataIndex:'type',
    },
    {
      title:'Category',
      dataIndex:'category',
    },
    {
      title:'Reference',
      dataIndex:'reference',
    },
    {
      title:'Actions',
    }
]
  
  // get all transactions
  const getAllTransactions = async()=>{
    try {
      const user= JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      const res=await axios.post('/transactions/get-transaction',{userid:user._id});
      setLoading(false)
      setAllTransaction(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
      message.error('Fetch issues with the transaction')
    }
  };
  useEffect(()=>{
    getAllTransactions();
  },[]);

  const handleSubmit = async(values)=>{
    try {
      const user=JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      await axios.post('/transactions/add-transaction',{...values,userid:user._id})
      setLoading(false)
      message.success('Transaction Added Successfully')
      setShowModal(false)
    } catch (error) {
      setLoading(false)
      message.error('Failed to add transaction')
    }
  }
  return (
    <Layout>
      {loading && <Spinner/>}
      <div className="filters">
          <div>range filters</div>
          <div>
            <button className="btn btn-primary" 
            onClick={()=>setShowModal(true)}>Add New</button>
          </div>
      </div>
      <div className="content">
        <Table columns={columns} dataSource={allTransaction}/>
      </div>
      <Modal title="Add Transaction" open={showModal} onCancel={()=>setShowModal(false)}
      footer={false}>
        <Form layout="vertical" onFinish={handleSubmit} >
          <Form.Item label="Amount" name="amount"> 
            <Input type="text"/>
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="fees">Fees</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="others">Others</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date"> 
            <Input type="date"/>
          </Form.Item>
          <Form.Item label="Reference" name="reference"> 
            <Input type="text"/>
          </Form.Item>
          <Form.Item label="Description" name="description"> 
            <Input type="text"/>
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              {" "}
              SAVE
              </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
