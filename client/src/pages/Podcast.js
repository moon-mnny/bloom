import React, { Component } from "react";
import API from "../utils/Podcast.api";
import PodcastCard from "../components/PodcastCard";
import Navbar from "../components/Navbar";
import history from "../history";
import CategoryNavigation from "../components/CategoryNavigation";
import Loader from "react-loader-spinner";

export default class Podcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      id: localStorage.getItem("id"),
      currentMood: localStorage.getItem("current_mood"),
      podcasts: [],
      showResults: false,
    };
  }

  componentDidMount() {
    this.showResults();
    this.loggedIn();
    if (this.state.currentMood === "Happy") {
      API.getPodcastHappy()
        .then((response) => {
          this.setState({
            podcasts: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (this.state.currentMood === "Bleh") {
      API.getPodcastBleh()
        .then((response) => {
          this.setState({
            podcasts: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (this.state.currentMood === "Sad") {
      API.getPodcastSad()
        .then((response) => {
          this.setState({
            podcasts: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else console.log("no mood available");
  }

  handleFormSave = (podcast) => {
    API.savePodcast(podcast, this.state.token).then((response) => {});
  };

  showResults() {
    setTimeout(
      function () {
        this.setState({ showResults: true });
      }.bind(this),
      3000
    );
  }

  loggedIn() {
    // eslint-disable-next-line
    if (this.state.token == undefined) {
      history.push("/login");
    }
  }

  render() {
    const showResults = this.state.showResults;
    return (
      <div
        style={{
          margin: "0px",
          padding: "0px",
          width: "100vw",
          position: "relative",
          background:
            "linear-gradient(351deg, rgba(200,123,148,1) 0%, rgba(156,206,213,1) 50%, rgba(251,168,134,1) 100%)",
          backgroundSize: "cover",
        }}
      >
        <div style={{ width: "100%", boxSizing: "border-box" }}>
          <Navbar title="Podcast" currentMood={this.state.currentMood} />
          <div
            style={{
              columnCount: "2",
              columnGap: "1em",
              padding: "0.7em",
              height: "100%",
              marginBottom: "55px",
              paddingTop: "65px",
            }}
          >
            <div
              className={showResults ? "hide" : "show"}
              style={{
                top: "50%",
                position: "fixed",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <Loader
                type="Circles"
                color="#FFB383"
                height={80}
                width={80}
                timeout={3000} //3 secs
              />
            </div>
            <div id="results" className={showResults ? "show" : "hide"}>
              {this.state.podcasts.map((podcast) => (
                <div className="s12" value="mood" key={podcast.id}>
                  <PodcastCard
                    id={podcast.id}
                    title_original={podcast.title_original}
                    image={podcast.image}
                    podcast_title_original={podcast.podcast_title_original}
                    audio_length_sec={podcast.audio_length_sec}
                    audio={podcast.audio}
                    // link="#"

                    handleFormSave={this.handleFormSave}
                  />
                </div>
              ))}
            </div>
          </div>
          <CategoryNavigation currentPage="podcast" />
        </div>
      </div>
    );
  }
}
