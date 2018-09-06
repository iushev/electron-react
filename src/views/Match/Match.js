import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SplitterLayout from 'react-splitter-layout';

import { withStyles } from '@material-ui/core';

import Board from '../../components/Board/Board';
import PayerPanel from '../../components/PlayerPanel';
import MatchInfo from '../../components/MatchInfo';
import GameSelector from '../../components/GameSelector/GameSelector';
import GameNavigator from '../../components/GameNavigator/GameNavigator';

import { PLAYER_WHITE, PLAYER_BLACK } from '../../core';

const styles = (theme) => ({
    main: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    rightSide: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    gamePane: {
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
    },
    rightSideSeparator: {
        flex: '0 0 auto',
        width: '100%',
        height: '4px',
        backgroundColor: '#ccc',
    },
    rightSideFooter: {
        flex: '0 0 auto',
        height: '30%',
    },
});

class Match extends Component {
    static propTypes = {
        whitePlayer: PropTypes.shape({
            name: PropTypes.string,
            score: PropTypes.number,
        }),
        blackPlayer: PropTypes.shape({
            name: PropTypes.string,
            score: PropTypes.number,
        }),
        ...withStyles.propTypes,
    }

    constructor(props) {
        super(props);

        this.boardRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateBoardDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateBoardDimensions);
    }

    onSecondaryPaneSizeChange = (/*secondaryPaneSize*/) => {
        this.updateBoardDimensions();
    }

    updateBoardDimensions = () => {
        const board = this.boardRef.current;
        if (board) {
            board.updateDimensions();
        }
    }

    render() {
        const { whitePlayer, blackPlayer, playerOnMove, classes } = this.props;
        return (
            <SplitterLayout
                percentage
                primaryMinSize={25}
                secondaryMinSize={5}
                secondaryInitialSize={25}
                onSecondaryPaneSizeChange={this.onSecondaryPaneSizeChange}
            >
                <div
                    className={classes.main}
                >
                    <PayerPanel player="white" {...whitePlayer} />
                    <Board
                        ref={this.boardRef}
                        pointLabelDirection={playerOnMove === PLAYER_WHITE ? 'back-clockwise' : 'clockwise'}
                    />
                    <PayerPanel player="black" {...blackPlayer} />
                </div>
                {/* <SplitterLayout vertical percentage primaryMinSize={5} secondaryMinSize={5}> */}
                <div className={classes.rightSide}>
                    <MatchInfo />
                    <div className={classes.gamePane}>
                        <GameSelector className={'gameSelector'} />
                        <GameNavigator className={'gameNavigator'} />
                    </div>
                    <div className={classes.rightSideSeparator}></div>
                    <div className={classes.rightSideFooter} />
                </div>
                {/* </SplitterLayout> */}
            </SplitterLayout>
        );
    }
}

const mapStateToProps = (state) => {
    const { currentGameId, currentMoveId, games, board } = state.match;
    const whitePlayer = {
        name: '',
        score: 0,
        pips: 146,
    };
    const blackPlayer = {
        name: '',
        score: 0,
        pips: 146,
    };

    const addPoints = (point, pointNum) => {
        point.forEach((checkerId) => {
            const checker = checkerId.split('_');
            const player = checker[1];
            switch (player) {
                case PLAYER_WHITE:
                    whitePips += pointNum;
                    break;
                case PLAYER_BLACK:
                    if (pointNum === 25) {
                        blackPips += pointNum;
                    } else {
                        blackPips += (25 - pointNum);
                    }
                    break;
                default:
                    break;
            }
        });
    };

    let whitePips = 0;
    let blackPips = 0;
    Object.keys(board.points).forEach((pointId) => {
        if (pointId === 'point_26') {
            return;
        }
        const pointNum = +(pointId.split('_')[1]);
        if (pointId === 'point_25') {
            addPoints(board.points[pointId].white, pointNum);
            addPoints(board.points[pointId].black, pointNum);
        } else {
            addPoints(board.points[pointId], pointNum);
        }
    });

    if (currentGameId != null) {
        whitePlayer.name = games[currentGameId].whiteName;
        whitePlayer.score = games[currentGameId].whiteScore;
        whitePlayer.pips = whitePips;

        blackPlayer.name = games[currentGameId].blackName;
        blackPlayer.score = games[currentGameId].blackScore;
        blackPlayer.pips = blackPips;
    }

    let playerOnMove = null;
    if (currentMoveId != null) {
        playerOnMove = games[currentGameId].moves[currentMoveId].player;
    }

    return {
        playerOnMove,
        whitePlayer,
        blackPlayer,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Match));
