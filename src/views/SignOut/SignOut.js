import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core';

// imports from app
import { AppContext } from '../../AppContext';
import SnackbarContent from '../../components/SnackbarContent';

// imports from module
import { signOutPlayer } from '../../store/actions/players';

const styles = (/*theme*/) => ({
    container: {
        width: '100%',
        height: '100%',
    },
    wrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    progress: {
        display: 'block',
        margin: '0 auto',
    },
});

class SignOut extends Component {
    state = {
        error: null,
        errorOpen: false,
    }

    componentDidMount() {
        if (this.props.authenticated) {
            this.props.signOutPlayer()
                .catch((error) => {
                    this.setState({
                        error: error.message,
                        errorOpen: true,
                    });
                });
        }
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ errorOpen: false });
    };

    render() {
        const { classes, authenticated } = this.props;
        const { error, errorOpen } = this.state;

        if (!authenticated) {
            return (
                <AppContext>
                    { ({ homePath }) => <Redirect to={homePath}/>}
                </AppContext>
            );
        }

        return (
            <div className={classes.container}>
                {!!error ? (
                    <React.Fragment>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={errorOpen}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                        >
                            <SnackbarContent
                                onClose={this.handleClose}
                                variant="error"
                                message={error}
                            />
                        </Snackbar>
                        <div className={classes.wrapper}>
                            <Typography>{error}</Typography>
                        </div>
                    </React.Fragment>
                ) : (
                    <div className={classes.wrapper}>
                        <CircularProgress className={classes.progress} size={50} />
                        <Typography>Signing Out</Typography>
                    </div>
                )}
            </div>
        );
    }
}

SignOut.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    signOutPlayer: PropTypes.func.isRequired,
    classes: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.auth.authenticated,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOutPlayer: () => dispatch(signOutPlayer()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(SignOut));