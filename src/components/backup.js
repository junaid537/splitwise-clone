import { Modal, Radio } from 'antd';
import React, { useRef, useState } from 'react'
import { Card, Form, Input } from "antd";
import { useEffect } from 'react';
const gridStyle = {
  width: "100%",
  textAlign: "left",
  display: "flex",
  justifyContent: "space-between",
};
const formStyle={
  display: "flex",
  justifyContent: "space-between",
}
const data = ["s", "a"];

let title="";
let indicost=[];
let splittedAmounts=[]
const DistributionModal = ({dividerModal,setDividerModal,setDistribution,distribution,groupMembers,expenseAmount}) => {
  let [individualCost,setIndividualCost] = useState(0);
  const inputEl = useRef(null);
    useEffect(()=>{
        //individualCost=expenseAmount/groupMembers.length;
        setIndividualCost(expenseAmount/groupMembers.length)
        //console.log("after rendering , at last useEffect prints individualCost",individualCost)
    },[distribution,expenseAmount,groupMembers.length]);

    console.log("checking whether DM s re rendering....21 line",expenseAmount,individualCost)
    const showModal = () => {
        //setIsModalOpen(true);
      };
      const onRadioChange = (e) => {/////
        title=e.target.value;
        console.log('radio checked', e.target.value);
        setDistribution(e.target.value)

      };
    
      
      const handleOk = () => {
        console.log("handleOk",individualCost)
        if(distribution==='Unequal'){
          console.log("hi its unequal")
          console.log("unequal",individualCost)
        }
        setIndividualCost(0);
        setDividerModal(false);
      };
    
      const handleCancel = () => {
        console.log("hiiiii")
        setIndividualCost(0);
        setDividerModal(false);
      };
      const onFinish = (values) => {
        console.log(values)
    
      };
      const onIndividualInputChange=(e)=>{
        console.log("onIndividualInputChange",e.target.value)
        console.log("focus is ",inputEl.current.input.focus())
        splittedAmounts=[...splittedAmounts,]
      }
  return (
    <>
    {    console.log("checking whether DM s re rendering....21 line",expenseAmount,individualCost)
}
    <Modal
      className="modalStyle"
      title="Add an Expense"
      style={{
        left: 420,
        backgroundColor: "#5bc5a7"
      }}
      maskClosable = {false}
      open={dividerModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Radio.Group defaultValue="Equal" buttonStyle="solid"  onChange={onRadioChange}>
      <Radio.Button value="Equal">Equal</Radio.Button>
      <Radio.Button value="Unequal">Unequal</Radio.Button>
      <Radio.Button value="Percent">Percent</Radio.Button>
      <Radio.Button value="Share">Share</Radio.Button>
    </Radio.Group>

    <Card title={distribution}>
    {groupMembers.map((item) => (
      <>
        <Card.Grid style={gridStyle}>
          <div>{item.name}</div>
          <div>
          <Form
          onFinish={onFinish}
          fields={[
            {
              name: ["name"],
              value: individualCost,//for default value
            },
          ]}
          //style={formStyle}
          >
          <Form.Item
            name="name"
            style={{ width: "60%" }}
            /*rules={[
              {
                required: true,
                message: "Missing Expense description",
              },
            ]}*/
          >
            <Input disabled={distribution==='Equal'?true:false} onChange={onIndividualInputChange}  ref={inputEl}/*placeholder={individualCost}*//>
          </Form.Item>
          </Form>
          </div>
          
        </Card.Grid>
      </>
    ))}
  </Card>
  {console.log("checking whether DM s re rendering....")}
    </Modal>
      
    </>
  )
}

export default DistributionModal

/*
