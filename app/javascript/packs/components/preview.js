import React from 'react';
import { connect, dispatch } from 'react-redux';
import { createPreview } from "../actions/previews";

const style = {
  root: {
    height: 300,
    maxHeight: 300,
    textAlign: "center"
  }
}

class Preview extends React.Component {
  componentDidMount() {
    this.props.createPreview(this.props.content);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.content != nextProps.content) {
      this.props.createPreview(nextProps.content);
    }
    if (this.props.preview != nextProps.preview) {
      nextProps.preview.appendTo("#preview", {}, (err, elem) => {
        elem.setAttribute("style", `height: ${style.root.height}px;`);
      });
    }
  }

  render() {
    return (
      <div id="preview" style={style.root}>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    preview: state.currentPreview,
    content: state.currentContent
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    createPreview: (content) => {
      dispatch(createPreview(content));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);;
