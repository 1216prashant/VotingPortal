import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import "react-pro-sidebar/dist/css/styles.css";
import { Images } from "../../utils/Images";
import "./style.css";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import CircleIcon from "@mui/icons-material/Circle";
import { Box } from "@mui/system";

const SideBarComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { login, retrieved } = useSelector((state) => state);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [navMenu, setNavMenu] = useState([
    { name: "Dashboard", route: "/dashboard", icon: Images.dashboard },
    { name: "Let's Vote", route: "/voting", icon: Images.vote },
  ]);
  const handleLogout = () => {
    dispatch(actions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userid");

    history.push("/");
  };
  return (
    <div id="header" style={{ width: collapsed ? 80 : 220 }}>
      {/* collapsed props to change menu size using menucollapse state */}
      <ProSidebar collapsed={collapsed}>
        <SidebarHeader>
          <div
            className="logotext"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              boxSizing: "border-box",
              padding: "10px 5px",
            }}
          >
            {/* small and big change using menucollapse state */}
            <div style={{ overflow: "hidden" }}>
              <img
                alt=""
                src={Images.logo}
                style={{ height: "70%", width: "65%" }}
              ></img>
            </div>
            <MenuIcon
              style={{ cursor: "pointer", width: 30 }}
              onClick={() => setCollapsed((prev) => !prev)}
            />
          </div>
          <div className="closemenu">
            {/* changing menu collapse icon on click */}
            {/* {menuCollapse ? (
              <FiArrowRightCircle/>
            ) : (
              <FiArrowLeftCircle/>
            )} */}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            {navMenu.map((el, i) => (
              <MenuItem
                key={i}
                icon={<img alt="" src={el.icon}></img>}
                onClick={() => {
                  let temp = navMenu.map((item, j) => {
                    return {
                      ...item,
                      active: i === j ? true : false,
                    };
                  });

                  setNavMenu(temp);
                  history.push(el.route);
                }}
                active={el.route === location?.pathname}
              >
                {el.name}
              </MenuItem>
            ))}

            <SubMenu
              title="Admin Panel"
              active={true}
              icon={<img alt="" src={Images.admin}></img>}
            >
              <MenuItem
                active={location?.pathname == "/admin-panel/my-teams"}
                onClick={() => history.push("/admin-panel/my-teams")}
              >
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <CircleIcon style={{ width: 5, marginRight: 10 }} /> My Team
                </Box>
              </MenuItem>
              {/* <MenuItem onClick={() => history.push("/admin-panel/users")}>
                Users
              </MenuItem> */}
              <MenuItem
                active={location?.pathname == "/admin-panel/poll-results"}
                onClick={() => history.push("/admin-panel/poll-results")}
              >
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <CircleIcon style={{ width: 5, marginRight: 10 }} /> Poll
                  Results
                </Box>
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
        {login ? (
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem
                icon={<img alt="" src={Images.logout}></img>}
                onClick={handleLogout}
              >
                Logout
              </MenuItem>
            </Menu>
          </SidebarFooter>
        ) : null}
      </ProSidebar>
    </div>
  );
};

export default SideBarComponent;
