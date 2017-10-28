import React from 'react';
import MaterialAppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const AppBar = (props) => {
  return (
    <MaterialAppBar
      title="DCDN"
      iconElementRight={
        <FlatButton
          containerElement={<Link to="/contents/new" />}
          label="Add content"
        />
      }
    />
  );
};

export default connect(undefined, undefined)(AppBar);
