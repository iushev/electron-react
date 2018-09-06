import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

import api from '../../api';
import SignUpForm from '../../modules/auth/components/SignUpForm';
import { authUser } from '../../modules/auth/store/actions';
import { AppContext } from '../../AppContext';

const styles = (/*theme*/) => ({
    container: {
        padding: '5vh',
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'auto',
    },
    content: {
        maxWidth: '600px',
        margin: 'auto',
    },
});

class SignUp extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        authenticated: PropTypes.bool,
        authUser: PropTypes.func,
    }

    state = {
        successfulSubmit: false,
    }

    handleFormSubmit = (data) => {
        return api.players.register(data)
            .then((result) => {
                this.setState({
                    successfulSubmit: true,
                });
                this.props.authUser(result.token, result.user);
                return result;
            });
    }

    render() {
        const { authenticated, classes } = this.props;
        if (authenticated) {
            return (<Redirect to='/'/>);
        }

        const { successfulSubmit } = this.state;
        if (successfulSubmit) {
            return (<Redirect to='/' />);
        }
        return (
            <div className={classes.container}>
                <div className={classes.content}>
                    <Typography
                        variant='display1'
                    >
                        Sign Up
                    </Typography>
                    <SignUpForm
                        onSubmit={this.handleFormSubmit}
                    />
                    <Button
                        variant="raised"
                        color="primary"
                        className={classes.signInButton}
                        type="submit"
                        form='sign-in-form'
                    >
                        Sign In
                    </Button>
                    <p>
                        <AppContext.Consumer>
                            { ({ signInPath }) => (
                                <Button
                                    className={classes.homeButton}
                                    component={Link}
                                    to={signInPath}
                                >
                                    Connect
                                </Button>
                            ) }
                        </AppContext.Consumer>
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authUser: (token, user) => dispatch(authUser(token, user, false)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));