import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    container: {},
    titleHeading: {
      fontSize: "1.6rem !important",
      fontWeight: "bolder !important",
      margin: "15px 0 10px 10px !important",
      // width: "80%",
      // textAlign: "left",
      textTransform: "capitalize",
    },

    tileBoxes: {
      width: "80%",
      marginBottom: 10,
    },
    tilePaper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 10,
    },
    tileName: {
      fontSize: "1.2rem !important",
      fontWeight: "bold !important",
      opacity: 0.9,
    },
    taskCount: {
      fontSize: "1.2rem !important",
      textAlign: "right",
      opacity: 0.7,
      margin: 0,
      // paddingRight: 10,
      // paddingBottom: 10,
      boxSizing: "border-box",
      position: "absolute",
      right: 5,
      bottom: 0,
    },
    dashboardHeading: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    detailsText: {
      color: "#1976d2",
      cursor: "pointer",
    },
  };
});
