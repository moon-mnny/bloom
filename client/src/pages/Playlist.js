import React, { Component } from "react";
import API from "../utils/playlist.api";
import PlaylistCard from "../components/PlaylistCard";
import history from "../history";

export default class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      currentMood: localStorage.getItem("current_mood"),
      playlists: [],
    };
  }

  componentDidMount() {
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

  loggedIn() {
    // eslint-disable-next-line
    if (this.state.token == undefined) {
      history.push("/login");
    }
  }

  render() {
    return (
      <div>
        <div>Playlist</div>

        {this.state.playlists.map((playlist) => (
          <div className="col s12" value="mood" key={playlist.id}>
            <PlaylistCard
              id={playlist.id}
              name={playlist.name}
              url={playlist.images[0].url}
              description={playlist.description}
              tracks={playlist.tracks.total}
              href={playlist.href}
            />
          </div>
        ))}
      </div>
    );
  }
}
