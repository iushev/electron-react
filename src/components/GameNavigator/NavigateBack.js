import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { matchActions } from '../../store/actions';
import { MOVE_TYPE_CHECKERS_MOVE } from '../../core';

const NavigateBack = ({ disabled, gameId, moveId, prevMoveId, move, onClick }) => {
    return (
        <Button
            size='small'
            disabled={disabled}
            onClick={() => onClick(gameId, moveId, prevMoveId, move)}
        >
            {'<'}
        </Button>
    );
};

NavigateBack.propTypes = {
    disabled: PropTypes.bool.isRequired,
    gameId: PropTypes.number,
    moveId: PropTypes.string,
    prevMoveId: PropTypes.string,
    move: PropTypes.object,
    onClick: PropTypes.func,
};

const mapStateToProps = (state) => {
    let disabled = true;
    let gameId = null;
    let moveId = null;
    let prevMoveId = null;
    let move = null;

    const { match } = state;
    if (match) {
        const { currentGameId, currentMoveId } = match;
        if (currentGameId !== null) {
            const moveIds = Object.keys(match.games[currentGameId].moves);
            const index = moveIds.indexOf(currentMoveId);
            disabled = index === 0;
            if (!disabled) {
                gameId = currentGameId;
                moveId = moveIds[index];
                prevMoveId = moveIds[index - 1];
                move = match.games[currentGameId].moves[moveIds[index]];
            }
        }
    }

    return {
        disabled: disabled,
        gameId: gameId,
        moveId: moveId,
        prevMoveId: prevMoveId,
        move: move,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (gameId, moveId, prevMoveId, move) => {
            if (move.type === MOVE_TYPE_CHECKERS_MOVE && move.action.length > 0) {
                for (let i = move.action.length -1 ; i >= 0; i--) {
                    dispatch(matchActions.undoMoveAction(gameId, moveId, i, prevMoveId));
                }
            }
            else {
                dispatch(matchActions.undoMoveAction(gameId, moveId, null, prevMoveId));
            }
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigateBack);