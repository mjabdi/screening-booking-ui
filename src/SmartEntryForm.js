import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GlobalState from './GlobalState';

import { Backdrop, CircularProgress, Grid } from '@material-ui/core';
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
import ChooseCountryForm from './ChooseCountryForm';
import BookService from './services/BookService';
import dateformat from 'dateformat';
import ResultsForm from './ResultsForm';
import PayForm from './PayForm';


const useStyles = makeStyles((theme) => ({

  submitButton: {
    backgroundColor: "#d43500",
    transition : "all 0.3s ease",
    minWidth: "100px",
    "&:hover" : {
      backgroundColor: "#ed3b00",
    }
  },

  backdrop: {
    zIndex: 999,
    color: '#fff',
  },

}));

export default function SmartEntryForm() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();

  const [submiting, setSubmiting] = React.useState(false);


  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const getPackageName = () => {

    if (state.cat.key === "visa")
    {
      let destination = state.destination
      if (destination === "Other...")
      {
        destination = state.destinationText
      }
      return `${state.cat.text.toUpperCase()} ${` ( ${destination.toUpperCase()} )`}`
    }else
    {
      return `${state.cat.text.toUpperCase()} ${state.package ? ` / ${state.package.text.toUpperCase()}` : ''}`
    }
  }


  const submitForm = () => {
    var promiseArray = [];

    setSubmiting(true)

    BookService.getNewReference().then( (res) => {

      const ref = res.data.ref;

      setState(state => ({...state, ref: ref}));

      let referrer = '/'

      const personInfo = {
        fullname: state.fullname,
        email: state.email,
        phone: state.phone,
        notes: state.notes,
        gender: state.gender,
        address: state.address,
        service: getPackageName(),
        birthDate: state.birthDate
      };
  
      const promise = BookService.bookAppointment({...personInfo, bookingDate:  dateformat(new Date(state.bookingDate.toUTCString().slice(0, -4)),'yyyy-mm-dd'), bookingTime: state.bookingTime, bookingRef: ref, referrer: referrer });
      promiseArray.push(promise);
  
      
      Promise.all(promiseArray).then( (values) => {

        setState(state => ({...state, finalResults: values, activeStep : state.activeStep + 1, formDone: true}));

        setSubmiting(false);
  
      }).catch( (errs) =>
      {
        console.log(`Error :  ${errs}`);
        setSubmiting(false);
      });

    }).catch( (err) =>
    {
      console.log(`Cannot Get REF NO. : ${err}`);
      setSubmiting(false);
    });;

  }


  const getComponentFromState = (_state) => {

    console.log(_state)

    if (_state.standalonePackage) {
      if (_state.activeStep === 1) {
        return <DateForm />;
      } else if (_state.activeStep === 2) {
        return <TimeForm />;
      } else if (_state.activeStep === 3) {
        return <InformationForm />;
      } else if (_state.activeStep === 4) {
        return <ReviewForm />;
      } else if (_state.activeStep === 5) {
        return <PayForm />;
      } else if (_state.activeStep === 6) {
        return <ResultsForm />;
      }
    } else if (!_state.cat || _state.activeStep === 0) {
      return <CategoriesForm />;
    } else if (_state.cat.key === "health") {
      if (_state.activeStep === 1) {
        return <HealthGenderForm />;
      } else if (_state.activeStep === 2) {
        return <ScreenPackagesForm />;
      } else if (_state.activeStep === 3) {
        return <DateForm />;
      } else if (_state.activeStep === 4) {
        return <TimeForm />;
      } else if (_state.activeStep === 5) {
        return <InformationForm />;
      } else if (_state.activeStep === 6) {
        return <ReviewForm />;
      } else if (_state.activeStep === 7) {
        return <PayForm />;
      } else if (_state.activeStep === 8) {
        return <ResultsForm />;
      }
    } else if (_state.cat.key === "allergy") {
      if (_state.activeStep === 1) {
        return <ScreenPackagesForm />;
      } else if (_state.activeStep === 2) {
        return <DateForm />;
      } else if (_state.activeStep === 3) {
        return <TimeForm />;
      } else if (_state.activeStep === 4) {
        return <InformationForm />;
      } else if (_state.activeStep === 5) {
        return <ReviewForm />;
      } else if (_state.activeStep === 6) {
        return <PayForm />;
      } else if (_state.activeStep === 7) {
        return <ResultsForm />;
      }
    } else if (_state.cat.key === "visa") {
      if (_state.activeStep === 1) {
        return <ChooseCountryForm />;
      } else if (_state.activeStep === 2) {
        return <DateForm />;
      } else if (_state.activeStep === 3) {
        return <TimeForm />;
      } else if (_state.activeStep === 4) {
        return <InformationForm />;
      } else if (_state.activeStep === 5) {
        return <ReviewForm />;
      } else if (_state.activeStep === 6) {
        return <PayForm />;
      } else if (_state.activeStep === 7) {
        return <ResultsForm />;
      }
    } else {
      if (_state.activeStep === 1) {
        return <DateForm />;
      } else if (_state.activeStep === 2) {
        return <TimeForm />;
      } else if (_state.activeStep === 3) {
        return <InformationForm />;
      } else if (_state.activeStep === 4) {
        return <ReviewForm />;
      } else if (_state.activeStep === 5) {
        return <PayForm />;
      } else if (_state.activeStep === 6) {
        return <ResultsForm />;
      }
    }

    return null
  }

  return (
    <React.Fragment>
      
      <Backdrop className={classes.backdrop} open={submiting} >
        <CircularProgress color="inherit" />
      </Backdrop>

      {getComponentFromState(state)}
      {state.activeStep > 0 && !state.formDone && (
        <div style={{ marginTop: "10px" }}>
          <Divider />
          <Grid container direction="row" justify="space-between" alignItems="center" style={{ width: "100%", paddingTop: "10px" }}>
            <Grid item>
              {state.activeStep > state.minActiveStep && (
                <Button startIcon={<NavigateBeforeIcon />} variant="contained" color="primary" onClick={() => setState(state => ({ ...state, activeStep: state.activeStep - 1 }))}>
                   {`Back`}
                </Button>
              ) }
            </Grid>

            <Grid item>
              {state.showNext && !state.lastStep && !state.formDone && !(state.package.key==="fertility_women" && !state.agreed_fertility) && (
                  <Button endIcon={<NavigateNextIcon />} variant="contained" color="primary" onClick={() => setState(state => ({ ...state, activeStep: state.activeStep + 1 }))}>
                      {`Next`}
                  </Button>
              )}

              {state.showNext && state.lastStep && !state.formDone && (
                  <Button className={classes.submitButton} variant="contained" color="primary" onClick={() => setState(state => ({ ...state, activeStep: state.activeStep + 1 }))}>
                      {`Proceed To Payment`}
                  </Button>
              )}

            </Grid>

          </Grid>



        </div>

      )}
    </React.Fragment>
  );
}