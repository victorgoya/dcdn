import React from 'react';
import MaterialAppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'

import { openContentForm } from '../actions/contentForm'

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
      dispatch(openContentForm())
    )
  }
}

export default connect(undefined, mapDispatchToProps)(AppBar);
