import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import SignUpForm from "./SignUpForm";
import { Typography } from "@material-ui/core";
import { Redirect } from "react-router";
import { TokenContext } from "../components/TokenContext";

const useStyles = makeStyles({
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue"
  },
  card: {
    minWidth: 400
  },
  title: {
    fontSize: 20
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end"
  }
});

const SignUp: React.FC = () => {
  const classes = useStyles();

  const tokenContext = useContext(TokenContext);
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleClick = () => {
    setRedirect(true);
  };

  if (!tokenContext) {
    return <div />;
  }

  const token = tokenContext[0];
  const setToken = tokenContext[1];

  if (redirect && token) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title}>Insert Github token</Typography>
          <SignUpForm token={token} setToken={setToken} />
        </CardContent>
        <CardActions className={classes.buttonContainer}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Validate
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default SignUp;
