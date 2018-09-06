import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    formError: {
        backgroundColor: theme.palette.error.dark,
        padding: theme.spacing.unit,
        borderRadius: '2px',
        boxShadow: theme.shadows[2],

    },
    formErrorItem: {
        color: theme.palette.error.contrastText,
    },
});

class FormError extends Component {
    render() {
        const { classes, error } = this.props;
        return (
            <div className={classes.formError}>
                {error.map((err, index) => (<Typography key={index} className={classes.formErrorItem}>{err}</Typography>))}
            </div>
        );
    }
}

FormError.propTypes = {
    classes: PropTypes.object.isRequired,
    error: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(FormError);
