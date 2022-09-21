import { Divider } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React from 'react'

const SubDashboard = () => {
  return (
    <>
    <hr style={{margin:"0px",color:"grey"}}/>
      <Header
        className="site-layout-background"
        style={{
          backgroundColor: "#D3D3D3",
          padding: 0,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-around"}}>
        <span style={{paddingBottom:"20px"}}>Total Balance :$ </span>
        <Divider
          type="vertical"
          style={{ "background-color": "grey" ,height:"64px"}}
        />
        <span style={{paddingBottom:"20px"}}>You Owe :$ </span>
        <Divider
          type="vertical"
          style={{ "background-color": "grey",height:"64px"}}
        />
        <span style={{paddingBottom:"20px"}}>You are owed :$ </span>
      </div>
      </Header>
    
    </>
    
  )
}

export default SubDashboard
