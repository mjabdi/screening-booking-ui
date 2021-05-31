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

  const packages_health_men_under40 = [
    { price: 295 , text: "MEDISCREEN BASIC MOT" },
    { price: 595 , text: "HEALTH BASICS MOT" },
    { price: 895 , text: "HEALTH ADVANCED MOT" },
    { price: 1299 , text: "HEALTH ELITE MOT" },
    { price: 525 , text: "MEDISCREEN SEXUAL HEALTH MOT" },
  ]

  const packages_health_men_over40 = [
    { price: 795 , text: "MEN'S HEALTH BASICS MOT" },
    { price: 995 , text: "MEN'S HEALTH ADVANCED MOT" },
    { price: 1999 , text: "MEN'S HEALTH ELITE MOT" },
    { price: 3999 , text: "PLATINIUM HEALTH SCREEN MEN" },
    { price: 525 , text: "MEDISCREEN SEXUAL HEALTH MOT" },
  ]

  const packages_health_women_under40 = [
    { price: 295 , text: "MEDISCREEN BASIC MOT" },
    { price: 595 , text: "WOMEN'S HEALTH BASICS MOT" },
    { price: 895 , text: "WOMEN'S HEALTH ADVANCED MOT" },
    { price: 1999 , text: "WOMEN'S HEALTH ELITE MOT" },
    { price: 525 , text: "MEDISCREEN SEXUAL HEALTH MOT" },
  ]

  const packages_health_women_over40 = [
    { price: 795 , text: "HEALTH BASICS MOT" },
    { price: 1095 , text: "HEALTH ADVANCED MOT" },
    { price: 1499 , text: "HEALTH ADVANCED PLUS MOT" },
    { price: 2499 , text: "HEALTH ELITE MOT" },
    { price: 525 , text: "MEDISCREEN SEXUAL HEALTH MOT" },
  ]

  const packages_allergy = [
    { price: 999 , text: "ALLERGY BASICS MOT PACKAGE" },
    { price: 1499 , text: "ALLERGY ADVANCED MOT PACKAGE" },
  ]

  useEffect(() => {
    window.scrollTo(0, 0)
    const _packages = loadPackages()
    console.log(state)
    console.log(_packages)
    setPackages([..._packages])
    setState(state => ({...state, showNext: state.package ? true : false}))
  }, []);

  const loadPackages = () => {
    if (state.cat?.key === "health")
    {
      if (state.gender === "men"){
        if (state.age === "under40"){
          return packages_health_men_under40
        }else if (state.age === "over40"){
          return packages_health_men_over40
        }
      }else if (state.gender === "women"){
        if (state.age === "under40"){
          return packages_health_women_under40
        }else if (state.age === "over40"){
          return packages_health_women_over40
        }
      }
    }else if (state.cat?.key === "allergy"){
      return packages_allergy
    }
    return []
  }

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