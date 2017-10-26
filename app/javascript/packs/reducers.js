import videoDialog from "./reducers/videoDialog";
import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  videoDialog,
  form: formReducer
})
