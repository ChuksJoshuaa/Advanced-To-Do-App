import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Typography,
  Paper,
  AppBar,
  Button,
  TextField,
} from "@material-ui/core";
import dotenv from "dotenv";
import useStyles from "./styles";
import Tasks from "../Tasks/Tasks";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { getTasksBySearch, getTasksBySearchByAdmin } from "../../actions/tasks";
import { useHistory } from "react-router-dom";

const Home = () => {
  dotenv.config();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const isAdmin = user?.result?.email === process.env.REACT_APP_EMAIL;
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const name = user?.result?.name;
  const [search, setSearch] = useState("");

  if (!name) {
    return (
      <Paper className={classes.paper}>
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital@1&family=Cormorant+Garamond:wght@300&family=Racing+Sans+One&family=Rajdhani:wght@500&family=Roboto+Mono:wght@100&display=swap"
          rel="stylesheet"
        ></link>
        <Typography variant="h6" align="center" className={classes.message}>
          Please sign in to create your own tasks and set a deadline
        </Typography>
      </Paper>
    );
  }

  const searchTask = () => {
    if (search.trim()) {
      dispatch(getTasksBySearch({ search }));
      history.push(`/task/search?searchQuery=${search}`);
    } else {
      history.push("/task");
    }
  };

  const searchTaskByAdmin = () => {
    if (search.trim()) {
      dispatch(getTasksBySearchByAdmin({ search }));
      history.push(`/task/search/admin?searchQuery=${search}`);
    } else {
      history.push("/task");
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital@1&family=Cormorant+Garamond:wght@300&family=Racing+Sans+One&family=Rajdhani:wght@500&family=Roboto+Mono:wght@100&display=swap"
          rel="stylesheet"
        ></link>
        <Grid
          container
          className={classes.gridContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Tasks setCurrentId={setCurrentId} />
          </Grid>
          {isAdmin ? (
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={6}
                className={classes.paper}
                style={{ marginBottom: "2em" }}
              >
                <Typography
                  variant="h6"
                  align="center"
                  className={classes.message}
                >
                  The Admin has the right to view all tasks and delete any one
                  of them but the admin can not create any task or edit previous
                  user's task.
                </Typography>
              </Paper>
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
                <TextField
                  name="search"
                  variant="outlined"
                  label="Search By Category"
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  onClick={searchTaskByAdmin}
                  variant="contained"
                  className={classes.searchButton}
                >
                  Search
                </Button>
              </AppBar>
            </Grid>
          ) : (
            <Grid item xs={12} sm={6} md={3}>
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
                <TextField
                  name="search"
                  variant="outlined"
                  label="Search By Category"
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  onClick={searchTask}
                  variant="contained"
                  className={classes.searchButton}
                >
                  Search
                </Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
