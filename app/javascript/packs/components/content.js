import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Content = (props) => {
  const torrentLink = `${props.configuration.endpoint}/contents/${props.content.id}.torrent`;

  return (
    <ListItem
      primaryText={props.content.title}
      containerElement={<a href={torrentLink} />}
    />
  );
};

function mapStateToProps(state) {
  return ({
    configuration: state.configuration
  });
}

export default connect(mapStateToProps)(Content);
