import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from "./appbar";
import LinearProgress from 'material-ui/LinearProgress';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router'
import ContentForm from './contentForm';
import EditContentForm from './editContentForm';
import ContentList from './contentList';
import LoginModal from './loginModal';

const Main = (props) => (
  <div>
    <AppBar />
    {props.loading && <LinearProgress />}

    <Switch>
      <Route exact path="/" component={ContentList} />
      <Route path="/contents/new" component={ContentForm} />
      <Route path="/contents/:id" component={EditContentForm} />
    </Switch>

    <LoginModal />
  </div>
);

const mapStateToProps = state => {
  return {
    loading: state.loading,
  }
}

export default withRouter(connect(mapStateToProps, undefined)(Main));
