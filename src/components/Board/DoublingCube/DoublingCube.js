import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './DoublingCube.css';

const DoublingCube = ({ value }) => (
    <div className={'DoublingCube'}>
        {/* <div className={`doublingCube doublingCube-${value}`} /> */}
        <div className={`${'image'} ${`doublingCube-${value}`}`} />
    </div>
);

DoublingCube.propTypes = {
    value: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
    return {
        value: state.match.board.doublingCube.value,
    };
};

export default connect(mapStateToProps)(DoublingCube);
