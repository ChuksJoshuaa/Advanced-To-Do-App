import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask } from "../../actions/tasks";
import { useHistory } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    category: "",
  });

  const task = useSelector((state) =>
    currentId ? state.tasks.tasks.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (task) {
      setPostData(task);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updateTask(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createTask({ ...postData, name: user?.result?.name }, history));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({ title: "", message: "", category: "" });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" className={classes.memory}>
          {`${currentId ? "Editing Task" : "Creating Task"}`}
        </Typography>
        <TextField
          name="message"
          variant="outlined"
          label="Task"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="category"
          variant="outlined"
          label="Category"
          fullWidth
          value={postData.category}
          onChange={(e) =>
            setPostData({ ...postData, category: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Deadline"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
