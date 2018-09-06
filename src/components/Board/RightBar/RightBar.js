import React from 'react';

import Point from '../Point/Point';
import './RightBar.css';
import {
    PLAYER_WHITE,
    PLAYER_BLACK,
} from '../../../core';

class RightBar extends React.Component {
    constructor(props) {
        super(props);

        this.pointOffWhiteRef = React.createRef();
        this.pointOffBlackRef = React.createRef();
    }

    updateDimensions = () => {
        this.pointOffWhiteRef.current.wrappedInstance.updateDimensions();
        this.pointOffBlackRef.current.wrappedInstance.updateDimensions();
    }

    render() {
        return (
            <div className={'RightBar'}>
                <div className={'pointWrapper top'}>
                    <Point
                        id='point_26'
                        ref={this.pointOffWhiteRef}
                        position={26}
                        side='top'
                        type='off'
                        player={PLAYER_WHITE}
                    />
                </div>
                <div className={'pointWrapper bottom'}>
                    <Point
                        id='point_26'
                        ref={this.pointOffBlackRef}
                        position={26}
                        side='bottom'
                        type='off'
                        player={PLAYER_BLACK}
                    />
                </div>
            </div>
        );
    }
}

export default RightBar;
