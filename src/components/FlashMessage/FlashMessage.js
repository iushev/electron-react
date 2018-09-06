import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

import { removeFlash } from './store/actions';

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
    success: {
        backgroundColor: green[600],
    },
    warning: {
        backgroundColor: amber[700],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
});

class FlashMessage extends Component {
    state = {
        open: true,
    };

    static getDerivedStateFromProps(props) {
        return {
            open: !!props.message,
        };
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.removeFlash(this.props.flashKey);
    };

    render() {
        const { message, classes, flashKey } = this.props;
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
            >
                <SnackbarContent
                    className={classes[flashKey]}
                    aria-describedby='message-id'
                    message={<span id="message-id">{message}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </Snackbar>
        );
    }
}

FlashMessage.propTypes = {
    flashKey: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
    removeFlash: PropTypes.func,
    ...withStyles.propTypes,
};

const mapStateToProps = (state, ownProps) => {
    return {
        message: state.flashMessages[ownProps.flashKey],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeFlash: (key) => dispatch(removeFlash(key)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FlashMessage));
