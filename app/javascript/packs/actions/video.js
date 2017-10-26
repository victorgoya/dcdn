import createTorrent from "../createTorrent";
// var createTorrent = require("../createTorrent");

console.log(createTorrent);

export function generateTorrent(files) {
  return dispatch => {
    dispatch({ type: "TORRENT_CREATION_STARTED"});
    createTorrent(files, {}, (err, torrent) => {
      dispatch({ type: "TORRENT_CREATED", torrent: torrent });
    });
  };
}
