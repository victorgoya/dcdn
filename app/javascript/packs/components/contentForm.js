import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import TextField from 'material-ui/TextField';
import FileField from './fileField';
import { connect, dispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { generateTorrent, uploadToS3, submitContent } from '../actions/contents';

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

const required = value => (value ? undefined : 'This field is required.')

class ContentForm extends React.Component {
  handleFileChange(e) {
    this.props.generateTorrent(e.target.files);
    this.props.uploadToS3(e.target.files);

    this.props.change("title", e.target.files[0].name);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.history.goBack}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        disabled={!this.props.valid}
        onClick={this.props.handleSubmit}
      />,
    ];
    return (
      <Dialog
        actions={actions}
        modal={true}
        open={true}
      >
        <Field
          component={FileField}
          name='upload'
          multiple={false}
          onChange={(e) => this.handleFileChange(e)}
        />

        <Field name="title" component='input' type="hidden" validate={[required]} />
        <Field name="torrent_key" component='input' type="hidden" validate={[required]} />
        <Field name="info_hash" component='input' type="hidden" validate={[required]} />
        <Field name="key" component='input' type="hidden" validate={[required]} />

      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    generateTorrent: files => {
      dispatch(generateTorrent("content", files));
    },
    uploadToS3: files => {
      dispatch(uploadToS3("content", files));
    },
    onSubmit: (values) => {
      dispatch(submitContent(values));
      props.history.goBack();
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: "content" })(ContentForm));
