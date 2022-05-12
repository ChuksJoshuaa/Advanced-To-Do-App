import React from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PersonIcon from "@material-ui/icons/Person";
import { useDispatch } from "react-redux";
import dotenv from "dotenv";
import { deleteTask } from "../../../actions/tasks";

const Task = ({ task, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  dotenv.config();
  const isAdmin = user?.result?.email === process.env.REACT_APP_EMAIL;
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card} raised elevation={9}>
      <link
        href="https://fonts.googleapis.com/css2?family=Amiri:ital@1&family=Cormorant+Garamond:wght@300&family=Racing+Sans+One&family=Rajdhani:wght@500&family=Roboto+Mono:wght@100&display=swap"
        rel="stylesheet"
      ></link>

      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{ fontSize: "1em", fontWeight: "400" }}
          className={classes.message}
        >
          Task: {task.message}
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.message}
        >
          Category: {task.category}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.messages}
        >
          Deadline: {task.title}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        {user?.result?._id === task?.creator && (
          <Button
            style={{
              color: "blue",
              fontSize: "0.9em",
              textTransform: "capitalize",
              fontFamily: `"Rajdhani", sans-serif`,
            }}
            size="small"
            onClick={() => setCurrentId(task._id)}
          >
            <EditIcon style={{ fontSize: "1em" }} />
            Edit
          </Button>
        )}

        {isAdmin && (
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.messages}
            style={{ color: "blue" }}
          >
            <PersonIcon style={{ fontSize: "0.8em" }} />
            {task.name}
          </Typography>
        )}
        {user?.result?._id === task?.creator && (
          <Button
            size="small"
            style={{
              color: "crimson",
              fontSize: "0.9em",
              textTransform: "capitalize",
              fontFamily: `"Rajdhani", sans-serif`,
            }}
            onClick={() => dispatch(deleteTask(task._id))}
          >
            <DeleteIcon style={{ fontSize: "1em" }} />
            Delete
          </Button>
        )}
        {isAdmin && (
          <Button
            size="small"
            style={{
              color: "crimson",
              fontSize: "0.9em",
              textTransform: "capitalize",
              fontFamily: `"Rajdhani", sans-serif`,
            }}
            onClick={() => dispatch(deleteTask(task._id))}
          >
            <DeleteIcon style={{ fontSize: "1em" }} />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Task;
