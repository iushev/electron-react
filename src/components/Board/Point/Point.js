import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Checker from '../Checker/Checker';
import './Point.css';
import {
    PLAYER_WHITE,
    PLAYER_BLACK,
} from '../../../core';

class Point extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['game', 'hit', 'off']).isRequired,
        backgroundType: PropTypes.oneOf(['none', 'light', 'dark']).isRequired,
        position: PropTypes.number.isRequired,
        checkers: PropTypes.array,
        side: PropTypes.oneOf(['top', 'bottom']).isRequired,
        player: PropTypes.oneOf(['none', PLAYER_WHITE, PLAYER_BLACK]).isRequired,
    };

    static defaultProps = {
        type: 'game',
        backgroundType: 'none',
        player: 'none',
    }

    constructor(props) {
        super(props);

        this.checkers = {};
        this.wrapperRef = React.createRef();

        this.state = {
            wrapperHeight: null,
            wrapperWidth: null,
        };
    }

    updateDimensions = () => {
        const wrapper = this.wrapperRef.current;
        this.setState({
            wrapperHeight: wrapper.offsetHeight,
            wrapperWidth: wrapper.offsetWidth,
        });
    }

    UNSAFE_componentWillReceiveProps() {
        this.checkers = {};
    }

    renderCheckers() {
        let offset = 0;
        const { wrapperHeight, wrapperWidth } = this.state;
        if (wrapperHeight != null && wrapperWidth != null) {
            offset = (wrapperHeight - wrapperWidth) / (this.props.checkers.length - 1) / wrapperWidth * 100;
        }
        if (offset > 100) {
            offset = 100;
        }

        return this.props.checkers.map((checkerId, index) => (
            <Checker
                key={checkerId}
                id={checkerId}
                pointId={this.props.id}
                inlineStyle={{
                    [this.props.side]: '0',
                    [`margin${this.props.side.charAt(0).toUpperCase() + this.props.side.slice(1)}`]: `${offset * index}%`,
                }}
                isHit={this.props.type === 'hit'}
            />
        ));
    }

    render() {
        const classes = [];
        switch (this.props.type) {
            case 'hit':
                classes.push('point', 'hit', this.props.side);
                break;
            case 'off':
                classes.push('point', 'off', this.props.side);
                break;
            case 'game':
            default: {
                classes.push('point', 'game', this.props.backgroundType, this.props.side);
                break;
            }
        }

        let label = null;
        if (this.props.type === 'game') {
            label = (<span className={'pointLabel'}>{this.props.position}</span>);
        }

        return (
            <div
                id={this.props.id}
                className={classes.join(' ')}
                ref={this.wrapperRef}
            >
                <div ref={point => this.point = point}>
                    { label }
                    { this.renderCheckers() }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { match } = state;
    const checkers = !ownProps.player || ownProps.player === 'none' ?
        match.board.points[ownProps.id] :
        match.board.points[ownProps.id][ownProps.player];

    return {
        checkers: checkers,
    };
};

export default connect(mapStateToProps, null, null, { withRef: true })(Point);
