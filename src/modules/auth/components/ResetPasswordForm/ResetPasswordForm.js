import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, propTypes } from 'redux-form';

import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';

import withFormSubmit from '../../../../hoc/withFormSubmit';
import FormError from '../../../../components/Form/FormError';
import TextField from '../../../../components/Form/TextField';

const styles = (/*theme*/) => ({
    container: {},
});

class ResetPasswordForm extends Component {
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
                {error && <FormError error={error}/>}
                <div>
                    <Field
                        name='email'
                        component={TextField}
                        label="Email"
                        autoFocus
                        margin="normal"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment
                                    position="start"
                                >
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
            </form>
        );
    }
}

ResetPasswordForm.propTypes = {
    formId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    ...propTypes,
};

ResetPasswordForm.defaultProps = {
    formId: 'reset-password-form',
};

export default reduxForm({
    form: 'reset-password-form',
})(withStyles(styles)(withFormSubmit(ResetPasswordForm)));
