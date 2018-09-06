import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Point from '../Point/Point';

class Quarter extends Component {
    constructor(props) {
        super(props);

        const { points } = this.props;
        this.pointRefs = points.reduce((pointRefs) => {
            pointRefs.push(React.createRef());
            return pointRefs;
        }, []);
    }

    updateDimensions = () => {
        this.pointRefs.forEach((pointRef) => {
            pointRef.current.wrappedInstance.updateDimensions();
        });
    }

    render() {
        const { points, side, className } = this.props;
        return (
            <div className={className}>
                { points.map((point, index) => {
                    return (
                        <Point
                            key={point.id}
                            ref={this.pointRefs[index]}
                            id={point.id}
                            position={point.position}
                            backgroundType={point.backgroundType}
                            side={side}
                        />
                    );
                }) }
            </div>
        );
    }
}

Quarter.propTypes = {
    points: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        position: PropTypes.number,
    })),
    side: PropTypes.oneOf(['top', 'bottom']),
    className: PropTypes.string,
};

export default Quarter;