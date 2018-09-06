import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    PLAYER_WHITE,
    PLAYER_BLACK,
} from '../../core';
import Point from './Point/Point';
import Dices from './Dices/Dices';

import './Pane.css';

class Pane extends Component {
    render() {
        return (
            <div className={'pane'}>
                <div className={'top'}>
                    <Point id='point_12' position={13} side='top' />
                    <Point id='point_11' position={14} side='top' />
                    <Point id='point_10' position={15} side='top' />
                    <Point id='point_9' position={16} side='top' />
                    <Point id='point_8' position={17} side='top' />
                    <Point id='point_7' position={18} side='top' />
                </div>
                <div className={'bottom'}>
                    <Point id='point_13' position={12} side='bottom' />
                    <Point id='point_14' position={11} side='bottom' />
                    <Point id='point_15' position={10} side='bottom' />
                    <Point id='point_16' position={9} side='bottom' />
                    <Point id='point_17' position={8} side='bottom' />
                    <Point id='point_18' position={7} side='bottom' />
                </div>
                <div className={'dice_position'}>
                    <Dices player={PLAYER_WHITE} />
                </div>
            </div>
        );
    }
}

Pane.propTypes = {

};

export default Pane;