import React from "react";
import { Home } from "./routes/Home";
import { CreateMenu } from "./routes/createMenu/CreateMenu";
import { Error } from "./routes/Error";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {CreateGrammar} from "./routes/createGrammar/CreateGrammar";

interface Props {}

export const App: React.FC<Props> = () => {
  return (
    <div className="vh-100" style={{ backgroundColor: "#303030" }}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/createMenu" component={CreateMenu} />
            <Route path="/createGrammar" component={CreateGrammar} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
