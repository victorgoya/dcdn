// From https://github.com/erikras/redux-form/issues/1989
import React from 'react';
import Dropzone from 'react-dropzone'

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
    let {input, meta: {touched, error}} = this.props;
    let {accept, multiple} = this.props;
    let selectedFile = (input && input.value && input.value[0]) || null;
    let dropzoneProps = {
      accept,
      multiple,
      onDrop: this.handleDropOrClick
    };

    return (
      <div>
        <input type='hidden' disabled {...input} />
        {selectedFile? <span>{selectedFile.name}</span> : null}
        <Dropzone {...dropzoneProps} />
      </div>
    );
  }
}

export default FileField;
