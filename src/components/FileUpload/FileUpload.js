import React from 'react';
import PropTypes from 'prop-types';
const debug = require('debug')('backgammon');

class FileUpload extends React.Component {
    state = {
        files: [],
        uploading: false,
        progress: 0,
        error: null,
        aborted: false,
        complete: false,
    }

    addFiles(files) {
        if (files.length === 0) {
            return;
        }
        this.setState({
            files,
        });

        if (this.props.uploadOnSelection) {
            this.upload(files);
        }
    }

    upload(files) {
        let data = new FormData();
        const file = files[0];
        data.append('file', file);
        let config = {
            onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                debug(`Upload progress: ${progress}`);
                this.setState({
                    progress,
                });
            },
        };

        this.setState({
            uploading: true,
            progress: 0,
            error: null,
            aborted: false,
            complete: false,
        });

        this.props.onUpload(data, config)
            .then((data) => {
                this.setState({
                    uploading: false,
                    progress: 0,
                    error: null,
                    aborted: false,
                    complete: true,
                });

                if (this.props.onComplete) {
                    this.props.onComplete(data);
                }
            })
            .catch((err) => {
                this.setState({
                    uploading: false,
                    progress: 0,
                    error: err,
                    aborted: false,
                    complete: true,
                });
            });
    }

    render() {
        const { children } = this.props;
        return children({
            ...this.state,
            addFiles: files => this.addFiles(files),
        });
    }
}

FileUpload.propTypes = {
    children: PropTypes.func,
    uploadOnSelection: PropTypes.bool,
    onComplete: PropTypes.func,
    onUpload: PropTypes.func.isRequired,
};


FileUpload.defaultProps = {
    uploadOnSelection: true,
};

export default FileUpload;
