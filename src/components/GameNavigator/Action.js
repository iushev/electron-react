import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { withStyles } from '@material-ui/core';

import { matchActions } from '../../store/actions';

const styles = (theme) => ({
    action: {
        display: 'flex',
        flexDirection: 'row',
        padding: '0 3px',
        cursor: 'pointer',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    selected: {
        backgroundColor: theme.palette.action.selected,
    },
});

class Action extends React.Component{
    state = {
        scrollInView: false,
    }

    render() {
        const { className, move, active, children, setCurrentMove, classes } = this.props;
        return (
            <div
                className={classnames(
                    className,
                    classes.action,
                    {
                        [classes.selected]: active,
                    })}
                onClick={() => setCurrentMove(move.id)}
            >
                { children }
            </div>
        );
    }
}

Action.propTypes = {
    className: PropTypes.string,
    move: PropTypes.object.isRequired,
    active: PropTypes.bool,
    children: PropTypes.any,
    setCurrentMove: PropTypes.func,
    ...withStyles.propTypes
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentMove: (moveId) => dispatch(matchActions.setCurrentMove(moveId)),
    };
};

export default connect(
    undefined,
    mapDispatchToProps
)(withStyles(styles)(Action));
