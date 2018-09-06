import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, propTypes } from 'redux-form';

import { withStyles } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';

import withFormSubmit from '../../../../hoc/withFormSubmit';
import FormError from '../../../../components/Form/FormError';
import TextField from '../../../../components/Form/TextField';
import Checkbox from '../../../../components/Form/Checkbox';

const styles = (/*theme*/) => ({
    container: {},
});

class SignInForm extends Component {
    render() {
        const { formId, classes, handleSubmit, error } = this.props;

        return (
            <form
                id={formId}
                method='post'
                className={classes.container}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(this.props.onSubmit)}
            >
                {error && <FormError error={error} />}
                <div>
                    <Field
                        name='username'
                        component={TextField}
                        label="Username"
                        autoFocus
                        margin="normal"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment
                                    position="start"
                                >
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div>
                    <Field
                        name='password'
                        component={TextField}
                        type='password'
                        label="Password"
                        margin="normal"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment
                                    position="start"
                                >
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Field
                        name='rememberMe'
                        component={Checkbox}
                        label="Remember Me"
                    />
                </div>
            </form>
        );
    }
}

SignInForm.propTypes = {
    formId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    ...propTypes,
};

SignInForm.defaultProps = {
    formId: 'sign-in-form',
};

export default reduxForm({
    form: 'sign-in-form',
})(withStyles(styles)(withFormSubmit(SignInForm)));
