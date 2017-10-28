import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from "./appbar";
import LinearProgress from 'material-ui/LinearProgress';
import { connect } from 'react-redux';

const Main = (props) => (
  <div>
    <AppBar />
    {props.loading && <LinearProgress />}
  </div>
);

const mapStateToProps = state => {
  return {
    loading: state.loading
  }
}

export default connect(mapStateToProps, undefined)(Main);
