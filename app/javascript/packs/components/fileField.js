// From https://github.com/erikras/redux-form/issues/1989
import React from 'react';
import Dropzone from 'react-dropzone'
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';
import CircularProgress from 'material-ui/CircularProgress';

const style = {
  dropzone: {
    width: "100%",
    height: 128,
    paddingTop: 64,
    background: "#ECEFF1",
    borderRadius: 2,
    textAlign: "center",
  },

  label: {
    fontSize: 16,
    color: "#333"
  },

  icon: {
    marginTop: 14,
    width: 48,
    height: 48,
    color: "#424242"
  }
}

class FileField extends React.Component {

  handleDropOrClick = (acceptedFiles, rejectedFiles, e) => {
    let eventOrValue = e;
    let {input: {onChange, onBlur}} = this.props;
    if (e.type === 'drop') {
      if (acceptedFiles.length) {
        // FileList or [File]
        eventOrValue = (e.dataTransfer && e.dataTransfer.files) || acceptedFiles;
      } else {
        eventOrValue = null;
      }
    }
    onBlur(eventOrValue);
    onChange(eventOrValue);
  }

  render() {
    let { input, meta: { touched, error, s3Upload, torrentCreation }} = this.props;
    let {accept, multiple} = this.props;
    let selectedFile = (input && input.value && input.value[0]) || null;
    let dropzoneProps = {
      accept,
      multiple,
      onDrop: this.handleDropOrClick
    };

    if (s3Upload == "started" || torrentCreation == "started") {
      return (
        <div style={style.dropzone}>
          <CircularProgress size={64} thickness={5} />
        </div>
      );
    } else if (s3Upload == "done" && torrentCreation == "done") {
      return (
        <div></div>
      );
    } else {
      return (
        <div>
          <input type='hidden' disabled {...input} />
          <Dropzone style={style.dropzone} {...dropzoneProps}>
            <div style={style.label}>
              <strong>Choose a file </strong>
              or drag it here.
            </div>
            <FileUploadIcon style={style.icon} />
          </Dropzone>
        </div>
      );
    }
  }
}

export default FileField;
