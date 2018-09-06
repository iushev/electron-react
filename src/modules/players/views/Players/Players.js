import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core';

import api from '../../../../api';
import CountryItem from '../../../../components/CountryItem';

const styles = theme => ({
    tableRow: {
        height: theme.spacing.unit * 2,
    },
});

class Players extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {
        players: [],
    }

    componentDidMount() {
        this.fetchPlayers();
    }

    fetchPlayers() {
        api.players.online()
            .then((result) => {
                this.setState({
                    players: result,
                });
            });
    }

    render() {
        const { classes } = this.props;
        const { players }= this.state;

        return (
            <div>
                <Table>
                    <TableHead>
                        <TableRow className={classes.tableRow}>
                            <TableCell>
                                &nbsp;
                            </TableCell>
                            <TableCell>
                                Nickname
                            </TableCell>
                            <TableCell>
                                Gender
                            </TableCell>
                            <TableCell>
                                Country
                            </TableCell>
                            <TableCell>
                                Raitng
                            </TableCell>
                            <TableCell>
                                Exp.
                            </TableCell>
                            <TableCell>
                                Full Name
                            </TableCell>
                            <TableCell>
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { players.map((player) => (
                            <TableRow
                                key={player.id}
                                hover
                                className={classes.tableRow}
                            >
                                <TableCell>
                                    &nbsp;
                                </TableCell>
                                <TableCell>
                                    {player.user.username}
                                </TableCell>
                                <TableCell>
                                    {player.gender}
                                </TableCell>
                                <TableCell>
                                    {player.country && (<CountryItem country={player.country} />)}
                                </TableCell>
                                <TableCell>
                                    {parseFloat(player.elo_rating).toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    {parseInt(player.exp, 10)}
                                </TableCell>
                                <TableCell>
                                    {`${player.user.first_name} ${player.user.last_name}`}
                                </TableCell>
                                <TableCell>
                                    {player.status}
                                </TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </div>
        );
    }
}

Players.propTypes = {

};

export default withStyles(styles)(Players);