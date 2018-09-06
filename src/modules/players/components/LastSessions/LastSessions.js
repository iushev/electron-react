import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import api from '../../../../api';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class LastSessions extends Component {
    state = {
        sessions: [],
    }

    componentDidMount() {
        api.auth.last_sessions()
            .then((sessions) => {
                this.setState({
                    sessions,
                });
            });
    }

    render() {
        const { sessions } = this.state;
        if (!sessions) {
            return null;
        }
        return (
            <Table>
                <TableBody>
                    { sessions.map((session) => (
                        <TableRow key={session.id}>
                            <TableCell>
                                {session.login_date}
                            </TableCell>
                            <TableCell>
                                {session.ip}
                            </TableCell>
                        </TableRow>
                    )) }
                </TableBody>
            </Table>
        );
    }
}

LastSessions.propTypes = {
};

export default LastSessions;

