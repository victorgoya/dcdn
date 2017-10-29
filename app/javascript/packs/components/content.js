import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';

const Content = (props) => {
  return (
    <ListItem
      primaryText={props.content.title}
    />
  );
};

export default Content;
