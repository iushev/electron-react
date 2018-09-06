import React from 'react';
import PropTypes from 'prop-types';

const ActionRollDice = ({ action }) => {
    return (
        <span>{action}</span>
    );
};

ActionRollDice.propTypes = {
    action: PropTypes.array.isRequired,
};

export default ActionRollDice;
