import React from 'react'
import { useRecoilState } from 'recoil';
import { userState } from '../store/user';

const Navbar = () => {
  const [user, setUser] = useRecoilState(userState);
  console.log("user in navbar",user);
  return (
    <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "#5bc5a7",
          margin: "0px",
          padding: "0px",
          width: "100%",
          height:"36px"
        }}
      >
        <h4 style={{ fontWeight: "bold", color: "white",fontSize:"20px" }}>S P L I T W I S E</h4>
        <p>Welcome {user.name} !!</p>
      </div>
  )
}

export default Navbar
