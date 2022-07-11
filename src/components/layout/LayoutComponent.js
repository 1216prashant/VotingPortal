import React from "react";
import Navbar from "../../common/Navbar";
import SideBarComponent from "./SideBarComponent";
import { useStyles } from "./style";

const LayoutComponent = (props) => {
  const classes = useStyles();
  return (
    <div style={{ display: "flex" }}>
      {/* <Navbar />
      {props.children} */}
      <SideBarComponent />

      <div
        style={{
          flex: 1,

          height: "99vh",
          overflow: "auto",
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default LayoutComponent;
