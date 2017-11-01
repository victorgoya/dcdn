import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Content = (props) => {
  return (
    <ListItem
      primaryText={props.content.title}
      containerElement={<a href={props.content.torrent_key} download={true} />}
    />
  );
};

function mapStateToProps(state) {
  return ({
    configuration: state.configuration
  });
}

export default connect(mapStateToProps)(Content);
