import "antd/dist/antd.min.css";
import { Button, Form, Input, Space,  } from 'antd';
import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation,useQuery } from "@tanstack/react-query";
import axios from 'axios';


const NewGroup = () => {
  const [form] = Form.useForm();
  const [count,setCount]=useState(0)
  //useEffect(()=>{},[setCount])
  const {mutate}=useMutation((i)=>{
    return axios.post('http://localhost:3000/api/v1/group/',i,{
      headers:{
        Authorization:localStorage.getItem("google-token-popup-feature")?("Bearer " + localStorage.getItem("google-token-popup-feature")):"",
      }
    })
  });
  const onFinish = (values) => {
    if(values.users===undefined || values.users.length<1)alert("please add atleast one friend");
    else{
      //mutate here
      mutate(values);
      console.log(values);
    }

  };

  const onReset = () => {
    form.resetFields();
  };
  const handleChange=(e)=>{
    console.log(e)
    console.log('hello')
    console.log(count)
    setCount(count+1);

  }
 

  return (
    <div className="newGroup">
      <div style={{width:"900px",display:"flex"}}>
        <img src="https://cdn.dribbble.com/users/345082/screenshots/1189591/splitwiselogo-01.png" alt="logo" style={{height:'200px',width:'300px'}} />
        <div style={{width:'100%'}}>
          <h1>Start your new Group here</h1>
          <Form  form={form} name="control-hooks" onFinish={onFinish} style={{width:"100%", marginTop:'10px'}} >
          <Form.Item
            name="name"
            label="Name"
            style={{width:'100%'}}
            rules={[
              {
                required: true,
                message: 'Missing Group name',

              },
            ]}
          >
            <Input placeholder="Your Group name....." style={{height:'40px'}}  onChange={handleChange}/>
          </Form.Item>
          {count>0 && 
           <Form.List name="users">
           {(fields, { add, remove }) => (
             <>
               {fields.map(({ key, name, ...restField }) => (
                 <Space
                   key={key}
                   style={{
                     display: 'flex',
                     marginBottom: 8,
                   }}
                   align="baseline"
                 >
                   <Form.Item
                     {...restField}
                     name={[name, 'name']}
                     label="Friend Name"
                     rules={[
                       {
                         required: true,
                         message: 'Missing friend name',
                       },
                     ]}
                   >
                     <Input placeholder="Friend Name" />
                   </Form.Item>
                   <Form.Item
                     {...restField}
                     name={[name, 'email']}
                     label="Email"
                     rules={[
                      {
                        type: 'email',
                        message: 'The input is not valid email!',
                      },
                      {
                        required: true,
                        message: 'Please input your friend email!',
                      }
                     ]}
                   >
                     <Input placeholder="Email" />
                   </Form.Item>
                   <MinusCircleOutlined onClick={() => remove(name)} />
                 </Space>
               ))}
               <Form.Item>
                 <Button type="dashed" style={{width:'50%'}} onClick={() => add()} block icon={<PlusOutlined />}>
                   Add friends
                 </Button>
               </Form.Item>
             </>
           )}
         </Form.List>
          }
        
          <Form.Item >
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
        
          </Form.Item>
        </Form>
        </div>
      

      </div>
     
    </div>
   
  );
};

export default NewGroup;
