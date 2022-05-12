import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Task from "./Task/Task";
import { Grid, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";
import { getUserTasks, getAllTasks } from "../../actions/tasks";
import dotenv from "dotenv";

const Tasks = ({ setCurrentId }) => {
  dotenv.config();
  const user = JSON.parse(localStorage.getItem("profile"));
  const isAdmin = user?.result?.email === process.env.REACT_APP_EMAIL;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { tasks, isLoading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getUserTasks());
  }, [dispatch]);

  useEffect(() => {
    if (isAdmin) {
      dispatch(getAllTasks());
    }
  }, [dispatch, isAdmin]);

  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {tasks.map((task) => (
        <Grid key={task._id} item xs={12} sm={6} md={6} lg={4}>
          <Task task={task} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Tasks;
