import React, { useState } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, useLocation } from 'wouter'

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
})

function Register(props) {
	const { classes } = props

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [location, setLocation] = useLocation();
	const [errors, setErrors] = useState({name: [], email: [], password:[], confirmPassword:[], genericError: ''})

	const validate = () => {
		const errors = {name: [], email: [], password:[], confirmPassword:[], genericError: ''}

		if (name.length === 0) {
		  errors.name.push("Name can't be empty");
		}
		
		if (!validateEmail(email)) {
			errors.email.push("Invalid email");
		}	
	  
		if (password.length < 6) {
		  errors.password.push("Password should be at least 6 characters long");
		}

		if (confirmPassword !== password) {
			errors.confirmPassword.push("Confirm Password should be equal to password field");
		  }
	  
		return errors;
	}

	async function handleRegister(e) {
		try {
			e.preventDefault()
			const errors = validate();

			if (errors.name.length || errors.email.length || errors.password.length || errors.confirmPassword.length) {
			  setErrors(errors);
			  
			  return;
			}
			
			await firebase.register(name, email, password)
			.then((response) => {
				setLocation("/dashboard")
			})	
		} catch(error) {
			setErrors({...errors, genericError: error.message})
		}
	}

	const handleChangeName = (e) => {
		setName(e.target.value)
		if (errors['name'].length) setErrors({...errors, name:[]})
	}

	const handleChangeEmail = (e) => {
		setEmail(e.target.value)
		if (errors['email'].length) setErrors({...errors, email:[]})
	}

	const handleChangePassword = (e) => {
		setPassword(e.target.value)
		if (errors['password'].length) setErrors({...errors, password:[]})
	}

	const handleChangeConfirmPassword = (e) => {
		setConfirmPassword(e.target.value)
		if (errors['confirmPassword'].length) setErrors({...errors, confirmPassword:[]})
	}

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Register Account
       			</Typography>
				   {
				   	errors['genericError'] !== '' && <Alert severity="error">{errors['genericError']}</Alert>

				   }
				<form className={classes.form} onSubmit={handleRegister}>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="name">Name</InputLabel>
						<Input id="name" name="name" autoComplete="off" autoFocus value={name} onChange={handleChangeName} />
						{
							errors['name'].length > 0 && 
								<small className={classes.errorLabel}>{errors['name']}</small>
						}
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email Address</InputLabel>
						<Input id="email" name="email" autoComplete="off" value={email} onChange={handleChangeEmail}  />
						{
							errors['email'].length > 0 && 
								<small className={classes.errorLabel}>{errors['email']}</small>
						}
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={handleChangePassword}  />
						{
							errors['password'].length > 0 && 
								<small className={classes.errorLabel}>{errors['password']}</small>
						}
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
						<Input name="confirmPassword" type="password" id="confirmPassword" autoComplete="off" value={confirmPassword} onChange={handleChangeConfirmPassword}  />
						{
							errors['confirmPassword'].length > 0 && 
								<small className={classes.errorLabel}>{errors['confirmPassword']}</small>
						}
					</FormControl>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={handleRegister}
						className={classes.submit}>
						Register
          			</Button>

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
				</form>
			</Paper>
		</main>
	)
}

export default withStyles(styles)(Register)