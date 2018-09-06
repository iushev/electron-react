import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

// import { boardActions } from '../../actions';

import './Checker.css';

const Checker = ({id, inlineStyle, board, isHit/*, innerRef*/}) => {
    return (
        <div
            className={classnames('checker', {
                'hit': isHit,
            })}
            style={inlineStyle}
            // ref={innerRef}
            // data-count={6}
        >
            <div className={classnames('image', {
                [board.checkers[id].color]: true,
            })}/>
        </div>
    );
};

Checker.propTypes = {
    id: PropTypes.string.isRequired,
    inlineStyle: PropTypes.object,
    board: PropTypes.object.isRequired,
    isHit: PropTypes.bool.isRequired,
    // innerRef: PropTypes.func,
};

Checker.defaultProps = {
    isHit: false,
};

const mapStateToProps = (state) => {
    const { match } = state;
    return {
        board: match.board,
    };
};

export default connect(mapStateToProps)(Checker);

