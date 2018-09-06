import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
    footer: {
        flex: '0 0 auto',
        fontSize: '12px',
        padding: '12px 20px',
        borderTop: '1px solid #e5e5e5',
    },
});

const StatusBar = ({ classes }) => (
    <footer className={classes.footer}>
        Backgammon International
    </footer>
);

export default withStyles(styles)(StatusBar);
