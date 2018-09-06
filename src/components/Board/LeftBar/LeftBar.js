import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { withStyles } from '@material-ui/core';

import DoublingCube from '../DoublingCube/DoublingCube';
import {
    PLAYER_BLACK,
    PLAYER_WHITE,
} from '../../../core';

const styles = () => ({
    barLeft: {
        flex: '0 0 auto',
        height: '100%',
        width: '6.666666667%',
        backgroundColor: '#5e4733',
        position: 'relative',

        display: 'flex',
        flexDirection: 'column',
    },
    doublingCubeMiddle: {
        justifyContent: 'center',
    },
    doublingCubeBlack: {
        justifyContent: 'flex-end',
    },
    doublingCubeWhite: {
        justifyContent: 'flex-start',
    },
})

const LeftBar = ({ owner, classes }) => {
    let doublingCube;
    switch (owner) {
        case PLAYER_BLACK:
            doublingCube = classes.doublingCubeBlack;
            break;
        case PLAYER_WHITE:
            doublingCube = classes.doublingCubeWhite;
            break;
        default:
            doublingCube = classes.doublingCubeMiddle;
    }
    return (
        <div className={classnames(
            classes.barLeft,
            doublingCube
        )} >
            <DoublingCube />
        </div>
    );
};

LeftBar.propTypes = {
    owner: PropTypes.string,
    ...withStyles.propTypes,
};

const mapStateToProps = (state) => {
    return {
        owner: state.match.board.doublingCube.owner,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(LeftBar));
