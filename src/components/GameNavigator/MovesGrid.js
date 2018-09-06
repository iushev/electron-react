import React from 'react';
import PropTypes from 'prop-types';

const MovesGrid = ({ className, children, gridRef }) => {
    return (
        <div 
            className={className}
            ref={gridRef}
        >
            { children }
        </div>
    );
};

MovesGrid.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    gridRef: PropTypes.any,
};

export default MovesGrid;
