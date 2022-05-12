import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    alignItems: "center",
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(2),
  },

  message: {
    fontFamily: `"Rajdhani", sans-serif`,
    color: "rgba(15, 15, 15, 0.9)",
  },
}));
