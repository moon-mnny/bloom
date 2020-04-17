import React, { Component } from "react";
import API from "../utils/playlist.api";
import PlaylistCard from "../components/PlaylistCard";
import Navbar from "../components/Navbar";
import CategoryNavigation from "../components/CategoryNavigation";
import history from "../history";
import Loader from "react-loader-spinner";

export default class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      id: localStorage.getItem("id"),
      currentMood: localStorage.getItem("current_mood"),
      playlists: [],
      showResults: false,
    };
  }

  componentDidMount() {
    this.showResults();
    this.loggedIn();
    if (this.state.currentMood === "Happy") {
      API.getPlaylistHappy()
        .then((response) => {
          console.log("playlist:", response.data);
          this.setState({
            playlists: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (this.state.currentMood === "Bleh") {
      API.getPlaylistBleh()
        .then((response) => {
          console.log("playlist:", response.data);
          this.setState({
            playlists: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (this.state.currentMood === "Sad") {
      API.getPlaylistSad()
        .then((response) => {
          console.log("playlist:", response.data);
          this.setState({
            playlists: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else console.log("no mood available");
  }

  showResults() {
    setTimeout(
      function () {
        this.setState({ showResults: true });
      }.bind(this),
      3000
    );
  }

  handleFormSave = (playlist) => {
    console.log(playlist);
    API.savePlaylist(this.state.id, playlist).then((response) => {
      console.log("success!");
    });
  };

  loggedIn() {
    // eslint-disable-next-line
    if (this.state.token == undefined) {
      history.push("/login");
    }
  }

  render() {
    const showResults = this.state.showResults;
    return (
      <div style={{ width: "100%", boxSizing: "border-box" }}>
        <Navbar title="Playlist" currentMood={this.state.currentMood} />
        <div
          style={{
            columnCount: "2",
            columnGap: "1em",
            padding: "0.7em",
            height: "100%",
            marginBottom: "55px",
          }}
        >
          <div
            className={showResults ? "hide" : "show"}
            style={{ top: "45%", position: "absolute", left: "40%" }}
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
            {this.state.playlists.map((playlist) => (
              <div className="s12" value="mood" key={playlist.id}>
                <PlaylistCard
                  id={playlist.id}
                  name={playlist.name}
                  url={playlist.images[0].url}
                  description={playlist.description}
                  extraInfo={`Total Tracks: ${playlist.tracks.total}`}
                  href={playlist.external_urls.spotify}
                  app={playlist.uri}
                  handleFormSave={this.handleFormSave}
                />
              </div>
            ))}
          </div>
        </div>
        <CategoryNavigation currentPage="playlist" />
      </div>
    );
  }
}
