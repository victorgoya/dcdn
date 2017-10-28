import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import TextField from 'material-ui/TextField';
import FileField from './fileField';
import { connect, dispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { closeContentForm, generateTorrent, uploadToS3 } from '../actions/contentForm'

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

const TorrentField = ({ input, label, meta: { touched, error }, ...custom }) => (
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
    this.props.uploadToS3(e.target.files);

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
        <Field
          component={FileField}
          name='upload'
          multiple={false}
          onChange={(e) => this.handleFileChange(e)}
        />

        <Field name="title" component={TitleField} type="text" label="Title" />
        <Field name="description" component={DescriptionField} type="text" label="Description" />

        <Field name="torrent" component='input' type="hidden" />
        <Field name="s3_key" component='input' type="hidden" />

      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.contentForm.open
    // processingStarted: (state.torrent.state == "started" || state.s3.state == "started"),
    // processingFinished: (state.torrent.state == "created" || state.s3.state == "uploaded")
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClose: id => {
      dispatch(closeContentForm())
    },
    generateTorrent: files => {
      dispatch(generateTorrent("content", "torrent", files))
    },
    uploadToS3: files => {
      dispatch(uploadToS3("content", "s3_key", files))
    }
  }
}

export default reduxForm({ form: "content" })(connect(mapStateToProps, mapDispatchToProps)(VideoDialog));
