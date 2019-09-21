import WebTorrent from 'webtorrent';

const client = new WebTorrent({ webSeeds: false })

export function createPreview(content) {
  return (dispatch, getState) => {
    fetch(content.torrent_url)
    .then(res => res.blob())
    .then((torrent) => {
      client.add(torrent, function (torrent) {
        dispatch({ type: "SET_CURRENT_PREVIEW", payload: torrent.files[0] });
      });
      client.on('torrent', function(err) {
      })
      client.on('error', function(err) {
      })
    });
  };
}
