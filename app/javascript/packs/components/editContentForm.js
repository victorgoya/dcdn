import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import TextField from 'material-ui/TextField';
import { connect, dispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loadContent } from '../actions/contents';

import Preview from "./preview";

const style = {
  downloadButtonContainer: {
    textAlign: "center"
  }
}

const TitleField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error}
    fullWidth={true}
    { ...input }
    { ...custom }
  />
)

const required = value => (value ? undefined : 'This field is required.')

class EditContentForm extends React.Component {
  componentDidMount() {
    this.props.loadContent();
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

    if (!this.props.initialValues) {
      return (<div></div>);
    }

    return (
      <Dialog
        actions={actions}
        modal={true}
        open={!!this.props.initialValues}
      >
        <Preview />
        <div style={style.downloadButtonContainer}>
          <FlatButton
            href={this.props.initialValues.torrent_url}
            label="Download Torrent"
          />
        </div>
        <Field
          component={TitleField}
          name='title'
        />

      </Dialog>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    initialValues: state.currentContent
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadContent: (id) => {
      dispatch(loadContent(props.match.params.id));
    },
    onSubmit: (values) => {
      dispatch(submitContent(values));
      props.history.goBack();
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: "content" })(EditContentForm));
