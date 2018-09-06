import React from 'react';
import PropTypes from 'prop-types';

import './Dice.css';

const Dice = ( { /*id, */player, number } ) => {
    return (
        <div className={`dice dice-${player}-${number}`} />
    );
};

Dice.propTypes = {
    id:  PropTypes.string.isRequired,
    player:  PropTypes.string.isRequired,
    number:  PropTypes.number.isRequired,
};

export default Dice;
