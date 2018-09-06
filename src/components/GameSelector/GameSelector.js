import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core';

import { matchActions } from '../../store/actions';
import { MenuItem } from '@material-ui/core';

const styles = theme => ({
    gameSelector: {
        padding: theme.spacing.unit,
    },
    selectRoot: {
        width: '100%',
    },
});

const GameSelector = ({ currentGameId, games, setCurrentGame, classes }) => {
    return (
        <div className={classes.gameSelector}>
            <Select
                value={`${currentGameId}` || '0'}
                onChange={(event) => {
                    setCurrentGame(event.target.value);
                }}
                className={classes.selectRoot}
            >
                { Object.keys(games).map((key/*, index*/) => (
                    <MenuItem
                        key={key}
                        value={games[key].id || '0'}
                    >
                        {`Game ${+games[key].id + 1}`}
                    </MenuItem>
                ))}

            </Select>

        </div>
    );
};

GameSelector.propTypes = {
    currentGameId: PropTypes.number,
    games: PropTypes.object.isRequired,
    setCurrentGame: PropTypes.func.isRequired,
    classes: PropTypes.object,
};

const mapStateToProps = (state) => {
    const { currentGameId, games } = state.match;
    return {
        currentGameId,
        games,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentGame: (gameId) => dispatch(matchActions.setCurrentGame(gameId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GameSelector));
