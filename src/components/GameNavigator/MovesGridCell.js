import React from 'react';
import PropTypes from 'prop-types';

const MovesGridCell = ({ className, children }) => {
    return (
        <div className={className}>
            { children }
        </div>
    );
};

MovesGridCell.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
};

export default MovesGridCell;