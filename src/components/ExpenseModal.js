import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Modal, Upload } from "antd";
import { Button, Form, Input, Space, Select, InputNumber } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { getMembersOfAGroup } from "../apis/getGroups";
import DistributionModal from "./DistributionModal";
import PayerModal from "./PayerModal";
const { Option } = Select;
let children = [];
//let filteredchildren=[];
let dashboardchildren = [];
let contributions = {};
const ExpenseModal = ({ isModalOpen, setIsModalOpen, title, grpid }) => {
  const [inputPeople, setInputPeople] = useState(false);
  const [dividerModal, setDividerModal] = useState(false);
  const [members, setMembers] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [payer, setPayer] = useState("You");
  const [individualContributions, setIndividualContributions] = useState({});
  const [distribution, setDistribution] = useState("Equal");
  let formData=new FormData();
  let newFile;
  let {
    isLoading,
    error,
    isError,
    data: groupMembers,
    isFetched,
    refetch,
  } = useQuery(["unique123", grpid], getMembersOfAGroup, { enabled: false });
  useEffect(() => {
    children = [];
    refetch();
  }, [grpid]);
  let c = [];
  if (isFetched && groupMembers) {
    console.log("groupMembers in ExpenseModal.js", grpid, groupMembers);
    children = groupMembers.map((item) => item.name); //for defaultValue

  }
  const { mutate } = useMutation((i) => {
    return axios.post(`http://localhost:3000/api/v1/expense/${grpid}`, i, {
      headers: {
        Authorization: localStorage.getItem("google-token-popup-feature")
          ? "Bearer " + localStorage.getItem("google-token-popup-feature")
          : "",
      },
    });
  });
  const [form] = Form.useForm();

  const onFinish = (values) => {
    contributions = {}

    let Payer = groupMembers.find((element) => {
      if (element.name === payer) return element;
    }); 
    if (Object.keys(individualContributions).length === 0) {
      //return alert("Pleast do a valid distribution")
      for (let i = 0; i < values.people.length; i++) {
        let p = values.people[i];
        console.log("p", p);

        let q = expenseAmount / values.people.length;
      
        contributions[p] = q;
      }

      values = {
        ...values,
        Payer: Payer,
        distribution: distribution,
        "eachPersonOwes": contributions,
        "formData":formData,
      };
      console.log('values',values);

      mutate(values);
      console.log("values from ExpenseModal.js", values);
    } 
    else {
      console.log("else is executing");
      values = {
        ...values,
        Payer,
        distribution: distribution,
        "eachPersonOwes": individualContributions,
        "formData":formData

      };
      console.log('values',values);
      mutate(values);
      console.log("values from ExpenseModal.js", values);
      console.log(
        "individualContributions in ExpenseModal.js",
        individualContributions
      );
    }

    setIsModalOpen(false);
  };
  const onReset = () => {
    form.resetFields();
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handlePeople = () => {
    setInputPeople(true);
  };
  const handleDividerModal = () => {
    setDividerModal(true);
  };
  const getFile = (e) => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
   return e && e.fileList;
  };
  const handleImageChange=(e)=>{
    console.log("e",e);
     
           // Create new file so we can rename the file
         
     
  
  }
  
  const handleSelect = (value) => {
    setMembers(true);
    console.log(`selected ${value}`);
  };
  const handleInputNumber = (value) => {
    setExpenseAmount(value);
    console.log(value);
  };
  const dv =
    title === "Dashboard" ? ["a10"] : groupMembers?.map((item) => item.id);

  // console.log("check grpmembers",groupMembers)
  //groupMembers=groupMembers.map((item)=>{return <Option key={item}>{item}</Option>})
  return (
    <Modal
      className="modalStyle"
      title="Add an Expense"
      style={{ backgroundColor: "#5bc5a7", right: 100 }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        {isFetched && children && (
          <Form.Item
            label="Add people"
            name="people"
            rules={[
              {
                required: true,
                message: "Please input people!",
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select people of this group to create expense"
              defaultValue={dv}
              style={{
                width: "100%",
              }}
              onChange={handleSelect}
            >
              {title === "Dashboard"
                ? dashboardchildren
                : groupMembers?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
            </Select>
          </Form.Item>
        )}

        {/*Conditional rendering */}
        {(members || title !== "Dashboard") && (
          <>
            <Form.Item
              name="name"
              label="Expense Name"
              style={{ width: "100%" }}
              rules={[
                {
                  pattern: new RegExp(/^[a-zA-Z0-9]*$/i),
                  message:
                    "field does not accept any special char other than alphanumeric",
                },
                {
                  required: true,
                  message: "Missing Expense description",
                },
              ]}
            >
              <Input placeholder="Your Expense Description....." />
            </Form.Item>
            <Form.Item
              name="amount"
              label="$"
              rules={[
                {
                  type: "number",
                  message: "The input is not valid number!",
                },

                {
                  required: true,
                  message: "Missing Expense Amount paid by you",
                },
              ]}
            >
              <InputNumber
                placeholder="0.00"
                min={0}
                onChange={handleInputNumber}
                defaultValue={0}
              />
            </Form.Item>

            {/* <span><Form.Item >Paid by <Button onClick={()=>{handlePeople()}}>{payer}</Button> and split <Button>{distribution}</Button></Form.Item></span>*/}
            {inputPeople && (
              <PayerModal
                inputPeople={inputPeople}
                setInputPeople={setInputPeople}
                setPayer={setPayer}
                groupMembers={groupMembers}
              />
            )}
            {dividerModal && (
              <DistributionModal
                dividerModal={dividerModal}
                setDividerModal={setDividerModal}
                setDistribution={setDistribution}
                distribution={distribution}
                groupMembers={groupMembers}
                expenseAmount={expenseAmount}
                setIndividualContributions={setIndividualContributions}
                individualContributions={individualContributions}
              />
            )}

            <Form.Item
              name="image"
              getValueFromEvent={getFile}
              rules={[
                {
                  required: true,
                  message: "input Image",
                },
              ]}
            >
              <Upload
                beforeUpload={(file) => {
                  // console.log(file);
                  return false;
                }}
                onChange={handleImageChange}
                accept=".png,.jpeg"
                multiple={false}
                maxCount={1}
                listType="picture"
                //defaultFileList={state.fileList}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <span>
                Paid by <Button onClick={handlePeople}>{payer}</Button> and
                split{" "}
                <Button onClick={handleDividerModal}>{distribution}</Button>
              </span>

              <div style={{ marginTop: "20px" }}>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </div>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};
export default ExpenseModal;


/*
console.log("values.image",values.image);
let file=values.image.originFileObj;
let formData = new FormData();*/

//element has both name and mail
    //console.log("individualContributions",individualContributions,Object.keys(individualContributions).length);