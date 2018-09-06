import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MDTextField from '@material-ui/core/TextField';

class TextField extends Component {
    render() {
        const {
            input,
            label,
            meta: { touched, error },
            ...custom
        } = this.props;

        return (
            <MDTextField
                label={label}
                error={!!(touched && error)}
                helperText={touched && error && error.join('<br />')}
                {...input}
                {...custom}
            />
        );
    }
}

TextField.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.array,
    }),
};

export default TextField;