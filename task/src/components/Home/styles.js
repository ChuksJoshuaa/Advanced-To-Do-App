import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    padding: "16px",
  },
  pagination: {
    borderRadius: 4,
    marginTop: "1rem",
    padding: "16px",
  },
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
  paper: {
    padding: theme.spacing(2),
  },

  message: {
    fontFamily: `"Rajdhani", sans-serif`,
    color: "rgba(15, 15, 15, 0.9)",
  },

  searchButton: {
    margin: "10px 2px 10px 2px",
    display: "flex",
    flexDirection: "column",
    textTransform: "capitalize",
  },
  messages: {
    fontFamily: `"Rajdhani", sans-serif`,
    color: "rgba(15, 15, 15, 0.9)",
    textTransform: "capitalize",
  },
}));
