import { Button, InputNumber, Modal, Radio } from "antd";
import React, { useRef, useState } from "react";
import { Card, Form, Input } from "antd";
import { useEffect } from "react";
const gridStyle = {
  width: "100%",
  textAlign: "left",
  display: "flex",
  justifyContent: "space-between",
};
const formStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const DistributionModal = ({
  dividerModal,
  setDividerModal,
  setDistribution,
  distribution,
  groupMembers,
  expenseAmount,
  setIndividualContributions,
  individualContributions,
}) => {
  //let [individualCost, setIndividualCost] = useState(78);
  let [individualCost, setIndividualCost] = useState(0);
  let [form] = Form.useForm();
  form.resetFields();
  //console.log("obj issss",obj)
  //let [formFields, setFormFields] = useState(obj);
  //console.log("formFields",formFields);

  useEffect(() => {
    //individualCost=expenseAmount/groupMembers.length;
    //form.resetFields()
    if (groupMembers.length > 0 && distribution === "Equal")
      setIndividualCost(expenseAmount / groupMembers.length);

    form.resetFields();
    //setFormFields(obj)
    //console.log("after rendering , at last useEffect prints individualCost",individualCost)
  }, [distribution, expenseAmount, groupMembers.length, form]);

  // useEffect(()=>{
  //   groupMembers.map((item) => {
  //     const n = item.name;
  //     form.setFieldsValue({
  //       n: individualCost,
  //     });
  //   });
  // },[individualCost])
  console.log(
    "checking whether DM s re rendering....21 line",
    expenseAmount,
    individualCost,
    typeof individualCost
  );
  const showModal = () => {
    //setIsModalOpen(true);
  };
  const onRadioChange = (e) => {
    console.log("radio checked", e.target.value);
    setDistribution(e.target.value);
  };

  const handleOk = () => {
    console.log("onOk individualContributions", individualContributions);
    console.log("handleOk", individualCost);
    if (distribution === "Unequal") {
      console.log("hi its unequal");
      console.log("unequal", individualCost);
    }
    //setIndividualCost(0);
    setDividerModal(false);
  };

  const handleCancel = () => {
    console.log("hiiiii");
    //setIndividualCost(0);
    setDividerModal(false);
  };
  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values) => {
    let allValues = Object.values(values);

    console.log("individualContributions", individualContributions);
    if (distribution === "Equal") {
      console.log("onFinish", values);
    }
    if (distribution === "Unequal") {
      let sum = allValues.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      console.log("sum is", sum);
      if (sum !== expenseAmount) {
        return alert("Sum of partitions is not equal to total expense!!!");
      } else {
        setIndividualContributions(values);
      }
    }
    if (distribution === "Percent") {
      console.log(allValues);
      allValues = allValues.map((item) => (item * expenseAmount) / 100);
      console.log(allValues);
      let sum = allValues.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      console.log("sum is", sum);
      if (sum !== expenseAmount) {
        return alert("Sum of partitions is not equal to total expense!!!");
      } else {
        alert(values);
        setIndividualContributions(values);
      }
    }
    console.log(
      "individualContributions at end of OnFinish",
      individualContributions
    );

    //console.log("onFinish", values);
    setDividerModal(false);
  };

  return (
    <>
      {/* {console.log(
        "checking whether DM s re rendering....21 line",
        expenseAmount,
        individualCost
      )} */}
      <Modal
        className="modalStyle"
        title="Add an Expense"
        style={{
          left: 420,
          backgroundColor: "#5bc5a7",
        }}
        maskClosable={false}
        open={dividerModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Radio.Group
          defaultValue="Equal"
          buttonStyle="solid"
          onChange={onRadioChange}
        >
          <Radio.Button value="Equal">Equal</Radio.Button>
          <Radio.Button value="Unequal">Unequal</Radio.Button>
          <Radio.Button value="Percent">Percent</Radio.Button>
          <Radio.Button value="Share">Share</Radio.Button>
        </Radio.Group>

        <Card title={distribution}>
          <Form
            form={form}
            onFinish={onFinish}

            //style={formStyle}
          >
            {groupMembers.map((item) => (
              <>
                <Card.Grid style={gridStyle}>
                  <div>{item.name}</div>
                  {distribution === "Equal" ? (
                    <div>{individualCost}</div>
                  ) : distribution === "Unequal" ? (
                    <div>
                    <Form.Item
                      name={item.name}
                      style={{ width: "60%" }}
                    > 
                    <InputNumber
                      min={0} placeholder={individualCost}
                    />
                    </Form.Item>
                  </div>
                  ) : (
                    <div>
                    <Form.Item
                      name={item.name}
                      initialValue={0}
                      style={{ width: "60%" }}
                    >
                      
                      <InputNumber min={0} placeholder={0}
                      />
                  
                    </Form.Item>
                    </div>
                  )}
                 
                </Card.Grid>
              </>
            ))}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Card>
        {/* {console.log("checking whether DM s re rendering....")} */}
      </Modal>
    </>
  );
};

export default DistributionModal;

/* <Input
              placeholder={individualCost}
              value={individualCost}
              defaultValue={individualCost}
              disabled={distribution === "Equal" ? true : false}
              onChange={()=>{console.log()}}
            /> */

/*rules={[
              {
                required: true,
                message: "Missing Expense description",
              },
            ]}*/

// import { Modal, Radio } from 'antd';
// import React, { useRef, useState } from 'react'
// import { Card, Form, Input } from "antd";
// import { useEffect } from 'react';
// const gridStyle = {
//   width: "100%",
//   textAlign: "left",
//   display: "flex",
//   justifyContent: "space-between",
// };
// const formStyle={
//   display: "flex",
//   justifyContent: "space-between",
// }
// const data = ["s", "a"];

// let title="";
// let indicost=[];
// let splittedAmounts=[]
// const DistributionModal = ({dividerModal,setDividerModal,setDistribution,distribution,groupMembers,expenseAmount}) => {
//   let [individualCost,setIndividualCost] = useState(0);
//   const inputEl = useRef(null);
//     useEffect(()=>{
//         //individualCost=expenseAmount/groupMembers.length;
//         setIndividualCost(expenseAmount/groupMembers.length)
//         //console.log("after rendering , at last useEffect prints individualCost",individualCost)
//     },[distribution,expenseAmount,groupMembers.length]);

//     console.log("checking whether DM s re rendering....21 line",expenseAmount,individualCost)
//     const showModal = () => {
//         //setIsModalOpen(true);
//       };
//       const onRadioChange = (e) => {/////
//         title=e.target.value;
//         console.log('radio checked', e.target.value);
//         setDistribution(e.target.value)

//       };

//       const handleOk = (a) => {
//         console.log(a)
//         console.log("handleOk",individualCost)
//         if(distribution==='Unequal'){
//           console.log("hi its unequal")
//           console.log("unequal",individualCost)
//         }
//         setIndividualCost(0);
//         setDividerModal(false);
//       };

//       const handleCancel = () => {
//         console.log("hiiiii")
//         setIndividualCost(0);
//         setDividerModal(false);
//       };

//       const handleClick = (values) => {
//         console.log("handle click is called")
//         console.log(values)

//       };

//       const onFinish = (values) => {
//         console.log(values)

//       };
//       const onIndividualInputChange=(e)=>{
//         console.log("onIndividualInputChange",e.target.value)
//         console.log("focus is ",inputEl.current.input.focus())
//         splittedAmounts=[...splittedAmounts,]
//       }
//   return (
//     <>
//     {    console.log("checking whether DM s re rendering....21 line",expenseAmount,individualCost)
// }
//     <Modal
//       className="modalStyle"
//       title="Add an Expense"
//       style={{
//         left: 420,
//         backgroundColor: "#5bc5a7"
//       }}
//       maskClosable = {false}
//       open={dividerModal}
//       onOk={handleOk}
//       onCancel={handleCancel}
//       onFinish={handleClick}
//     >
//       <Radio.Group defaultValue="Equal" buttonStyle="solid"  onChange={onRadioChange}>
//       <Radio.Button value="Equal">Equal</Radio.Button>
//       <Radio.Button value="Unequal">Unequal</Radio.Button>
//       <Radio.Button value="Percent">Percent</Radio.Button>
//       <Radio.Button value="Share">Share</Radio.Button>
//     </Radio.Group>

//     <Card title={distribution}>
//     <Form
//           onFinish={onFinish}
//           fields={[
//             {
//               name: ["name"],
//               value: individualCost,//for default value
//             },
//           ]}
//           //style={formStyle}
//           >
//     {groupMembers.map((item) => (
//       <>
//         <Card.Grid style={gridStyle}>
//           <div>{item.name}</div>
//           <div>

//           <Form.Item
//             name="name"
//             style={{ width: "60%" }}
//             /*rules={[
//               {
//                 required: true,
//                 message: "Missing Expense description",
//               },
//             ]}*/
//           >
//             <Input disabled={distribution==='Equal'?true:false} onChange={onIndividualInputChange} /*placeholder={individualCost}*//>
//           </Form.Item>
//           </div>

//         </Card.Grid>
//       </>
//     ))}
//     </Form>
//   </Card>
//   {console.log("checking whether DM s re rendering....")}
//     </Modal>

//     </>
//   )
// }

// export default DistributionModal

/*
<Card title={distribution}>
          <Form
            form={form}
            onFinish={onFinish}

            //style={formStyle}
          >
            {groupMembers.map((item) => (
              <>
                <Card.Grid style={gridStyle}>
                  <div>{item.name}</div>
                  <div>
                    <Form.Item
                      name={item.name}
                      initialValue={
                        distribution === "Percent" || distribution === "Share"
                          ? 0
                          : individualCost
                      }
                      style={{ width: "60%" }}
                    >
                      {/* {console.log("line 143",individualCost)} 
                      {distribution==='Equal' ? <div>{individualCost}</div>:
                      <InputNumber
                        disabled={distribution === "Equal" ? true : false}
                        value={individualCost}
                      />
                      }
                    </Form.Item>
                  </div>
                </Card.Grid>
              </>
            ))}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Card>
*/
