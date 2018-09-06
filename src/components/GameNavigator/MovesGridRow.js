import React from 'react';
import PropTypes from 'prop-types';

const MovesGridRow = ({ className, children, rowRef }) => {
    return (
        <div
            className={className}
            ref={rowRef}
        >
            { children }
        </div>
    );
};

MovesGridRow.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    rowRef: PropTypes.any,
};

export default MovesGridRow;