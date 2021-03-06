const mongoose = require("mongoose");

const { Schema } = mongoose;

const PodcastSchema = new Schema({
  title_original: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  podcast_title_original: {
    type: String,
    required: true,
  },
  audio_length_sec: {
    type: Number,
    required: true,
  },
  audio: {
    type: String,
    required: true,
  },
});

const Podcast = mongoose.model("Podcasts", PodcastSchema);

module.exports = Podcast;
