import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  Fab,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, firebaseDB } from "../../services/firebase/FirebaseConfig";
import { useStyles } from "./style";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import { Edit } from "@mui/icons-material";
import { async } from "@firebase/util";
import AddNewMember from "./AddNewMember";
import moment from "moment";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { Images } from "../../utils/Images";
import { useSelector } from "react-redux";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalType, setModalType] = useState();
  const { userData } = useSelector((store) => store);

  const [membersData, setMembersData] = useState({
    name: "",
    emp_code: "",
    email: "",
    office_location: "",
    doj: new Date(),
    experience: "",
    photo: "",
    admin: false,
    team_name: userData?.team_name,
    team_id: userData?.team_id,
    team_lead: userData?.team_lead,
  });
  const classes = useStyles();

  useEffect(() => {
    fetchAllCandidates();
  }, []);
  const fetchAllCandidates = async () => {
    let temp = [];
    const candidatesDBref = collection(firebaseDB, "members");
    const userQuerySnapshot = await getDocs(candidatesDBref);
    userQuerySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setCandidates(
      temp.filter(
        (el, i) => el.team_id === userData?.team_id && el.admin === false
      )
    );
  };
  const removeMemberHandler = async (id) => {
    await deleteDoc(doc(firebaseDB, "members", id));

    setModalOpen(false);
    fetchAllCandidates();
  };
  const onChangeMemberDataHandler = (field, e) => {
    const value = field === "doj" ? moment(e).format() : e.target.value;
    switch (field) {
      case "name":
        setMembersData((prev) => {
          return { ...prev, name: value };
        });
        break;
      case "emp_code":
        setMembersData((prev) => {
          return { ...prev, emp_code: value };
        });
        break;
      case "email":
        setMembersData((prev) => {
          return { ...prev, email: value };
        });
        break;
      case "office_location":
        setMembersData((prev) => {
          return { ...prev, office_location: value };
        });
        break;
      case "doj":
        setMembersData((prev) => {
          return { ...prev, doj: moment(value).format() };
        });
        break;
      case "experience":
        setMembersData((prev) => {
          return { ...prev, experience: value };
        });
        break;

      default: {
      }
    }
  };
  const addNewMemberHandler = async () => {
    let user;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        membersData?.email,
        process.env.REACT_APP_DUMMY_SIGNUP_PASSWORD
      );
      user = userCredential?.user;

      const docRef = await setDoc(doc(firebaseDB, "members", user?.uid), {
        email: membersData.email,

        phone: membersData.phone || "",
        name: membersData.name,
        admin: false,

        uid: user?.uid,
        id: user?.uid,
        experience: membersData.experience,
        doj: membersData?.doj,
        emp_code: membersData?.emp_code,
        office_location: membersData?.office_location,
        team_id: membersData.team_id,
        team_name: membersData.team_name,
        team_lead: membersData.team_lead,
      });
    } catch (err) {
      console.log(err.message);
      alert("Something went wrong. Please try after sometime");
    }
    setMembersData({
      name: "",
      emp_code: "",
      email: "",
      office_location: "",
      doj: "",
      experience: "",
      photo: "",
      admin: false,
      team_name: userData?.team_name,
      team_id: userData?.team_id,
      team_lead: userData?.team_lead,
    });

    fetchAllCandidates();
  };
  const modalCloseHandler = () => {
    setMembersData({
      name: "",
      emp_code: "",
      email: "",
      location: "",
      doj: "",
      exp: "",
      photo: "",
      admin: false,
      team_name: userData?.team_name,
      team_id: userData?.team_id,
      team_lead: userData?.team_lead,
    });
    setModalOpen(false);
  };
  const editMemberHandler = async (id) => {
    await updateDoc(doc(firebaseDB, "members", id), {
      ...membersData,
    });
    setModalOpen(false);
    fetchAllCandidates();
  };
  const getInitials = (nameString) => {
    const fullName = nameString.split(" ");
    const firstLetter = fullName[0].charAt(0);
    const secondLetter = fullName?.[1]?.charAt(0) || "";
    return `${firstLetter.toUpperCase()}${secondLetter.toUpperCase()}`;
  };
  const onSubmitHandler = (id) => {
    if (modalType === "Add") {
      addNewMemberHandler();
    } else if (modalType === "Update") {
      editMemberHandler(id);
    } else if (modalType === "Remove") {
      removeMemberHandler(id);
    }
  };
  return (
    <Grid container>
      {!userData?.admin ? (
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                alt=""
                src={Images.denied}
                style={{ height: 80, width: 80 }}
              ></img>
            </div>

            <h3>You don't have access to this panel !</h3>
          </div>
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <div style={{ paddingLeft: 10 }}>
              <Typography style={{ textAlign: "start", fontSize: "1.3rem" }}>
                My Team
              </Typography>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div style={{ paddingLeft: 10, margin: "2px 0 30px 0" }}>
              <Typography>
                You have {candidates.length} member(s) in your time
              </Typography>
              <Fab
                size="small"
                color="primary"
                aria-label="add"
                onClick={() => {
                  setModalType("Add");
                  setModalOpen(true);
                }}
              >
                <AddIcon />
              </Fab>
            </div>
          </Grid>

          <Grid item xs={12} style={{ padding: "0px 10px" }}>
            <Grid container>
              {candidates?.slice().map((el, i) => (
                <Grid
                  item
                  key={i}
                  xs={6}
                  sm={4}
                  md={3}
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",

                    marginBottom: 15,
                  }}
                >
                  <div
                    style={{
                      width: "80%",
                      // paddingTop: "80%",
                      // position: "relative",

                      overflow: "hidden",
                    }}
                  >
                    <Paper
                      elevation={0}
                      style={{
                        // position: "absolute",
                        // top: 0,
                        overflow: "hidden",
                        borderRadius: 15,

                        height: "100%",
                        width: "100%",

                        paddingTop: 10,
                        paddingBottom: 5,
                        boxSizing: "border-box",
                      }}
                    >
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            style={{
                              backgroundColor: "#e6e6e6",
                              padding: 2,
                              fontSize: "0.8rem",
                            }}
                          >
                            Doj:&nbsp;
                            {el.doj
                              ? moment(el.doj).format("Do MMM, YYYY")
                              : "NA"}
                          </Box>
                          <Box
                            style={{
                              backgroundColor: "#e6e6e6",
                              borderRadius: 10,
                              padding: 2,
                              fontSize: "0.8rem",
                            }}
                          >
                            {el.experience || ""} yr
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Avatar
                            style={{
                              backgroundColor: "white",
                              color: "black",
                              border: "1px solid",
                              width: 60,
                              height: 60,
                            }}
                          >
                            {getInitials(el.name)}
                          </Avatar>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Typography style={{ fontWeight: "bold" }}>
                            #{el.emp_code || "###"}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Typography style={{ fontWeight: "bold" }}>
                            {el.name}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Typography>{el.office_location}</Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 5,
                          }}
                        >
                          <Box>
                            <Edit
                              style={{ cursor: "pointer" }}
                              color="success"
                              onClick={() => {
                                setModalData({ ...el });
                                setMembersData({ ...el });
                                setModalType("Update");
                                setModalOpen(true);
                              }}
                            />
                            <DeleteForeverIcon
                              onClick={() => {
                                setModalData({ ...el });
                                setMembersData({ ...el });
                                setModalType("Remove");
                                setModalOpen(true);
                              }}
                              style={{ color: "#ff3300", cursor: "pointer" }}
                            />
                          </Box>
                        </div>
                      </Grid>
                    </Paper>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <AddNewMember
            open={modalOpen}
            memberData={membersData}
            onChangeMemberDataHandler={onChangeMemberDataHandler}
            onSubmit={onSubmitHandler}
            onClose={modalCloseHandler}
            modalType={modalType}
          />
        </>
      )}
    </Grid>
  );
};

export default Candidates;
