import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "../components/Home";
import Calendar from "../components/Calendar";
import Links from "../components/Links";
import SalaatTimes from "../components/SalaatTimes";
import Youtube from "../components/Youtube";
export default props => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/calendar" component={Calendar} />
      <Route exact path="/links" component={Links} />
      <Route exact path="/salaat-times" component={SalaatTimes} />
      <Route exact path="/namaz-times" component={SalaatTimes} />
      <Route exact path="/youtube" component={Youtube} />
    </div>
  </BrowserRouter>
);
