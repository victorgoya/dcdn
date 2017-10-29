import createTorrent from "../createTorrent";
import parseTorrent from "../parseTorrent";

import Evaporate from "evaporate";
import AWS from "aws-sdk";
import { change } from "redux-form";
import { post, list } from "../http";

export function setS3UploadState(state) {
  return { type: "SET_S3_UPLOAD_STATE", state };
}

export function setTorrentCreationState(state) {
  return { type: "SET_TORRENT_CREATION_STATE", state };
}

export function generateTorrent(form, files) {
  return dispatch => {
    dispatch(setTorrentCreationState("started"));
    createTorrent(files, {}, (err, torrent) => {
      dispatch(change(form, "torrent", torrent));
      dispatch(change(form, "info_hash", parseTorrent(torrent).infoHash));

      dispatch(setTorrentCreationState("done"));
    });
  };
}

export function uploadToS3(form, files) {
  return (dispatch, getState) => {
    dispatch(setS3UploadState("started"));

    const { configuration } = getState();
    Evaporate.create({
      signerUrl: configuration.s3signerurl,
      aws_key: configuration.s3key,
      bucket: configuration.s3bucket,
      computeContentMd5: true,
      cryptoMd5Method: (data) => { AWS.util.crypto.md5(data, 'base64') },
      cryptoHexEncodedHash256: (data) => { return AWS.util.crypto.sha256(data, 'hex'); }
    })
    .then((evaporate) => {
      evaporate.add({
        name: files[0].name,
        file: files[0],
        complete: (_xhr, awsKey) => {
          dispatch(setS3UploadState("done"));
          dispatch(change(form, "key", awsKey));
        }
      })
    });
  };
}

export function submitContent(values) {
  return (dispatch) => {
    post("/contents", {
      content: {
        key: values.key,
        torrent: values.torrent.toString('base64'),
        info_hash: values.info_hash,
        title: values.title,
        description: values.description
      }
    }).then(res => dispatch({ type: "CONTENTS_SET", payload: [res] }))
  }
}

export function loadContents(options = {}) {
  return (dispatch) => {
    list("/contents").then(res => {
      dispatch({ type: "CONTENTS_SET", payload: res });
    })
  }
}
