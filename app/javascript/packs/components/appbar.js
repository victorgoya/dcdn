import React from 'react';
import MaterialAppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'

import { openVideoDialog } from '../actions/videoDialog'

const AppBar = (props) => {
  return (
    <MaterialAppBar
      title="DCDN"
      iconElementRight={<FlatButton label="Add content" onClick={props.onOpen} />}
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onOpen: () => (
      dispatch(openVideoDialog())
    )
  }
}

export default connect(undefined, mapDispatchToProps)(AppBar);
