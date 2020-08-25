import React, { useState } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, useLocation } from 'wouter'
import { Alert } from '@material-ui/lab'

import firebase from '../../firebase'
import validateEmail from '../../helpers/validateEmail'

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
    },
    errorLabel: {
		color: 'red'
	}
});

function ForgotPassword(props) {
	const { classes } = props

    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validateEmail(email)){
            setErrorEmail("Invalid Email")
            return
        }

        firebase.sendResetPasswordEmail(email)
        .then(()=> {
            setMessage('Email sent correctly')
            setMessageType('success')
        })
        .catch(error=> {
            setMessage(error.message)
            setMessageType('error')
        })
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
        setErrorEmail('')
    }
	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Forgot Password
       			</Typography>
                {
                    message && <Alert severity={messageType}>{message}</Alert>
                }

                <form className={classes.form} onSubmit={handleSubmit}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" autoComplete="off" autoFocus value={email} onChange={handleChangeEmail} />
                        {
                            errorEmail && <small className={classes.errorLabel}>{errorEmail}</small>
						}
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        className={classes.submit}>
                        Submit
                    </Button>
                </form>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/login"
                    className={classes.submit}>
                    Go back to Login
                </Button>
			</Paper>
		</main>
	)

	
}

export default withStyles(styles)(ForgotPassword)