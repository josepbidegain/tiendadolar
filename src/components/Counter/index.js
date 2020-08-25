import React, { useEffect, useState } from 'react'
import { Typography, Button } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'

import {Dialog, DialogTitle, DialogContent, DialogContentText} from '@material-ui/core';

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		//marginLeft: theme.spacing.unit * 3,
		//marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			margin: 'auto'
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        fontSize: '5rem',
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

const INITIAL_COUNTER = 60

function Counter(props) {
	const { classes } = props
    const [timeLeft, setTimeLeft] = useState(INITIAL_COUNTER);
    const [running, setRunning] = useState(true)
    const [color, setColor] = useState('Grey')
    const [open, setOpen] = useState(false)
    const [randomClick, setRandomClick] = useState(getRandom())
    const [externalClick, setExternalClick] = useState(false)

    
    useEffect(() => {
        console.log("second of randomClick ",randomClick)
    }, []);

    function createTimeOut() {
        const timer = setTimeout(() => {
            if (timeLeft <= 0 || !running){
                clearTimeout(timer) 
            }

            //simulate clicks of another person
            if (randomClick === timeLeft) {
                setExternalClick(true)
                handleStop()
            }else {
                calculateTimeLeft()
            }
        }, 1000)
    }

    useEffect(() => {
        createTimeOut()
    });

    const calculateTimeLeft = () => {
        if (timeLeft == 0 || !running) return 
        setTimeLeft(timeLeft - 1)
    }
    
    function handleStop() {
        setRunning(false)
        let colorValue = getTimeColor()
        setColor(colorValue)
        setOpen(true)
    }

    function getTimeColor() {
        let value = 'Grey'

        if (timeLeft > 51)
            value= 'Purple'
        else if (timeLeft > 41)
            value = 'Blue'
        else if (timeLeft > 31)
            value = 'Green'
        else if (timeLeft > 21)
            value = 'Yellow'
        else if (timeLeft > 11)
            value = 'Orange'
        else
            value = 'Red'

        return value
    }
    
    function getRandom() {
        return Math.floor(Math.random() * 60) + 1
    }

    function handleClose() {
        setExternalClick(false)
        resetCounter()
        setOpen(false)
    }

    function resetCounter() {
        setTimeLeft(INITIAL_COUNTER)
        const newRandom = getRandom()
        console.log('newRandomClick ',newRandom)
        setRandomClick(newRandom)
        setRunning(true)
    }
	return (
		<main className={ color}>
            <Typography className={classes.paper} component="h1" variant="h5">
                {timeLeft}
            </Typography>

            <Button
                disabled={!running ? true : null}
					fullWidth
					variant="contained"
					color="secondary"
					onClick={()=>handleStop()}
					className={ !running ? 'clicked' : classes.submit}>
					{running ? 'Stop' : 'Stopped'}
          		</Button>

            <Dialog onClose={()=>handleClose()} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">User Information</DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            externalClick ? `Other person time of click was ${timeLeft}` : `Your time of click was ${timeLeft}` 
                        }
                        
                    </DialogContentText>

                    <DialogContentText id="alert-dialog-description">
                        {
                            externalClick ? `Other person selected color is ${color}` : `Your selected color is ${color}` 
                        }
                    </DialogContentText>
                </DialogContent>
            </Dialog>

		</main>

        
	)
}

export default withStyles(styles)(Counter)