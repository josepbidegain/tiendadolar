import React, { useState, useEffect } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, useLocation } from 'wouter'
import firebase from '../../firebase'
import Grid from '@material-ui/core/Grid';
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
	error: {
		color: 'red'
	}
});

function Login(props) {
	const { classes } = props

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [location, setLocation] = useLocation()

	const handleLogin = async (e) => {
		try {
			e.preventDefault()
			if (!email || !password) {
				setError('Fields required')
				return
			}
			
			if (!validateEmail(email)) {
				setError("Invalid email")
				return
			}

			await firebase.login(email, password)
			.then(response => {
				window.sessionStorage.setItem('currentUser', JSON.stringify(response.user))
			})
			setLocation('/dashboard')
		} catch(error) {
			console.log(error.message)
		}
	}

	useEffect(()=> {
		if (firebase.getCurrentUsername())
			setLocation('/dashboard')
	}, [])

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
       			</Typography>
				<form className={classes.form} onSubmit={handleLogin}>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email Address</InputLabel>
						<Input id="email" name="email" autoComplete="off" autoFocus value={email} onChange={(e)=>setEmail(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={(e)=>setPassword(e.target.value)} />
					</FormControl>
					{
						error && (<FormControl margin="normal" fullWidth>
										<small className={classes.error}>{error}</small>
									</FormControl>)
					}
					

					<Grid container>
					<Grid item xs>
					<Link to="/forgot-password" variant="body2">
						Forgot password?
					</Link>
					</Grid>
				</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={handleLogin}
						className={classes.submit}>
						Sign in
          			</Button>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/register"
						className={classes.submit}>
						Register
          			</Button>
				</form>
			</Paper>
		</main>
	)

	
}

export default withStyles(styles)(Login)