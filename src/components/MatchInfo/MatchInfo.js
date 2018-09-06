import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
    root: {
        height: '40px',
        lineHeight: '40px',
        padding: '0 10px',
    },
    match: {
        marginRight: '10px',
    },
    label: {
        marginRight: '5px',
    },
})


const MatchInfo = ({ matchLength/*, gameId*/, classes }) => {
    return (
        <div className={classes.root}>
            <span className={classes.match}>
                <span className={classes.label}>Match to</span>
                <span>{matchLength}</span>
                <span> points</span>
            </span>
        </div>
    );
};

MatchInfo.propTypes = {
    matchLength: PropTypes.number,
    gameId: PropTypes.number,
    ...withStyles.propTypes,
};

const mapStateToProps = (state) => {
    const { currentGameId, games } = state.match;
    let matchLength;
    if (currentGameId != null) {
        matchLength = games[currentGameId].matchLength;
    }
    return {
        matchLength,
        gameId: currentGameId,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(MatchInfo));
