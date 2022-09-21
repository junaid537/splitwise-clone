import React ,{useEffect, useState}from "react";
import { Button, Form, Input, Space, Select, InputNumber } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getMembersOfAGroup } from "../apis/getGroups";
import  ExpenseModal from "./ExpenseModal";
import { useParams } from "react-router-dom";
import BalanceModal from "./BalanceModal";
const Heading = ({ title ,groups,grpid}) => { //title is state
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [isBalanceModalOpen,setIsBalanceModalOpen]=useState(false);

  //const params=useParams();
  //console.log(params);
  //console.log("print urlid in Heading.js",params.groupid);
  //const [grpid,setgrpId]=useState(1);
  const { Option } = Select;
  

  
  const showBalanceModal=()=>{
    setIsBalanceModalOpen(true)
  }
  const showModal=async ()=>{
    console.log("groups in Heading.js",groups,"and title",title)
    if(title!=='Dashboard'){
      //const findGroupId=groups.find(element=>element.name===title)
      //setgrpId(findGroupId.id)
      console.log("gid in Heading.js", grpid);
      //var { data:groupMembers, isLoading, isFetched } = await refetch();
    }
    setIsModalOpen(true);
  }
  
  return (
    <>
     <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ marginLeft: "20px" }}>
        <strong style={{ fontSize: "25px" }}>{title}</strong>
      </div>
      {!(title==='Recent Activity' || title==='All Expenses' || title==='Add Group') ?(
        <div style={{ display: "flex" }}>
        <Button type="primary" onClick={showBalanceModal} style={{backgroundColor:"#ff652f",borderRadius:"5px",height:"45px",marginTop:"8px",marginRight:"15px" }}>Balances</Button>
        <Button type="primary" onClick={showModal} style={{backgroundColor:"#ff652f",borderRadius:"5px",height:"45px",marginTop:"8px",marginRight:"15px" }}>Add Expense</Button>
        <Button type="primary" style={{backgroundColor:"#5bc5a7",borderRadius:"5px",height:"45px",marginTop:"8px",marginRight:"15px" }}>Settle Up</Button>
      </div>
      ):""}
      
    </div>
    {isModalOpen && <ExpenseModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={title} grpid={grpid}/>}
    {isBalanceModalOpen && <BalanceModal isBalanceModalOpen={isBalanceModalOpen} setIsBalanceModalOpen={setIsBalanceModalOpen} title={title} grpid={grpid}/>}
    </>
   
  );
};

export default Heading;



//i wrote before useQuery here in Heading.js because , then i have to again pass grpid as props from Heading to ExpenseModal