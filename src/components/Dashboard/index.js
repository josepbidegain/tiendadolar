import React from 'react'
import { Typography, Paper, Avatar, IconButton, Button } from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../../firebase'
import { useLocation } from 'wouter'
import Counter from '../Counter'

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		//marginLeft: theme.spacing.unit * 3,
		//marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 800,
            height: 800,
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
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
	logout: {
		cursor: 'pointer'
	}
})

function Dashboard(props) {
	const { classes } = props
    const [location, setLocation] = useLocation()

    
    async function logout() {
		await firebase.logout()
		window.sessionStorage.removeItem('currentUser')
		setLocation('/login')
    }

	return (
		<main className={classes.main}>
			{
				(!firebase.getCurrentUsername()) ?
					// not logged in
					setLocation('/login')
				:
					<Paper className={classes.paper}>
						<Avatar className={classes.avatar}>
							<VerifiedUserOutlined />
						</Avatar>
						<Typography component="h1" variant="h5">
							Hello { firebase.getCurrentUsername() }
						</Typography>
						
						<Button onClick={()=>logout()}>
							<ExitToAppIcon alt='logout' className={classes.logout} />
						</Button>

						<Counter />
					</Paper>
			}
		</main>
	)
}

export default withStyles(styles)(Dashboard)