import { Button, Card, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import { getMembersOfAGroup, getOwesOfAGroup } from "../apis/getGroups";
import { useQuery } from "@tanstack/react-query";
const gridStyle = {
    width: "100%",
    textAlign: "left",
    display: "flex",
    justifyContent: "space-between",
  };
const settleUpButton={
    backgroundColor:"#5bc5a7",
}
const BalanceModal = ({
  isBalanceModalOpen,
  setIsBalanceModalOpen,
  title,
  grpid,
}) => {
  const [value, setValue] = useState(1); //not used

  let {
    isLoading,
    error,
    isError,
    data: oweMembers,
    isFetched,
    refetch,
  } = useQuery(["unique12345", grpid], getOwesOfAGroup, { enabled: false });
  useEffect(() => {
    //children=[]
    refetch();
  }, [grpid]);

  let check ;
  if (isFetched && oweMembers) {
    console.log("oweMembers in BalanceModal.js", grpid, oweMembers);
     check=oweMembers?.length===0?true:false;

    //children=oweMembers.map((item)=>item.name)//for defaultValue

    //c=children=oweMembers.map((item)=>item.name)
  }
  const showModal = () => {
    //setIsModalOpen(true);
  };
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    //setPayer(e.target.value)
    setValue(e.target.value);
  };

  const handleOk = () => {
    setIsBalanceModalOpen(false);
  };

  const handleCancel = () => {
    setIsBalanceModalOpen(false);
  };
  return (
    <>
      <Modal
        className="modalStyle"
        title="Check Your Group Balance here"
        style={{ backgroundColor: "#5bc5a7", left: 1 }}
        open={isBalanceModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Card title={title}>
          {check && <Card.Grid style={gridStyle}><h1>No owes yet in this group</h1></Card.Grid>}
          {oweMembers?.map((item) => (
            <>
              <Card.Grid style={gridStyle}>
                <div>
                    <div>{item.userId1} owes to {item.userId2}</div>
                    <div>{item.createdAt}</div>
                </div>
                <div>
                    <div>${item.amount}</div>
                    <Button style={settleUpButton}>SettleUp</Button>
                </div>
               
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <div>
                    <div>{item.userId2} should get back from {item.userId1}</div>
                    <div>{item.createdAt}</div>
                </div>
                <div>
                    <div>${item.amount}</div>
                    <Button style={settleUpButton}>SettleUp</Button>
                </div>
              </Card.Grid>
            </>
          ))}
        </Card>
      </Modal>
      {console.log("value is", value)}
    </>
  );
};

export default BalanceModal;
