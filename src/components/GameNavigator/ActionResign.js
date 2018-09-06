import React from 'react';
import PropTypes from 'prop-types';

const ActionResign = ({ action }) => {
    return (
        <span>{action}</span>
    );
};

ActionResign.propTypes = {
    action: PropTypes.string.isRequired,
};

export default ActionResign;
