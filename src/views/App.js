import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// const debug = require('debug')('backgammon');

import { withStyles } from '@material-ui/core';

import ToolBox from '../components/ToolBox';
import StatusBar from '../components/StatusBar';
import AutoUpdater from '../components/AutoUpdater';

// import SignIn from './SignIn';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignOut from './SignOut';
import ResetPassword from '../modules/auth/views/ResetPassword';
import Home from './Home';
import Match from './Match';

import Players from '../modules/players/views/Players';
import Profile from '../modules/players/views/Profile';

import { AppContext } from '../AppContext';
import FlashMessage from '../components/FlashMessage/FlashMessage';

// import { ipcRenderer } from 'electron';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const styles = (theme) => ({
    app: {
        backgroundColor: theme.palette.background.default,
    },
    contents: {
        flex: '1 1 auto',
        position: 'relative',
        overflow: 'auto'
    }
});

/**
 * Application component layout
 */
class App extends React.Component {
    constructor(props) {
        super(props);
        ipcRenderer.on('navigate:to', (sender, path) => {
            this.props.history.push(path);
        });

        ipcRenderer.on('match:load', () => {
            this.props.history.push('/match');
        });
    }

    componentDidMount() {
        ipcRenderer.send('auth:authenticated', this.props.authenticated);
    }

    componentDidUpdate(prevProps) {
        if (this.props.authenticated !== prevProps.authenticated) {
            ipcRenderer.send('auth:authenticated', this.props.authenticated);
        }
    }

    /**
     * Rednering component
     */
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <ToolBox />
                <div className={classes.contents}>
                    <AppContext>
                        { ({
                            signInPath,
                            signOutPath,
                            signUpPath,
                            resetPasswordPath,
                            homePath,
                            matchPath,
                            playersPath,
                            profilePath,
                        }) => (
                            <Switch>
                                <Route path={signInPath} exact component={SignIn} />
                                <Route path={signUpPath} exact component={SignUp} />
                                <Route path={signOutPath} exact component={SignOut} />
                                <Route path={resetPasswordPath} exact component={ResetPassword} />
                                <Route path={playersPath} exact component={Players} />
                                <Route path={profilePath} exact component={Profile} />
                                <Route path={matchPath} component={Match} />
                                <Route path={homePath} component={Home} />
                            </Switch>
                        ) }
                    </AppContext>
                </div>
                <StatusBar />
                <AutoUpdater />
                <FlashMessage
                    flashKey='success'
                />
                <FlashMessage
                    flashKey='error'
                />
            </React.Fragment>
        );
    }
}

App.propTypes = {
    ...withRouter.propTypes,
    ...withStyles.propTypes,
};

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.auth.authenticated,
    };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(App)));
