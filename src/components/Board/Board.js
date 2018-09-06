import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import LeftBar from './LeftBar/LeftBar';
import MiddleBar from './MiddleBar/MiddleBar';
import RightBar from './RightBar/RightBar';

import {
    PLAYER_WHITE,
    PLAYER_BLACK,
} from '../../core';
import Quarter from './Quarter';
import Dices from './Dices/Dices';

import './Board.css';

/**
 * Backgammon board component
 */
class Board extends React.Component {
    constructor(props) {
        super(props);

        this.quarterLeftTopRef = React.createRef();
        this.quarterLeftBottomRef = React.createRef();
        this.quarterRightTopRef = React.createRef();
        this.quarterRightBottomRef = React.createRef();

        this.middleBarRef = React.createRef();
        this.rightBarRef = React.createRef();
    }

    updateDimensions = () => {
        this.quarterLeftTopRef.current.updateDimensions();
        this.quarterLeftBottomRef.current.updateDimensions();
        this.quarterRightTopRef.current.updateDimensions();
        this.quarterRightBottomRef.current.updateDimensions();

        this.middleBarRef.current.updateDimensions();
        this.rightBarRef.current.updateDimensions();
    }

    render() {
        const { pointLabelDirection } = this.props;
        const p = pointLabelDirection === 'clockwise' ? 0 : 1;
        return (
            <div
                className={'board'}
            >
                <div className={'frameTop'} />
                <div className={'boardInner'}>
                    <LeftBar />
                    <div className={'pane'}>
                        <Quarter
                            className={classnames(
                                'quarter',
                                'quarterTop'
                            )}
                            ref={this.quarterLeftTopRef}
                            points={[
                                {id: 'point_12', backgroundType: 'dark', position: Math.abs(25 * p - 13)},
                                {id: 'point_11', backgroundType: 'light', position: Math.abs(25 * p - 14)},
                                {id: 'point_10', backgroundType: 'dark', position: Math.abs(25 * p - 15)},
                                {id: 'point_9',  backgroundType: 'light', position: Math.abs(25 * p - 16)},
                                {id: 'point_8',  backgroundType: 'dark', position: Math.abs(25 * p - 17)},
                                {id: 'point_7',  backgroundType: 'light', position: Math.abs(25 * p - 18)},
                            ]}
                            side='top'
                        />
                        <Quarter
                            className={classnames(
                                'quarter',
                                'quarterBottom'
                            )}
                            ref={this.quarterLeftBottomRef}
                            points={[
                                {id: 'point_13', backgroundType: 'light', position: Math.abs(25 * p - 12)},
                                {id: 'point_14', backgroundType: 'dark', position: Math.abs(25 * p - 11)},
                                {id: 'point_15', backgroundType: 'light', position: Math.abs(25 * p - 10)},
                                {id: 'point_16', backgroundType: 'dark', position: Math.abs(25 * p - 9)},
                                {id: 'point_17', backgroundType: 'light', position: Math.abs(25 * p - 8)},
                                {id: 'point_18', backgroundType: 'dark', position: Math.abs(25 * p - 7)},
                            ]}
                            side='bottom'
                        />

                        <div className={'dicePosition'}>
                            <Dices player={PLAYER_WHITE} />
                        </div>
                    </div>
                    <MiddleBar
                        ref={this.middleBarRef}
                    />
                    <div className={'pane'}>
                        <Quarter
                            className={classnames(
                                'quarter',
                                'quarterTop'
                            )}
                            ref={this.quarterRightTopRef}
                            points={[
                                {id: 'point_6', backgroundType: 'dark', position: Math.abs(25 * p - 19)},
                                {id: 'point_5', backgroundType: 'light', position: Math.abs(25 * p - 20)},
                                {id: 'point_4', backgroundType: 'dark', position: Math.abs(25 * p - 21)},
                                {id: 'point_3', backgroundType: 'light', position: Math.abs(25 * p - 22)},
                                {id: 'point_2', backgroundType: 'dark', position: Math.abs(25 * p - 23)},
                                {id: 'point_1', backgroundType: 'light', position: Math.abs(25 * p - 24)},
                            ]}
                            side='top'
                        />
                        <Quarter
                            className={classnames(
                                'quarter',
                                'quarterBottom'
                            )}
                            ref={this.quarterRightBottomRef}
                            points={[
                                {id: 'point_19', backgroundType: 'light', position: Math.abs(25 * p - 6)},
                                {id: 'point_20', backgroundType: 'dark', position: Math.abs(25 * p - 5)},
                                {id: 'point_21', backgroundType: 'light', position: Math.abs(25 * p - 4)},
                                {id: 'point_22', backgroundType: 'dark', position: Math.abs(25 * p - 3)},
                                {id: 'point_23', backgroundType: 'light', position: Math.abs(25 * p - 2)},
                                {id: 'point_24', backgroundType: 'dark', position: Math.abs(25 * p - 1)},
                            ]}
                            side='bottom'
                        />
                        <div className={'dicePosition'}>
                            <Dices player={PLAYER_BLACK} />
                        </div>
                    </div>
                    <RightBar
                        ref={this.rightBarRef}
                    />
                </div>
                <div className={'frameBottom'} />
            </div>
        );
    }
}

Board.propTypes = {
    pointLabelDirection: PropTypes.oneOf(['clockwise', 'back-clockwise']),
};

Board.defaultProps = {
    pointLabelDirection: 'clockwise',
};

export default Board;
