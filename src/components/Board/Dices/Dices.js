import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dice from '../Dice/Dice';
import './Dices.css';

const Dices = ({ player, dices }) => {
    if (dices.length === 0) {
        return null;
    }

    const rot = () => {
        return 'rotate(' + (Math.random() * 50 - 20) + 'deg)';
    };

    const deg1 = {transform: rot()};
    const deg2 = {transform: rot()};

    return (
        <div className={'dices_display'}>
            <div className={'dice'} style={deg1}>
                <Dice id='dice_1' player={player} number={dices[0]} />
            </div>
            <div className={['dice', 'dice_rignt'].join(' ')} style={deg2}>
                <Dice id='dice_2' player={player} number={dices[1]} />
            </div>
        </div>
    );
};

Dices.propTypes = {
    player: PropTypes.string.isRequired,
    dices: PropTypes.array,
};

const mapStateToProps = (state, ownProps) => {
    const dices = state.match.board.dices[ownProps.player].dices;
    return {
        dices: dices,
    };
};

export default connect(mapStateToProps)(Dices);
