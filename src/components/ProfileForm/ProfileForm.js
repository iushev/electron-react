import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, propTypes } from 'redux-form';

import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core';

import DatePicker from 'material-ui-pickers/DatePicker';

import withFormSubmit from '../../hoc/withFormSubmit';
import FormError from '../../components/Form/FormError';
import TextField from '../../components/Form/TextField';
import RadioButtonGroupField from '../../components/Form/RadioButtonGroupField';
import CountryItem from '../../components/CountryItem';
import api from '../../api';

const styles = (/*theme*/) => ({
    container: {},
});

class ProfileForm extends Component {
    state = {
        countryList: [],
    }

    componentDidMount() {
        this.getCountries({
            order: ['name'],
        })
            .then((countries) => {
                this.setState({
                    countryList: countries,
                });
            });

    }

    getCountries = (params, data = []) => {
        return api.core.country.list(params)
            .then((response) => {
                if (response.next) {
                    const _url = new URL(response.next);
                    const q = JSON.parse(_url.searchParams.get('q'));
                    return this.getCountries(q, [
                        ...data,
                        ...response.results,
                    ]);
                } else {
                    return [
                        ...data,
                        ...response.results,
                    ];
                }
            });
    }

    render() {
        const { formId, classes, error, handleSubmit/*, submitting, submitFailed*/ } = this.props;
        const { countryList } = this.state;
        return (
            <form
                id={formId}
                method='post'
                className={classes.container}
                noValidate
                autoComplete='off'
                onSubmit={handleSubmit(this.props.onSubmit)}
            >
                {error && <FormError error={error} />}
                <Field
                    name='user.first_name'
                    component={TextField}
                    label='First Name'
                    margin='normal'
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Field
                    name='user.last_name'
                    component={TextField}
                    label='Last Name'
                    margin='normal'
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Field
                    name='gender'
                    component={RadioButtonGroupField}
                    label='Gender'
                    margin='normal'
                    fullWidth
                    row={true}
                >
                    <FormControlLabel value='male' control={<Radio />} label='Male' />
                    <FormControlLabel value='female' control={<Radio />} label='Female' />
                    <FormControlLabel value='' control={<Radio />} label='Other' />
                </Field>
                <Field
                    name='country_id'
                    label='Country'
                    component={({
                        input,
                        label,
                        // meta: { touched, error },
                        margin,
                        fullWidth,
                        ...custom
                    }) => (
                        <FormControl margin={margin} fullWidth={fullWidth}>
                            <InputLabel htmlFor={input.name}>{label}</InputLabel>
                            <Select
                                inputProps={input}
                                {...custom}
                            >
                                { countryList.map((country) => (
                                    <MenuItem
                                        key={country.id}
                                        value={country.id}
                                    >
                                        <CountryItem country={country} />
                                    </MenuItem>
                                )) }
                            </Select>
                        </FormControl>
                    )}
                    margin='normal'
                    fullWidth
                    MenuProps={{
                        // transitionDuration: {
                        //     enter: 100,
                        //     exit: 50,
                        // },
                    }}
                />
                <Field
                    name='birthday'
                    component={({
                        input,
                        label,
                        // meta: { touched, error },
                        margin,
                        fullWidth,
                        ...custom
                    }) => (
                        <DatePicker
                            label={label}
                            fullWidth={fullWidth}
                            margin={margin}
                            inputProps={input}
                            {...custom}
                            format='MMMM Do YYYY'
                            invalidLabel=''
                            value={input.value}
                            onChange={(value) => {
                                return input.onChange(value.format('YYYY-MM-DD'));
                            }}
                        />
                    )}
                    label='Birthday'
                    margin='normal'
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Field
                    name='email'
                    component={TextField}
                    label='Email'
                    margin='normal'
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Field
                    name='playing_notes'
                    component={TextField}
                    label='Playing Notes'
                    multiline
                    rows='4'
                    margin='normal'
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                {/* elo_rating
                exp
                member_to
                status */}
            </form>
        );
    }
}

ProfileForm.propTypes = {
    formId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    ...propTypes,
};

ProfileForm.defaultProps = {
    formId: 'profile-form',
};

export default reduxForm({
    form: 'profile-form',
    enableReinitialize: true,
})(withFormSubmit(withStyles(styles)(ProfileForm)));