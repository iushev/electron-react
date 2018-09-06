import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MDCheckbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class Checkbox extends Component {
    render() {
        const { input, label } = this.props;
        return (
            <FormControlLabel
                control={
                    <MDCheckbox
                        checked={input.value ? true : false}
                        onChange={(event, checked) => {
                            input.onChange(checked);
                        }}
                    />
                }
                label={label}
            />
        );
    }
}

Checkbox.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
};

export default Checkbox;