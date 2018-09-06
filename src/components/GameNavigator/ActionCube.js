import React from 'react';
import PropTypes from 'prop-types';

const ActionCube = ({ action }) => {
    return (
        <span>{action}</span>
    );
};

ActionCube.propTypes = {
    action: PropTypes.string.isRequired,
};

export default ActionCube;
