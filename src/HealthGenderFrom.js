import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GlobalState from './GlobalState';

import { Grid } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({

  catBox: {
    textAlign: "center",
    width: "100%",
    minWidth: "110px",
    fontSize: "1.1rem",
    fontWeight:"600",
    padding: "3px",
    border: "1px solid #eee",
    height: "70px",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#fff",
    background: "linear-gradient(90deg, rgba(0,95,147,1) 33%, rgba(6,117,179,1) 63%, rgba(32,150,218,1) 100%)",
    transition : "all 0.3s ease-in",
    "&:hover" : {
      background: "linear-gradient(90deg, rgba(179,68,1,1) 30%, rgba(232,82,25,1) 74%, rgba(231,109,62,1) 100%)",
      transition : "all 0.3s ease-in",
    }
  },

  catBoxSelected: {
    textAlign: "center",
    width: "100%",
    minWidth: "110px",
    fontSize: "1.1rem",
    fontWeight:"600",
    padding: "3px",
    border: "1px solid #eee",
    height: "70px",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#fff",
    background: "linear-gradient(90deg, rgba(179,68,1,1) 30%, rgba(232,82,25,1) 74%, rgba(231,109,62,1) 100%)",
  },

  manImage: {
    filter: "brightness(0) invert(1)",
    maxWidth: "25px",
  },

  errorMessage: {
    width:"100%",
    textAlign:"center",
    fontWeight:"600",
    fontSize:"1rem",
    color: "red",
    height: "30px",
    padding:"10px"
  }


}));

export default function HealthGenderForm() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();

  const [error, setError] = React.useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    
    setState(state => ({...state, showNext: state.age && state.gender ? true : false}))
  }, []);



  
  const genderClicked = (gender) =>
  {
    if (state.age)
    {
      setState(state => ({...state, gender: gender, activeStep: state.activeStep + 1}))
      setError(null)
    }
    else{
      setState(state => ({...state, gender: gender}))
      setError("Please Select Age")

    }
  }

  const ageClicked = (age) =>
  {
    if (state.gender)
    {
      setState(state => ({...state, age: age, activeStep: state.activeStep + 1}))
      setError(null)
    }else{
      setState(state => ({...state, age: age}))
      setError("Please Select Gender")
    }
  }


  return (
    <React.Fragment>
      <Grid container alignItems="center" justify="center" style={{padding:"10px"}}>
          <Grid item xs={12} md={6} style={{marginBottom:"10px"}}>
               <Grid container spacing={1} alignItems="center" justify="center">
                 <Grid item>
                   <div style={{width:"70px", wordSpacing:"0.1rem", fontSize:"1.3rem", fontWeight:"600"}}>
                     I am a:
                   </div>
                 </Grid>
                 <Grid item>
                        <div className={state.gender === "men" ? classes.catBoxSelected :classes.catBox}  onClick={() => genderClicked("men")}>
                          <Grid container spacing={1} alignItems="center" justify="center" style={{height:"70px"}}>
                            <Grid item>
                               <img className={classes.manImage} src="https://www.healthscreening.clinic/public/design/images/men-icon.png"/>
                            </Grid>
                            <Grid item>
                               Man
                            </Grid>
                          </Grid> 
                        </div>
                 </Grid>
                 <Grid item>
                       <div className={state.gender === "women" ? classes.catBoxSelected :classes.catBox} onClick={() => genderClicked("women")}>
                          <Grid container spacing={1} alignItems="center" justify="center" style={{height:"70px"}}>
                            <Grid item>
                               <img className={classes.manImage} src="https://www.healthscreening.clinic/public/design/images/women-icon.png"/>
                            </Grid>
                            <Grid item>
                               Woman
                            </Grid>
                          </Grid> 
                        </div>
                 </Grid>
               </Grid> 
          </Grid>

          <Grid item xs={12} md={6} style={{marginBottom:"10px"}}>
               <Grid container spacing={1} alignItems="center" justify="center">
                 <Grid item>
                   <div style={{width:"70px",wordSpacing:"0.1rem", fontSize:"1.3rem", fontWeight:"600"}}>
                     I am:
                   </div>
                 </Grid>
                 <Grid item>
                        <div className={state.age === "under40" ? classes.catBoxSelected : classes.catBox} onClick={() => ageClicked("under40")}>
                          <Grid container spacing={1} alignItems="center" justify="center" style={{height:"70px"}}>
                            <Grid item>
                               Under 40
                            </Grid>
                          </Grid> 
                        </div>
                 </Grid>
                 <Grid item>
                 <div className={state.age === "over40" ? classes.catBoxSelected : classes.catBox} onClick={() => ageClicked("over40")}>
                          <Grid container spacing={1} alignItems="center" justify="center" style={{height:"70px"}}>
                            <Grid item>
                               Over 40
                            </Grid>
                          </Grid> 
                        </div>
                 </Grid>
               </Grid> 
          </Grid>


          <Grid item xs={12}>
            <div className={classes.errorMessage}>
                {error && `${error}`}
            </div> 
          </Grid>

  
      </Grid>
    </React.Fragment>
  );
}