import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { matchActions } from '../../store/actions';
import { MOVE_TYPE_CHECKERS_MOVE } from '../../core';

const NaviButtonForward = ({ disabled, gameId, nextMoveId, nextMove, onClick }) =>  {
    return (
        <Button
            size='small'
            disabled={disabled}
            onClick={() => onClick(gameId, nextMoveId, nextMove)}
        >
            {'>'}
        </Button>
    );
};

NaviButtonForward.propTypes = {
    disabled: PropTypes.bool.isRequired,
    gameId: PropTypes.number,
    nextMoveId: PropTypes.string,
    nextMove: PropTypes.object,
    onClick: PropTypes.func,
};


const mapStateToProps = (state) => {
    let disabled = true;
    let gameId = null;
    let nextMoveId = null;
    let nextMove = null;

    const { match } = state;
    if (match) {
        const { currentGameId, currentMoveId } = match;
        if (currentGameId !== null) {
            const moveIds = Object.keys(match.games[currentGameId].moves);
            const index = moveIds.indexOf(currentMoveId);
            disabled = index === moveIds.length - 1;
            if (!disabled) {
                gameId = currentGameId;
                nextMoveId = moveIds[index + 1];
                nextMove = match.games[currentGameId].moves[moveIds[index + 1]];
            }
        }
    }

    return {
        disabled: disabled,
        gameId: gameId,
        nextMoveId: nextMoveId,
        nextMove: nextMove,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (gameId, nextMoveId, nextMove) => {
            if (nextMove.type === MOVE_TYPE_CHECKERS_MOVE && nextMove.action.length > 0) {
                for (let i = 0; i < nextMove.action.length; i++) {
                    dispatch(matchActions.doMoveAction(gameId, nextMoveId, i));
                }
            }
            else {
                dispatch(matchActions.doMoveAction(gameId, nextMoveId, null));
            }
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NaviButtonForward);
