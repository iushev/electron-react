import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

import MovesGrid from './MovesGrid';
import MovesGridRow from './MovesGridRow';
import MovesGridCell from './MovesGridCell';
import Action from './Action';
import ActionCube from './ActionCube';
import ActionRollDice from './ActionRollDice';
import ActionCheckersMove from './ActionCheckersMove';
import NavigateBack from './NavigateBack';
import NavigateForward from './NavigateForward';
import {
    PLAYER_WHITE,
    // PLAYER_BLACK,
    MOVE_TYPE_DICE_ROLL,
    MOVE_TYPE_CHECKERS_MOVE,
    MOVE_TYPE_CUBE_ACTION,
    MOVE_TYPE_RESIGN,
} from '../../core';
import ActionResign from './ActionResign';

const styles = (theme) => ({
    root: {
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
    },
    navigatorButtons: {
        padding: '2px 3px',
        flex: '0 0 auto',
    },
    movesGrid: {
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        position: 'relative',
        border: '1px solid #f5f5f5',
    },
    header: {
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        fontWeight: 'bold',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #f5f5f5',
    },
    cell: {
        display: 'inline-block',
        width: '50%',
        borderRight: '1px solid #e5e5e5',
    },
    action: {
        display: 'flex',
        flexDirection: 'row',
    },
    dice: {
        flex: '0 0 auto',
        borderRight: '1px solid #e5e5e5',
        padding: '3px',
    },
    move: {
        flex: '1 1 auto',
        padding: '3px',
    },
});

class GameNavigator extends React.Component {
    constructor(props) {
        super(props);

        this.activeGridHeaderRef = React.createRef();
        this.activeGridRowRef = React.createRef();
        this.gridRef = React.createRef();
    }

    componentDidUpdate(){
        if (this.gridRef.current && this.activeGridRowRef.current) {
            let activeGridHeader = this.activeGridHeaderRef.current;
            let activeGridRow = this.activeGridRowRef.current;
            let grid = this.gridRef.current;

            if (activeGridRow.offsetTop < (grid.scrollTop + activeGridHeader.offsetHeight)) {
                grid.scrollTop = activeGridRow.offsetTop - activeGridHeader.offsetHeight;
            } else if ((activeGridRow.offsetTop + activeGridRow.offsetHeight) > (grid.scrollTop + grid.clientHeight)) {
                grid.scrollTop = activeGridRow.offsetTop + activeGridRow.offsetHeight - grid.clientHeight;
            }
        }
    }

    renderActionCube(props) {
        const { currentMoveId } = this.props;
        return (
            <Action
                active={currentMoveId === props.move.id}
                {...props}
            >
                <ActionCube action={props.move.action} />
            </Action>
        );
    }

    renderActionResign(props) {
        const { currentMoveId } = this.props;
        return (
            <Action
                active={currentMoveId === props.move.id}
                {...props}
            >
                <ActionResign action={props.move.action} />
            </Action>
        );
    }

    renderRows() {
        const { moves, currentMoveId, classes } = this.props;
        let moveRows = [];
        const moveIds = Object.keys(moves);

        for (let i = 0; i < moveIds.length; i++) {
            let currentMove = moves[moveIds[i]];
            let activeGridRow = false;

            let whiteMoveCell;
            if (i === 0 && currentMove.player !== PLAYER_WHITE) {
                whiteMoveCell = (
                    <div>&nbsp;</div>
                );
            }
            else {
                activeGridRow = activeGridRow || currentMoveId === currentMove.id;
                switch (currentMove.type) {
                    case MOVE_TYPE_CUBE_ACTION:
                        whiteMoveCell = this.renderActionCube({
                            move: currentMove,
                            className: classes.move,
                        });
                        break;
                    case MOVE_TYPE_RESIGN:
                        whiteMoveCell = this.renderActionResign({
                            move: currentMove,
                            className: classes.move,
                        });
                        break;
                    case MOVE_TYPE_DICE_ROLL: {
                        let actions = [
                            <Action
                                key={currentMove.id}
                                className={classes.dice}
                                move={currentMove}
                                active={currentMoveId === currentMove.id}
                            >
                                <ActionRollDice action={currentMove.action} />
                            </Action>,
                        ];

                        i++;
                        currentMove = moves[moveIds[i]];
                        activeGridRow = activeGridRow || currentMoveId === currentMove.id;
                        switch (currentMove.type) {
                            case MOVE_TYPE_CHECKERS_MOVE:
                                actions.push(
                                    <Action
                                        key={currentMove.id}
                                        className={classes.move}
                                        move={currentMove}
                                        active={currentMoveId === currentMove.id}
                                    >
                                        <ActionCheckersMove action={currentMove.action.map((point) => {
                                            return {
                                                from: point.from,
                                                to: point.to,
                                            };
                                        })} />
                                    </Action>
                                );
                                break;
                            case MOVE_TYPE_RESIGN:
                                actions.push(this.renderActionResign({
                                    key: currentMove.id,
                                    className: classes.move,
                                    move: currentMove,
                                }));
                                break;
                            default:
                                i--;
                                currentMove = moves[moveIds[i]];
                        }

                        whiteMoveCell = (
                            <div className={classes.action}>
                                { actions }
                            </div>
                        );
                        break;
                    }
                    default:
                        break;
                }
                i++;
                currentMove = (i >= moveIds.length) ? null : moves[moveIds[i]];
            }

            let blackMoveCell;
            if (currentMove) {
                activeGridRow = activeGridRow || currentMoveId === currentMove.id;
                switch (currentMove.type) {
                    case MOVE_TYPE_CUBE_ACTION:
                        blackMoveCell = this.renderActionCube({
                            move: currentMove,
                            className: classes.move,
                        });
                        break;
                    case MOVE_TYPE_RESIGN:
                        blackMoveCell = this.renderActionResign({
                            move: currentMove,
                            className: classes.move,
                        });
                        break;
                    case MOVE_TYPE_DICE_ROLL: {
                        let actions = [
                            <Action
                                key={currentMove.id}
                                className={classes.dice}
                                move={currentMove}
                                active={currentMoveId === currentMove.id}
                            >
                                <ActionRollDice action={currentMove.action} />
                            </Action>,
                        ];

                        i++;
                        currentMove = moves[moveIds[i]];
                        activeGridRow = activeGridRow || currentMoveId === currentMove.id;
                        switch (currentMove.type) {
                            case MOVE_TYPE_CHECKERS_MOVE:
                                actions.push(
                                    <Action
                                        key={currentMove.id}
                                        className={classes.move}
                                        move={currentMove}
                                        active={currentMoveId === currentMove.id}
                                    >
                                        <ActionCheckersMove action={currentMove.action.map((point) => {
                                            return {
                                                from: point.from < 25 ? 25 - point.from : point.from,
                                                to: point.to < 25 ? 25 - point.to : point.to,
                                            };
                                        })} />
                                    </Action>
                                );
                                break;
                            case MOVE_TYPE_RESIGN:
                                actions.push(this.renderActionResign({
                                    key: currentMove.id,
                                    className: classes.move,
                                    move: currentMove,
                                }));
                                break;
                            default:
                                i--;
                                currentMove = moves[moveIds[i]];
                        }

                        blackMoveCell = (
                            <div className={classes.action}>
                                { actions }
                            </div>
                        );
                        break;
                    }
                    default:
                        break;
                }
            }
            else {
                blackMoveCell = (
                    <div>&nbsp;</div>
                );
            }

            moveRows.push(
                <MovesGridRow
                    key={i}
                    className={'row'}
                    rowRef={activeGridRow ? this.activeGridRowRef : null}
                >
                    <MovesGridCell className={classes.cell}>
                        <Typography component='div'>
                            { whiteMoveCell }
                        </Typography>
                    </MovesGridCell>
                    <MovesGridCell className={classes.cell}>
                        <Typography component='div'>
                            { blackMoveCell }
                        </Typography>
                    </MovesGridCell>
                </MovesGridRow>
            );
        }
        return moveRows;
    }

    render() {
        const { whiteName, blackName, classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.navigatorButtons}>
                    <NavigateBack />
                    <NavigateForward />
                </div>
                <MovesGrid
                    className={classes.movesGrid}
                    gridRef={this.gridRef}
                >
                    <MovesGridRow
                        className={classes.header}
                        rowRef={this.activeGridHeaderRef}
                    >
                        <MovesGridCell
                            className={classes.cell}
                        >
                            <Typography component='div'>
                                { whiteName ? whiteName : <div>&nbsp;</div> }
                            </Typography>
                        </MovesGridCell>
                        <MovesGridCell
                            className={classes.cell}
                        >
                            <Typography component='div'>
                                { blackName ? blackName : <div>&nbsp;</div> }
                            </Typography>
                        </MovesGridCell>
                    </MovesGridRow>
                    { this.renderRows() }
                </MovesGrid>
            </div>
        );
    }
}

GameNavigator.propTypes = {
    whiteName: PropTypes.string.isRequired,
    blackName: PropTypes.string.isRequired,
    moves: PropTypes.object.isRequired,
    currentMoveId: PropTypes.string,
    ...withStyles.propTypes,
};

const mapStateToProps = (state) => {
    const { currentGameId, currentMoveId, games } = state.match;
    if (currentGameId !== null) {
        const { whiteName, blackName, moves } = games[currentGameId];
        return {
            whiteName,
            blackName,
            moves,
            currentMoveId,
        };
    }
    return {
        whiteName: '',
        blackName: '',
        moves: {},
        currentMoveId,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(GameNavigator));
