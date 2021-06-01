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
import { loadPackages } from './ScreeningPackageLoader';
const useStyles = makeStyles((theme) => ({

  catBox: {
    textAlign: "center",
    width: "100%",
    fontSize: "1rem",
    fontWeight:"600",
    padding: "10px",
    border: "1px solid #eee",
    height: "120px",
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
    fontSize: "1rem",
    fontWeight:"600",
    padding: "10px",
    border: "1px solid #eee",
    height: "120px",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#fff",
    background: "linear-gradient(90deg, rgba(179,68,1,1) 30%, rgba(232,82,25,1) 74%, rgba(231,109,62,1) 100%)",
  }


}));

export default function ScreenPackagesForm() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();

  const [packages, setPackages] = React.useState([])


  useEffect(() => {
    window.scrollTo(0, 0)
    const _packages = loadPackages(state)
    setPackages([..._packages])
    setState(state => ({...state, showNext: state.package ? true : false}))
  }, []);


  const packageClicked = (price, text) => {
    setState(state => ({...state, package: {price: price, text: text}, activeStep: state.activeStep + 1}))
  }

  return (
    <React.Fragment>
      <Grid container spacing={2} alignItems="center" justify="center">
        {
          packages.map(item => (
            <Grid item xs={6} sm={4}>
              <div className={state.package?.text === item.text ? classes.catBoxSelected  : classes.catBox} onClick={() => packageClicked(item.price, item.text)}>
                <Grid container alignItems="center" justify="center" style={{height:"100%", width:"100%"}}>
                  <Grid item>
                      {item.text} 

                      <div style={{fontSize:"1.5rem", paddingTop:"5px"}}>£{item.price}</div>
                  </Grid>
                 </Grid> 
              </div>
            </Grid>
          ))
        }
      </Grid>
    </React.Fragment>
  );
}