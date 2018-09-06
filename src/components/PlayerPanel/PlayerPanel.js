import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

import whiteChecker from './white.gif';
import blackChecker from './black.gif';

const styles = (theme) => ({
    root: {
        display: 'flex',
        height: '40px',
        lineHeight: '40px',
        padding: '0 10px',
    },
    player: {
        display: 'inline-block',
    },
    playerChecker: {
        display: 'inline-block',
        height: '24px',
        width: '24px',
        backgroundSize: 'cover',
        backgroundPosition: 'left',
        backgroundRepeat: 'no-repeat',
    },
    whiteChecker: {
        backgroundImage: `url(${whiteChecker})`,
    },
    blackChecker: {
        backgroundImage: `url(${blackChecker})`,
    },
    playerName: {
        display: 'inline-block',
        marginLeft: '5px',
    },
    score: {
        flex: '1 1 auto',
        textAlign: 'center',
        display: 'inline-block',
    },
    pips: {
        display: 'inline-block',
    }
});

const PlayerPanel = ({ player, name, score, pips, classes }) => {
    return (
        <div className={classes.root}>
            <div className={classes.player}>
                <span className={classnames(classes.playerChecker, {
                    [classes.whiteChecker]: player === 'white',
                    [classes.blackChecker]: player === 'black',
                })}>
                </span>
                <Typography component='span' className={classes.playerName}>
                    { name || '' }
                </Typography>
            </div>
            <Typography component='div' className={classes.score}>
                <span>Score:&nbsp;</span>
                <span>{ score }</span>
            </Typography>
            <Typography component='div' className={classes.pips}>
                <span>Pips:&nbsp;</span>
                <span>{ pips || '' }</span>
            </Typography>
        </div>
    );
};

PlayerPanel.propTypes = {
    player: PropTypes.oneOf(['white', 'black']).isRequired,
    name: PropTypes.string,
    score: PropTypes.number,
    pips: PropTypes.number,
    ...withStyles.propTypes
};

export default withStyles(styles)(PlayerPanel);
