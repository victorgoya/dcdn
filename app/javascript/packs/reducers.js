import configuration from "./reducers/configuration";
import loading from "./reducers/loading";
import contents from "./reducers/contents";
import currentToken from "./reducers/currentToken";
import currentContent from "./reducers/currentContent";
import currentPreview from "./reducers/currentPreview";
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
  contents,
  currentToken,
  currentContent,
  currentPreview,
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
