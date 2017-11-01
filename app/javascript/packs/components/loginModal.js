import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import TextField from 'material-ui/TextField';
import { connect, dispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createToken } from '../actions/token';

const EmailField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error}
    fullWidth={true}
    { ...input }
    { ...custom }
  />
)

const PasswordField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error}
    fullWidth={true}
    { ...input }
    { ...custom }
  />
)

const required = value => (value ? undefined : 'This field is required.')

class ContentForm extends React.Component {
  render() {
    const actions = [
      <RaisedButton
        label="Submit"
        primary={true}
        disabled={!this.props.valid}
        onClick={this.props.handleSubmit}
      />,
    ];
    return (
      <Dialog
        title="Please sign-in to continue"
        actions={actions}
        modal={true}
        open={this.props.open}
      >
        <Field name="email" component={EmailField} type="email" label="Email" validate={[required]} />
        <Field name="password" component={PasswordField} type="password" label="Password" validate={[required]} />
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: !state.currentToken
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: (values) => {
      dispatch(createToken(values));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: "content" })(ContentForm));
