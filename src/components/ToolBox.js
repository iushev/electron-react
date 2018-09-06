import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

import { AppContext } from '../AppContext';

const styles = (theme) => ({
    header: {
        flex: '0 0 auto',
        padding: '0 20px',
        borderBottom: '1px solid #e5e5e5',
    }
});

const ToolBox = ({ authenticated, user, classes }) => {
    return (
        <AppContext>
            { ({ signInPath, signOutPath, playersPath, matchPath }) => (
                <header className={classes.header}>
                    <Button
                        component={Link}
                        to={matchPath}
                    >
                        Board
                    </Button>
                    { authenticated ? (
                        <Button
                            component={Link}
                            to={playersPath}
                        >
                            Players
                        </Button>
                    ) : null }
                    { !authenticated ? (
                        <Button
                            component={Link}
                            to={signInPath}
                        >
                            Connect
                        </Button>
                    ) : null }
                    { authenticated ? (
                        <Button
                            component={Link}
                            to={signOutPath}
                        >
                            Disconnect:&nbsp;<em>{user.username}</em>
                        </Button>
                    ) : null }
                </header>
            )}
        </AppContext>
    );
};

ToolBox.propTypes = {
    authenticated: PropTypes.bool,
    user: PropTypes.object,
    ...withStyles.propTypes,
};

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.auth.authenticated,
        user: state.auth.auth.user,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(ToolBox));
