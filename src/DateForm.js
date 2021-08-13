import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

import GlobalState from './GlobalState';
import { BrowserView, MobileView } from 'react-device-detect';

import TimeService from './services/TimeService';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';


import { format, addMinutes, isWeekend, getDay } from 'date-fns';


import { enGB, } from 'date-fns/locale'


import dateformat from 'dateformat';

import Fade from "react-reveal/Fade";
import Alert from "@material-ui/lab/Alert";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Button } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


class UTCUtils extends DateFnsUtils {

  locale = enGB;
  // format(date, formatString) {
  //   return format(new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 ), formatString,enGB);
  // }

  // getCalendarHeaderText(date){
  //   return dateformat(date, 'mmmm yyyy');
  // }

  // getDayText(date)
  // {
  //   return dateformat(date, 'd');
  // }

}


const useStyles = makeStyles((theme) => ({

  loadingBox: {

  },

  title: {
    color: theme.palette.primary.main,
    marginBottom: "20px",
    fontWeight: "500"
  }

}));




export default function DateForm() {
  const classes = useStyles();

  const [state, setState] = React.useContext(GlobalState);

  const [firstAvailableDay, setFirstAvailableDay] = React.useState(null);
  const [fullyBookedDays, setFullyBookedDays] = React.useState(null);

  const [bookingDate, setBookingDate] = React.useState(state.bookingDate);


  const [dataLoaded, setDataLoaded] = React.useState(false);

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (close) => {
    if (close)
    {
      setOpenDialog(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    setState(state => ({ ...state, showNext: state.bookingDate ? true : false }))
  }, []);

  useEffect(() => {
    setState(state => ({ ...state, showNext: state.bookingDate ? true : false }))
  }, [state.bookingDate]);



  const LoadData = () => {

    const promise1 = TimeService.getFirstAvailableDate();
    const promise2 = TimeService.getFullyBookedDates();

    Promise.all([promise1, promise2]).then((values) => {
      let firstday = new Date((values[0].data).date);
      firstday.setHours(0, 0, 0, 0);

      firstday = new Date(firstday.getTime() - firstday.getTimezoneOffset() * 60 * 1000);

      setFirstAvailableDay(firstday);
      if (!state.bookingDate) {
        dateChanged(firstday);
      }

      setFullyBookedDays(values[1].data);

      setDataLoaded(true);

    }).catch((err) => {
      console.log(err);
    });
  }



  useEffect(() => {
    LoadData();
    if (state.package.text.toUpperCase().indexOf("ELITE") > 0)
    {
      setOpenDialog(true)
    }

  }, []);



  const dateChanged = (date) => {
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    // const offset = parseInt(date.getTimezoneOffset());
    // console.log(offset);

    date = new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000));
    // date = new Date(date.getFullYear(), date.getMonth(), date.getDate(),0,0,0,0);

    // date = format(date, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'Europe/London' }) ; // 2014-10-25 10:46:20 GMT 00
    // date = toDate(date);
    console.log(date);
    setBookingDate(date);
    setState(state => ({ ...state, bookingDate: date }));
  }

  const checkFullyBooked = (date) => {
    var result = false;

    if (getDay(date) === 0 || getDay(date) === 6)
      return true

    const today = new Date()
    // const twoDaysAfter = new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)

    // if (date.getTime() < twoDaysAfter.getTime())
    // {
    //   return true
    // }


    if (dateformat(date, 'yyyy-mm-dd') === dateformat(today, 'yyyy-mm-dd')) {
      return true;
    }



    if (dateformat(date, 'yyyy-mm-dd') < dateformat(firstAvailableDay, 'yyyy-mm-dd')) {
      return true;
    }

    else if (fullyBookedDays && fullyBookedDays.length > 0) {
      for (var i = 0; i < fullyBookedDays.length; i++) {
        if (dateformat(new Date(fullyBookedDays[i]), 'yyyy-mm-dd') === dateformat(date, 'yyyy-mm-dd')) {
          result = true;
        }
      }

      return result;
    }
    else {
      return false;
    }
  }

  return (

    <React.Fragment>

      <Typography variant="h5" gutterBottom className={classes.title}>
        Pick a Date
      </Typography>

      {(dataLoaded && firstAvailableDay) ? (

        <React.Fragment>

          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >

            <BrowserView>
              <MuiPickersUtilsProvider utils={UTCUtils} locale={enGB}>
                <DatePicker autoOk
                  disablePast={true}
                  openTo="date"
                  orientation="landscape"
                  variant="static"
                  fullWidth
                  value={bookingDate}
                  onChange={dateChanged}
                  shouldDisableDate={checkFullyBooked}
                />
              </MuiPickersUtilsProvider>
            </BrowserView>

            <MobileView>
              <MuiPickersUtilsProvider utils={UTCUtils} locale={enGB}>
                <DatePicker autoOk
                  disablePast={true}
                  openTo="date"
                  variant="static"
                  fullWidth
                  value={bookingDate}
                  onChange={dateChanged}
                  shouldDisableDate={checkFullyBooked}
                />
              </MuiPickersUtilsProvider>
            </MobileView>
          </Grid>

        </React.Fragment>
      )
        :
        (
          <React.Fragment>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >

              <Skeleton variant="text" width={'80%'} />
              <Skeleton variant="text" width={'80%'} />
              <Skeleton variant="rect" width={'80%'} height={220} />

            </Grid>
          </React.Fragment>
        )
      }


      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleCloseDialog(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"NOTICE"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div style={{
              color:"#111",
             fontWeight:"400",
             textAlign: "justify"
             }}
             >

              <p>Thank you for booking an <b>Elite health screen</b>. Please proceed through the booking process, selecting when you would ideally like your medical. Due to the detailed nature of the service, we need to confirm a few details with you prior to arranging all of the services with our partner hospitals, and this might mean that we need to change the date or time of your appointment. </p>

              <p>As such, we will call you on the number you have provided during working hours to confirm all the details of your service prior to finalising your appointment, following which confirmation will be sent to you via email. </p>

              <p style={{fontWeight:"500"}}>Thank you for making your booking.</p>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog(true)} color="primary">
            AGREE
          </Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
}





function EquallDates(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
