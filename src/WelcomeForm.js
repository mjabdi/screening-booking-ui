import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import GlobalState from './GlobalState';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import HttpsIcon from '@material-ui/icons/Https';

import {BrowserView, MobileView, isMobile} from 'react-device-detect';

import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import { Grid } from '@material-ui/core';

import logoImage from './images/logo.png';
import doctorImage from './images/doctor.png';

import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import faq from './FAQ';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {' '}
      <Link color="inherit" href="#">
           <strong> Medical Express Clinic </strong> 
      </Link>{isMobile ? ' ' : ' All rights reserved.' }
   
       
 
     
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: "#fff",
    color: "#00a1c5",
    alignItems: 'center',
  },

  logo: {
    maxWidth: 160,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },

  bold: {
    fontWeight: "800",
    padding: "5px"
  },

  doneImage: {
    width: "240px",
    height: "150px",
    margin: "20px"
  },

  logoImage: {
    width: "40px",
    height: "40px",
    marginLeft: "0px",
  },

  doctorImage: {
    width: "40px",
    height: "40px",
    marginRight: "10px",
  },

  privacyButton: {
    marginBottom : "20px",
    width: "115px"
  },

  faqButton: {
    marginBottom : "20px",
    marginLeft : "10px",
    // backgroundColor : "#2f942e",
    // "&:hover": {
    //   background: "green",
    //   color: "#fff"
    // },
    textDecoration : "none !important",
    width: "115px"

  },

  textContent : {
      color : "#666f77",
      fontSize : "1.1rem",
      textAlign: "left",
      paddingLeft: "30px",
      paddingRight: "30px",
      lineHeight: "2.2em",
      fontWeight : "400"
  },

  textContentMobile : {
    color : "#666f77",
    fontSize : "0.9rem",
    textAlign: "left",
    paddingLeft: "30px",
    paddingRight: "30px",
    lineHeight: "2.2em",
    fontWeight : "400"
},

  getStartedButton: {
      marginTop : "10px",
      marginBottom : "10px",

  },

  AirIcon : {
      marginRight : "10px",
      fontSize: "32px"
  },

  pageTitle:{
    color : theme.palette.primary.main,
    marginTop : "10px"
  }

}));




export default function WelcomeForm() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();


  //// ** Dialog

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const [openFAQ, setOpenFAQ] = React.useState(false);
  const [scrollFAQ, setScrollFAQ] = React.useState('paper');

  const descriptionElementRef = React.useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const descriptionElementRefFAQ = React.useRef(null);
  React.useEffect(() => {
    if (openFAQ) {
      const { current: descriptionElementFAQ } = descriptionElementRefFAQ;
      if (descriptionElementFAQ !== null) {
        descriptionElementFAQ.focus();
      }
    }
  }, [openFAQ]);


  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClickOpenFAQ = (scrollType) => () => {
    setOpenFAQ(true);
    setScrollFAQ(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseFAQ = () => {
    setOpenFAQ(false);
  };


const getStartedClicked = (event) => {
    setState(state => ({...state, getStarted: true}));
}

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid
            container
            direction="row"
            spacing={1}
            justify="center"
            alignItems="center"
          >
            <Grid item item xs={10}>
              <Typography
                style={{ fontWeight: "400" }}
                variant="h6"
                color="inherit"
                noWrap
              >
                Medical Express Clinic
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <img
                className={classes.logoImage}
                src={logoImage}
                alt="logo image"
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
         
          {state.firstname && state.firstname.length > 0 && (
            <div style={{textAlign:'center', fontSize:"1rem", marginBottom:"10px", color:"#777",backgroundColor:"#f7fbff",padding:"20px"}}>
                Welcome back <span style={{fontWeight:"500", color:"#333", fontStyle:"italic"}}>{state.firstname}</span>
            </div>
          )}

          <Typography
            style={{ fontWeight: 700, marginBottom: "50px" }}
            component="h1"
            variant="h6"
            align="center"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >

              <img
                className={classes.doctorImage}
                src={doctorImage}
                alt="doctor image"
              />
              
              <span className={classes.pageTitle}> 
                  Private GP in London - £150
              </span>
            </div>
          </Typography>

          <p
            className={
              isMobile ? classes.textContentMobile : classes.textContent
            }
          >
            -&nbsp; Flexible appointment for private GP services whenever you need.
          </p>

          <p
            className={
              isMobile ? classes.textContentMobile : classes.textContent
            }
          >
            -&nbsp; Highly Experienced Doctors.
          </p>

          <p
            className={
              isMobile ? classes.textContentMobile : classes.textContent
            }
          >
             -&nbsp; We are open seven days a week.
          </p>

          <p
            className={
              isMobile ? classes.textContentMobile : classes.textContent
            }
          >
             -&nbsp; No card details or payment necessary.
          </p>

          <p
            className={
              isMobile ? classes.textContentMobile : classes.textContent
            }
          >
             -&nbsp; Plans change and you may need to cancel or rearrange your
            appointment. We take payment for your visit only when you attend the
            clinic.
          </p>

          <Button
            variant="contained"
            className={classes.getStartedButton}
            color="primary"
            onClick={getStartedClicked}
            onTouchTap={getStartedClicked}
          >
            Get Started
          </Button>
        </Paper>

        <Button
          variant="contained"
          className={classes.privacyButton}
          color="secondary"
          startIcon={<HttpsIcon />}
          onClick={handleClickOpen("paper")}
          onTouchTap={handleClickOpen("paper")}
        >
          Privacy
        </Button>

        <Button
          variant="contained"
          className={classes.faqButton}
          color="secondary"
          startIcon={<LiveHelpIcon />}
          onClick={handleClickOpenFAQ("paper")}
          onTouchTap={handleClickOpenFAQ("paper")}
        >
          FAQ
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            Application Disclaimer
          </DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <div style={{ textAlign: "justify", padding: "10px" }}>
              Medical Express Clinic will not contact you for any other reason
                than to share your test results, and certificate if selected,
                via the email address provided. The information provided to us
                via this registration form is never shared with any other
                organisations, except when this is required by law. Information
                provided will never be used for marketing purposes, you cannot
                opt in. In the case of a notable health result, our doctor will
                call on the telephone number provided to inform you of your
                result and provide additional advice or guidance. If we cannot
                get hold of you, we will email you asking you to contact the
                clinic.
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openFAQ}
          onClose={handleCloseFAQ}
          scroll={scrollFAQ}
          aria-labelledby="scroll-dialog-title-FAQ"
          aria-describedby="scroll-dialog-description-FAQ"
        >
          <DialogTitle id="scroll-dialog-title">FAQ</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description-FAQ"
              ref={descriptionElementRefFAQ}
              tabIndex={-1}
            >
              <div style={{ textAlign: "justify", padding: "10px" }}>
                {faq.map((element) => (
                  <React.Fragment>
                    <p
                      style={{
                        borderLeft: "4px solid red",
                        background: "#eee",
                        fontWeight: "600",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        lineHeight: "30px",
                      }}
                    >
                      <span style={{ color: "red", fontSize: "24px" }}>
                        {" "}
                        Q.{" "}
                      </span>
                      {element.question}
                    </p>

                    <p
                      style={{
                        borderLeft: "4px solid #999",
                        background: "#fff",
                        fontWeight: "400",
                        color: "#555",
                        paddingLeft: "10px",
                        paddingRight: "30px",
                        lineHeight: "50px",
                      }}
                    >
                      <span style={{ color: "#555", fontSize: "24px" }}>
                        {" "}
                        A.{" "}
                      </span>
                      {element.answer}
                    </p>
                  </React.Fragment>
                ))}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFAQ} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Copyright />
      </main>
    </React.Fragment>
  );
}