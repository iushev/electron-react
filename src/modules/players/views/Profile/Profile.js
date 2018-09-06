import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import SaveIcon from '@material-ui/icons/Save';
import { withStyles } from '@material-ui/core';

// import { AppContext } from '../../AppContext';
import ProfileForm from '../../../../components/ProfileForm';
import api from '../../../../api';
import FileUpload from '../../../../components/FileUpload';
import { setFlash } from '../../../../components/FlashMessage/store/actions';
import LastSessions from '../../components/LastSessions';

const env = process.env.NODE_ENV || 'development';
const config = require('../../../../config')[env];


const styles = (theme) => ({
    root: {
        overflow: 'auto',
        position: 'absolute',
        width: '100%',
        height: '100%',
        padding: theme.spacing.unit,
    },
    processWrapper: {
        position: 'absolute',
        display: 'inline-block',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    container: {
        width: '1100px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    photoCard: {
        padding: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 2,
    },
    photoContainer: {
        width: '100%',
        paddingTop: '100%', /* 1:1 Aspect Ratio */
        position: 'relative',
        marginBottom: theme.spacing.unit,
    },
    photo: {
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
    },
    imgPhoto: {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    profile: {
        padding: theme.spacing.unit,
    },
    statistics: {
        padding: theme.spacing.unit,
        '& .item': {
            display: 'flex',
        },
        '& .label': {
            flexGrow: 1,
        },
        '& .value': {
            flexShrink: 1,
        },
    },
    inputfile: {
        width: '0.1px',
        height: '0.1px',
        opacity: '0',
        overflow: 'hidden',
        position: 'absolute',
        zIndex: '-1',
    },
});

class Profile extends Component {
    state = {
        userId: null,
        redirecting: true,
        profile: null,
    }

    static getDerivedStateFromProps(props) {
        let { userId } = props.match.params;
        if (!userId) {
            userId = props.loggedUserId;
        }

        return {
            userId,
        };
    }

    componentDidMount() {
        const { userId } = this.state;
        if (!userId) {
            setTimeout(() => this.props.history.push('/'), 1000);
        }
        else {
            api.players.profile.getByUserId(userId)
                .then((data) => {
                    this.setState({
                        profile: data,
                    });
                });
        }
    }

    handleFormSubmit = (data) => {
        return api.players.profile.updateWithUser(data)
            .then(() => this.props.setFlash('success', 'Profile have updated successfully.'))
            .catch((err) => this.props.setFlash('error', err));
    }

    render() {
        const { classes } = this.props;
        const { userId } = this.state;
        if (!userId) {
            return (
                <Typography variant='display1'>
                    Redirecting...
                </Typography>
            );
        }

        const { profile } = this.state;

        if (!profile) {
            return (
                <div className={classes.root}>
                    <div className={classes.processWrapper}>
                        <CircularProgress className={classes.progress} size={50} />
                    </div>
                </div>
            );
        }

        return (
            <div className={classes.root}>
                <Grid container spacing={16} className={classes.container}>
                    <Grid item>
                        <Typography variant='display1'>
                            Profile
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={16} className={classes.container}>
                    <Grid item xs={3}>
                        <Paper className={classes.photoCard}>
                            <div className={classes.photoContainer}>
                                <div className={classes.photo}>
                                    <img
                                        className={classes.imgPhoto}
                                        src={`${config.apiEndpoint}/filestorage/${profile.photo}`}
                                        alt={`${profile.user && profile.user.username}`}
                                    />
                                </div>
                            </div>
                            <FileUpload
                                onUpload={(data, config) => {
                                    return api.players.profile.uploadPhoto(profile.id, data, config);
                                }}
                                onComplete={ (data) => this.setState((prevState) => ({
                                    profile: {
                                        ...prevState.profile,
                                        photo: data.filePath,
                                    },
                                })) }
                            >
                                { ({ addFiles, onChange, uploading, progress }) => (
                                    <span>
                                        <LinearProgress variant="determinate" value={progress} style={{
                                            visibility: uploading ? 'visible' : 'hidden',
                                        }}/>
                                        <input
                                            id="file"
                                            className={classes.inputfile}
                                            type="file"
                                            name="file"
                                            onChange={e => {
                                                if (e.target.files && addFiles) {
                                                    addFiles(e.target.files);
                                                }
                                                if (onChange) {
                                                    onChange(e);
                                                }
                                            }} />
                                        <Button component='label' htmlFor="file">Upload</Button>
                                    </span>
                                ) }
                            </FileUpload>
                        </Paper>
                        <Paper className={classes.statistics}>
                            <Typography gutterBottom className={'item'}>
                                <span className={'label'}>elo-rating</span>
                                <span className={'value'}>{parseFloat(profile.elo_rating).toFixed(2)}</span>
                            </Typography>
                            <Typography gutterBottom className={'item'}>
                                <span className={'label'}>exp</span>
                                <span className={'value'}>{parseInt(profile.exp, 10)}</span>
                            </Typography>
                            <Typography className={'item'}>
                                <span className={'label'}>membership</span>
                                <span className={'value'}>{moment().to(profile.member_to)}</span>
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper className={classes.profile}>
                            <ProfileForm
                                onSubmit={this.handleFormSubmit}
                                initialValues={profile}
                            />
                            <Button
                                variant="raised"
                                color="primary"
                                className={classes.signInButton}
                                type="submit"
                                form='profile-form'
                            >
                                <SaveIcon className={classes.leftIcon}/>
                                Save
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.profile}>
                            <Typography variant='headline'>Last 10 logins</Typography>
                            <LastSessions/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Profile.propTypes = {
    ...withStyles.propTypes,
    loggedUserId: PropTypes.number,
    setFlash: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        loggedUserId: state.auth.auth.user ? +state.auth.auth.user.id : null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setFlash: (key, value) => dispatch(setFlash(key, value)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile)));
