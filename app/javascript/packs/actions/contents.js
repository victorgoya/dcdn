import createTorrent from "../createTorrent";
import parseTorrent from "../parseTorrent";
import UUID from "uuid-js";

import { change } from "redux-form";
import { create, find } from "../http";
import { createEvaporate } from "../evaporate";

export function setS3UploadState(state) {
  return { type: "SET_S3_UPLOAD_STATE", state };
}

export function setTorrentCreationState(state) {
  return { type: "SET_TORRENT_CREATION_STATE", state };
}

export function generateTorrent(form, files) {
  return (dispatch, getState) => {
    dispatch(setTorrentCreationState("started"));
    const { configuration } = getState();

    const options = {
      name: files[0].name,
      announceList: [configuration.trackers.split(",")]
    }
    createTorrent(files, options, (err, torrent) => {
      const infoHash = parseTorrent(torrent).infoHash;
      dispatch(change(form, "info_hash", infoHash));

      createEvaporate().then((evaporate) => {
        const torrentFileName = `${infoHash}.torrent`
        evaporate.add({
          name: `torrents/${torrentFileName}`,
          file: new File([torrent], torrentFileName),
          complete: (_xhr, awsKey) => {
            dispatch(change(form, "torrent_key", awsKey));
            dispatch(setTorrentCreationState("done"));
          }
        });
      });
    });
  };
}

export function uploadToS3(form, files) {
  return (dispatch, getState) => {
    dispatch(setS3UploadState("started"));

    const { configuration, evaporate } = getState();
    createEvaporate().then((evaporate) => {
      evaporate.add({
        name: `contents/${UUID.create().toString()}/${files[0].name}`,
        file: files[0],
        complete: (_xhr, awsKey) => {
          dispatch(setS3UploadState("done"));
          dispatch(change(form, "key", awsKey));
        }
      });
    });
  };
}

export function submitContent(values) {
  return (dispatch) => {
    create("/contents", {
      content: {
        key: values.key,
        torrent_key: values.torrent_key,
        info_hash: values.info_hash,
        title: values.title,
        description: values.description
      }
    })
    .then(res => dispatch({ type: "CONTENTS_SET", payload: [res] }))
  }
}

export function loadContents(options = {}) {
  return (dispatch) => {
    find("/contents")
    .then(res =>  dispatch({ type: "CONTENTS_SET", payload: res }));
  }
}
