import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    container: {},
    titleHeading: {
      fontSize: "1.6rem !important",
      fontWeight: "bolder !important",
      margin: "25px 0 30px 0 !important",
      width: "80%",
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

    detailsText: {
      color: "#1976d2",
      cursor: "pointer",
    },
  };
});
