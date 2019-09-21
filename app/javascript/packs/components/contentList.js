import React from 'react';
import MaterialAppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { List } from 'material-ui/List';
import { connect } from 'react-redux';
import { loadContents } from '../actions/contents';
import Content from "./content";

class ContentList extends React.Component {
  componentDidMount() {
    this.props.loadContents();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentToken != nextProps.currentToken) {
      this.props.loadContents();
    }
  }

  render() {
    return (
      <List>
        {this.props.contents.map((content) => <Content {...this.props} key={content.info_hash} content={content} />)}
      </List>
    );
  }
}

function mapStateToProps(state) {
  return ({
    contents: state.contents || [],
    currentToken: state.currentToken
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadContents: (options) => {
      dispatch(loadContents(options));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContentList);
