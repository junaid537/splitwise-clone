import { Modal } from 'antd'
import React, { useState } from 'react'
import { Radio } from 'antd';


const PayerModal = ({inputPeople,setInputPeople,setPayer,groupMembers}) => {
    const [value, setValue] = useState(1);//not used
    const showModal = () => {
        //setIsModalOpen(true);
      };
      const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setPayer(e.target.value)
        setValue(e.target.value);
      };
    
    
      const handleOk = () => {
        setInputPeople(false);
      };
    
      const handleCancel = () => {
        setInputPeople(false);
      };
  return (
    <>
    <Modal
      className="modalStyle"
      title="Add an Expense"
      style={{ backgroundColor: "#5bc5a7",left: 420,
    }}
      open={inputPeople}
      onOk={handleOk}
      onCancel={handleCancel}
    >
    <Radio.Group onChange={onChange} value={value}>

      {groupMembers.map((member)=>{return <Radio value={member.name}>{member.name}</Radio>})}
    </Radio.Group>
    
     </Modal> 
     {        console.log("value is",value)}
    </>
  )
}

export default PayerModal;
