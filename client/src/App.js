import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import Signup from "./pages/Signup";
import LogIn from "./pages/Login";
import Exercise from "./pages/Exercise";
import Recipe from "./pages/Recipe";
import Poem from "./pages/Poem";
import Playlist from "./pages/Playlist";
import Podcast from "./pages/Podcast";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import Dashboard from "./pages/Dashboard";
import LogMood from "./pages/LogMood";
import Bookmark from "./pages/Bookmarks";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/welcome" component={LogMood} />
          <Route exact path="/profile" component={UserProfile} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/newpassword" component={NewPassword} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/exercise" component={Exercise} />
          <Route exact path="/recipe" component={Recipe} />
          <Route exact path="/playlist" component={Playlist} />
          <Route exact path="/podcast" component={Podcast} />
          <Route exact path="/poem" component={Poem} />
          <Route exact path="/bookmarks" component={Bookmark} />
        </div>
      </Router>
    );
  }
}

export default App;
