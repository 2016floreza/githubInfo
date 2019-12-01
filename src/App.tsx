import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import SignUp from "./SignUp";
import { TokenProvider } from "./components/TokenContext";
import Dashboard from "./Dashboard";

const App: React.FC = () => {
  return (
    <TokenProvider>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </TokenProvider>
  );
};

export default App;
