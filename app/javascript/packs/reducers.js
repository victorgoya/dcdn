import configuration from "./reducers/configuration";
import loading from "./reducers/loading";
import { combineReducers } from "redux";
import { reducer as formReducer, actionTypes as formActionTypes } from 'redux-form';

function setMetaState(state, metaName, value) {
  return {
    ...state,
    fields: {
      ...state.fields,
      upload: {
        ...state.fields.upload,
        [metaName]: value
      }
    }
  }
}

export default combineReducers({
  configuration,
  loading,
  form: formReducer.plugin({
    content: (state, action) => {
      switch (action.type) {
        case "SET_S3_UPLOAD_STATE":
          return (setMetaState(state, "s3Upload", action.state));
        case "SET_TORRENT_CREATION_STATE":
          return (setMetaState(state, "torrentCreation", action.state));
        default:
          return state;
      }
    }
  })
})
