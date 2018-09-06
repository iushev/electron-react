import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

import ResetPasswordForm from '../../components/ResetPasswordForm';
import { AppContext } from '../../../../AppContext';
import api from '../../../../api';

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
    resetPasswordButton: {
        marginTop: theme.spacing.unit * 2,
    },
    signInButton: {
        marginTop: theme.spacing.unit * 2,
    },
});

class ResetPassword extends Component {
    handleSubmit = ({ email }) => {
        return api.auth.reset_password(email);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardHeader
                        title='Reset Password'
                        classes={{
                            root: classes.cartHeader,
                            title: classes.cardTitle,
                        }}
                    />
                    <CardContent>
                        <ResetPasswordForm
                            formId='reset-password-form'
                            onSubmit={this.handleSubmit}
                        />
                        <Button
                            variant='raised'
                            color='primary'
                            fullWidth
                            size='large'
                            className={classes.resetPasswordButton}
                            type='submit'
                            form='reset-password-form'
                        >
                            Reset Password
                        </Button>
                    </CardContent>
                </Card>
                <Typography>
                    <AppContext.Consumer>
                        { ({ signInPath }) => (
                            <Button
                                className={classes.signInButton}
                                component={Link}
                                to={signInPath}
                            >
                                Sign In
                            </Button>
                        ) }
                    </AppContext.Consumer>
                </Typography>
            </div>
        );
    }
}

ResetPassword.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResetPassword);