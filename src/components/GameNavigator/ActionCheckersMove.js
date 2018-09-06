import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
    points: {
        display: 'inline-block',
        width: '100%',
    },
    pair: {
        '&:not(:last-child)': {
            paddingRight: '3px',
        },
    },
});

const ActionCheckersMove = ({ action, classes }) => {
    // TODO: Да се дефинират константи за позиции 25 и 26.
    return (
        <span className={classes.points}>{ action ? action.map((point, index) => (
            <span key={index} className={classes.pair}>{
                point.from === 25 ? 'bar' : point.from
            }/{
                point.to === 26 ? 'off' : point.to
            }</span>
        )) : null}</span>
    );
};

ActionCheckersMove.propTypes = {
    action: PropTypes.array.isRequired,
    ...withStyles.propTypes,
};

export default withStyles(styles)(ActionCheckersMove);
