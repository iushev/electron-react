import React from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext();

class AppProvider extends React.Component {
    static propTypes = {
        children: PropTypes.any,
    }

    state = {
        signInPath: '/sign-in',
        signOutPath: '/sign-out',
        signUpPath: '/sign-up',
        resetPasswordPath: '/reset-password',
        homePath: '/',
        matchPath: '/match',
        playersPath: '/players',
        profilePath: '/profile',
    };

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export default AppProvider;
