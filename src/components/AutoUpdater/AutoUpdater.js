import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LinearProgress from '@material-ui/core/LinearProgress';

// import { ipcRenderer } from 'electron';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class AutoUpdater extends React.Component {
    state = {
        percentDownloaded: 0,
        installing: false,
    };

    handleInstall = () => {
        this.setState({
            installing: true,
        }, () => {
            ipcRenderer.send('install-update');
        });
    }

    renderWaitMessage = () => {
        const { percent } = this.props.downloadProgress;
        return (
            <div>
                <p>Please wait.</p>
                <p>Downloading new version ...</p>
                <LinearProgress variant="determinate" value={percent ? Math.round(percent) : 0}/>
            </div>
        );
    }

    renderUpdateMessage = () => {
        const { installing } = this.state;
        return (
            <div>
                { installing ?
                    <React.Fragment>
                        <p>Please wait.</p>
                        <p>Starting installation.</p>
                    </React.Fragment> :
                    <React.Fragment>
                        <p>New version is downloaded and ready for install.</p>
                        <button className="btn btn-primary" onClick={this.handleInstall}>Install</button>
                    </React.Fragment>
                }
            </div>
        );
    }

    render() {
        const { checkingForUpdate, updateNotAvailable, updateAvailable, updateDownloaded } = this.props;

        if (checkingForUpdate) {
            return (
                <div className="update-available">
                    <div>
                        <h2>Checking for update ...</h2>
                    </div>
                </div>
            );
        }

        if (updateNotAvailable) {
            return (
                <div className="update-available">
                    <div>
                        <h2>Done</h2>
                    </div>
                </div>
            );
        }


        if (updateAvailable) {
            return (
                <div className="update-available">
                    <div>
                        <h2>New version</h2>
                        { this.renderWaitMessage() }
                    </div>
                </div>
            );
        }

        if (updateDownloaded) {
            return (
                <div className="update-available">
                    <div>
                        <h2>New version</h2>
                        { this.renderUpdateMessage() }
                    </div>
                </div>
            );
        }

        return null;
    }
}

AutoUpdater.propTypes = {
    checkingForUpdate: PropTypes.bool.isRequired,
    updateNotAvailable: PropTypes.bool.isRequired,
    updateAvailable: PropTypes.bool.isRequired,
    downloadProgress: PropTypes.object.isRequired,
    updateDownloaded: PropTypes.bool.isRequired,
    error: PropTypes.any,
};

const mapStateToProps = (state) => {
    return {
        ...state.autoUpdater,
    };
};

export default connect(mapStateToProps)(AutoUpdater);
