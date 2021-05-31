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
import CategoriesForm from './CategoriesForm';
import HealthGenderForm from './HealthGenderFrom';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Divider from '@material-ui/core/Divider'
import ScreenPackagesForm from './ScreenPackagesForm';
import DateForm from './DateForm';
import TimeForm from './TimeForm';
import InformationForm from './InformationForm';
import ReviewForm from './ReviewForm';

const useStyles = makeStyles((theme) => ({

  submitButton: {
    backgroundColor: "#d43500",
    transition : "all 0.3s ease",
    width: "100px",
    "&:hover" : {
      backgroundColor: "#ed3b00",
    }
  }

}));

export default function SmartEntryForm() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const submitForm = () => {
    alert("Submit")
  }


  const getComponentFromState = (_state) => {

    if (!_state.cat || _state.activeStep === 0) {
      return <CategoriesForm />
    }
    else if (_state.cat.key === "health") {
      if (_state.activeStep === 1) {
        return <HealthGenderForm />
      } else if (_state.activeStep === 2) {
        return <ScreenPackagesForm />
      }else if (_state.activeStep === 3) {
        return <DateForm/>
      }else if (_state.activeStep === 4) {
        return <TimeForm/>
      }
      else if (_state.activeStep === 5) {
        return <InformationForm/>
      }
      else if (_state.activeStep === 6) {
        return <ReviewForm/>
      }



    } else if (_state.cat.key === "allergy") {
      if (_state.activeStep === 1) {
        return <ScreenPackagesForm />
      }
    }

    return null
  }

  return (
    <React.Fragment>
      {getComponentFromState(state)}
      {state.activeStep > 0 && (
        <div style={{ marginTop: "10px" }}>
          <Divider />
          <Grid container direction="row" justify="space-between" alignItems="center" style={{ width: "100%", paddingTop: "10px" }}>
            <Grid item>
              <Button startIcon={<NavigateBeforeIcon />} variant="contained" color="primary" onClick={() => setState(state => ({ ...state, activeStep: state.activeStep - 1 }))}>
                {`Back`}
              </Button>
            </Grid>

            <Grid item>
              {state.showNext && !state.lastStep && (
                  <Button endIcon={<NavigateNextIcon />} variant="contained" color="primary" onClick={() => setState(state => ({ ...state, activeStep: state.activeStep + 1 }))}>
                      {`Next`}
                  </Button>
              )}

              {state.showNext && state.lastStep && (
                  <Button className={classes.submitButton} variant="contained" color="primary" onClick={() => submitForm()}>
                      {`Submit`}
                  </Button>
              )}

            </Grid>

          </Grid>

        </div>

      )}
    </React.Fragment>
  );
}