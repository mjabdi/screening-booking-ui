import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GlobalState from './GlobalState';

import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({

  pageTitle: {
    color: theme.palette.primary.main,
    marginBottom: "15px",
  },

}));

export default function ChooseCountryForm() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();

  const [destinationTextError, setdestinationTextError] = React.useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);
    const isValid = validateForm()
    setState(state => ({...state, showNext: isValid ? true : false}))

  }, []);

  useEffect(() => {
    const isValid = validateForm()
    setState(state => ({...state, showNext: isValid ? true : false}))
  }, [state.destination, state.destinationText]);

  const validateForm = () =>
  {
    let error = false

    if (!state.destination || state.destination.trim().length < 1)
    {
      setState(state => ({...state, destinationTextError : true}));
      error = true;
    }
    if (state.destination && state.destination === "Other...")
    {
      if (!state.destinationText || state.destinationText.trim().length < 3)
      {
        setState(state => ({...state, destinationTextError : true}));
        error = true;  
      }
    }

    return !error
  }

  const destinations = [
    "Qatar",
    "Bahrain",
    "Barbados",
    "Bermuda",
    "Brunei",
    "Cayman Islands",
    "China",
    "Dubai",
    "Kuwait",
    "Malaysia",
    "Papua New Guinea",
    "Saudi Arabia",
    "South Africa",
    "Other..."
  ]

  return (
    <React.Fragment>

      <Typography variant="h6" gutterBottom className={classes.pageTitle}>
        Choose Your Destination
      </Typography>


      <Grid container direction="column" alignItems="center" justify="center" spacing={2} style={{marginTop:"30px", marginBottom:"20px"}}>
        <Grid item>
          <div >
            <FormControl required style={{ width: "300px" }} variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Select Destination</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={state.destination}
                onChange={(event) => setState(state => ({ ...state, destination: event.target.value }))}
                label="Select Destination"
              >
                {destinations.map(item => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

        </Grid>

        <Grid item>
          {state.destination === "Other..." && (
              <TextField
                error={destinationTextError ? true : false}
                style={{ width: "300px" }} 
                required
                id="destinationText"
                label="Enter Your Destination"
                placeholder="Enter Your Destination"
                helperText="Please enter your destination country/city"
                fullWidth
                autoComplete="none"
                value={state.destinationText}
                onChange={(event) => setState(state => ({ ...state, destinationText: event.target.value }))}
              />          
          )}
        </Grid>
      </Grid>



    </React.Fragment>
  );
}