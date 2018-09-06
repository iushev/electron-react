import React, { Component } from 'react';
import PropTypes from 'prop-types';


import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class RadioButtonGroupField extends Component {
    render() {
        const {
            input,
            label,
            // meta: { touched, error },
            margin,
            fullWidth,
            ...custom
        } = this.props;

        return (
            <FormControl margin={margin} fullWidth={fullWidth}>
                <FormLabel>{label}</FormLabel>
                <RadioGroup
                    {...input}
                    {...custom}
                    value={input.value}
                    onChange={(event, value) => input.onChange(value)}
                />
            </FormControl>
        );
    }
}

RadioButtonGroupField.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.array,
    }),
    margin: PropTypes.string,
    fullWidth: PropTypes.bool,
};

RadioButtonGroupField.defaultProps = {
    margin: 'none',
};

export default RadioButtonGroupField;