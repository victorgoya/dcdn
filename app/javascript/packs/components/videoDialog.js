import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';

import TextField from 'material-ui/TextField';
import FileField from './fileField';
import { connect, dispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { closeVideoDialog } from '../actions/videoDialog'
import { generateTorrent } from '../actions/video'

const TitleField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error}
    fullWidth={true}
    { ...input }
    { ...custom }
  />
)

const DescriptionField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error}
    fullWidth={true}
    multiLine={true}
    rows={3}
    rowsMax={6}
    { ...input }
    { ...custom }
  />
)

class VideoDialog extends React.Component {
  handleFileChange(e) {
    this.props.generateTorrent(e.target.files);
    this.props.change("video", "file", e);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.onClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={false}
        onClick={this.props.handleSubmit}
      />,
    ];
    return (
      <Dialog
        title="Add content"
        actions={actions}
        modal={true}
        {...this.props}
      >
        <Field name="title" component={TitleField} type="text" label="Title" />
        <Field name="description" component={DescriptionField} type="text" label="Description" />

        <Field name="file" component='input' type="hidden" />

        <Field
          component={FileField}
          name='file'
          accept='video/*'
          multiple={false}
          onChange={(e) => this.handleFileChange(e)}
        />

      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.videoDialog.open
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClose: id => {
      dispatch(closeVideoDialog())
    },
    generateTorrent: files => {
      dispatch(generateTorrent(files))
    }
  }
}

export default reduxForm({ form: "video" })(connect(mapStateToProps, mapDispatchToProps)(VideoDialog));
