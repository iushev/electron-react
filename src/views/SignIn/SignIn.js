import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

// imports from app
import { AppContext } from '../../AppContext';

// imports from module
import SignInForm from '../../modules/auth/components/SignInForm';
import { signInPlayer } from '../../store/actions/players';

const styles = theme => ({
    container: {
        margin: '0 auto',
        paddingTop: '4rem',
        maxWidth: '30rem',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
    },
    cartHeader: {
        backgroundColor: theme.palette.primary.main,
    },
    cardTitle: {
        color: theme.palette.primary.contrastText,
    },
    signInButton: {
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
    },
    homeButton: {
        marginTop: theme.spacing.unit * 2,
    },
    resetPasswordButton: {
        marginTop: theme.spacing.unit * 2,
    },
    signUpButton: {
        marginTop: theme.spacing.unit * 2,
    },
});

class SignIn extends Component {
    handleSubmit = ({ username, password, rememberMe }) => {
        return this.props.signInPlayer(username, password, rememberMe);
    }

    render() {
        const { authenticated, classes } = this.props;

        if (authenticated) {
            return (
                <AppContext>
                    { ({ homePath }) => <Redirect to={homePath}/>}
                </AppContext>
            );
        }

        return (
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardHeader
                        title='Sign In'
                        classes={{
                            root: classes.cartHeader,
                            title: classes.cardTitle,
                        }}
                    />
                    <CardContent>
                        <SignInForm
                            formId='sign-in-form'
                            onSubmit={this.handleSubmit}
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
                        <AppContext.Consumer>
                            { ({ homePath }) => (
                                <Button
                                    className={classes.homeButton}
                                    component={Link}
                                    to={homePath}
                                >
                                    Cancel
                                </Button>
                            ) }
                        </AppContext.Consumer>
                    </CardContent>
                </Card>
                <Typography>
                    <AppContext.Consumer>
                        { ({ resetPasswordPath, signUpPath }) => (
                            <React.Fragment>
                                <Button
                                    className={classes.resetPasswordButton}
                                    component={Link}
                                    to={resetPasswordPath}
                                >
                                    Reset Password
                                </Button>
                                <Button
                                    className={classes.signUpButton}
                                    component={Link}
                                    to={signUpPath}
                                >
                                    Register
                                </Button>
                            </React.Fragment>
                        ) }
                    </AppContext.Consumer>
                </Typography>
            </div>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    signInPlayer: PropTypes.func,
};

const matStateToProps = (state) => {
    return {
        authenticated: state.auth.auth.authenticated,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signInPlayer: (username, password, rememberMe) => dispatch(signInPlayer(username, password, rememberMe)),
    };
};

export default connect(matStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));