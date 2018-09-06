import React from 'react';

import Point from '../Point/Point';
import './MiddleBar.css';
import {
    PLAYER_WHITE,
    PLAYER_BLACK,
} from '../../../core';

class MiddleBar extends React.Component {
    constructor(props) {
        super(props);

        this.pointHitWhiteRef = React.createRef();
        this.pointHitBlackRef = React.createRef();
    }

    updateDimensions = () => {
        this.pointHitWhiteRef.current.wrappedInstance.updateDimensions();
        this.pointHitBlackRef.current.wrappedInstance.updateDimensions();
    }

    render() {
        return (
            <div className={'MiddleBar'}>
                <div className={'pointWrapper top'}>
                    <Point
                        id='point_25'
                        ref={this.pointHitWhiteRef}
                        position={25}
                        side='top'
                        type='hit'
                        player={PLAYER_WHITE}
                    />
                </div>
                <div className={'pointWrapper bottom'}>
                    <Point
                        id='point_25'
                        ref={this.pointHitBlackRef}
                        position={25}
                        side='bottom'
                        type='hit'
                        player={PLAYER_BLACK}
                    />
                </div>
            </div>
        );
    }
}

export default MiddleBar;
