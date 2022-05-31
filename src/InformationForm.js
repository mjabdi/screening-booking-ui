import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";
import GlobalState from "./GlobalState";
import * as EmailValidator from "email-validator";


import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import PersonsBox from "./PersonsBox";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import AntiBodyComponent from "./AntiBodyComponent";

import { format, addMinutes } from "date-fns";

import dateformat from "dateformat";
import { enGB } from "date-fns/locale";
import DateField from "./DateField";

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
  formControl: {
    textAlign: "left",
  },

  FormTitle: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  Box: {
    backgroundColor: "#f1f1f1",
    padding: "10px",
    //maxWidth: "300px",
    borderRadius: "10px",
    boxShadow: "2px 4px #ddd",
    marginTop: "5px",
    marginBottom: "15px",
    textAlign: "left",
  },

  pageTitle: {
    color: theme.palette.primary.main,
    marginBottom: "15px",
  },
}));

export default function InformationForm() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);
  const [fullname, setFullname] = React.useState(state.fullname ?? "");
  const [email, setEmail] = React.useState(state.email ?? "");
  const [birthDate, setBirthDate] = React.useState(state.birthDate ?? "");
  const [retypeEmail, setRetypeEmail] = React.useState(state.retypeEmail ?? "");
  const [emailConfirmed, setEmailConfirmed] = React.useState(
    state.emailConfirmed ?? false
  );

  const [phone, setPhone] = React.useState(state.phone ?? "");

  const [notes, setNotes] = React.useState(state.notes ?? "");

  const [gender, setGender] = React.useState(state.gender ?? "");

  const notesChanged = (event) => {
    setNotes(event.target.value);
    setState((state) => ({ ...state, notes: event.target.value }));
    setState((state) => ({ ...state, notesError: false }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const isValid = validateForm()
    setState(state => ({...state, showNext: isValid ? true : false}))

  }, []);

  useEffect(() => {
    const isValid = validateForm()
    setState(state => ({...state, showNext: isValid ? true : false}))
  }, [fullname, phone, email, retypeEmail, birthDate, gender]);


  const emailConfirmedChanged = (event) => {
    setEmailConfirmed(event.target.checked);
    setState((state) => ({ ...state, emailConfirmed: event.target.checked }));
    setState((state) => ({ ...state, emailConfirmedError: false }));
  };

  const fullnameChanged = (event) => {
    setFullname(event.target.value);
    setState((state) => ({ ...state, fullname: event.target.value }));
    if (event.target.value && event.target.value.trim().length > 0) {
      setState((state) => ({ ...state, fullnameError: false }));
    }
  };

  const emailChanged = (event) => {
    setEmail(event.target.value);
    setState((state) => ({ ...state, email: event.target.value }));
    if (event.target.value && EmailValidator.validate(event.target.value)) {
      setState((state) => ({ ...state, emailError: false }));
    }
  };

  const genderChanged = (event) => {
    setGender(event.target.value);
    setState((state) => ({ ...state, gender: event.target.value }));
    if (event.target.value) {
      setState((state) => ({ ...state, genderError: false }));
    }
  };

  const retypeEmailChanged = (event) => {
    setRetypeEmail(event.target.value);
    setState((state) => ({ ...state, retypeEmail: event.target.value }));
    if (event.target.value && EmailValidator.validate(event.target.value)) {
      setState((state) => ({ ...state, retypeEmailError: false }));
    }
  };

  const phoneChanged = (event) => {
    setPhone(event.target.value);
    setState((state) => ({ ...state, phone: event.target.value }));
    if (event.target.value && event.target.value.trim().length >= 6) {
      setState((state) => ({ ...state, phoneError: false }));
    }
  };

  const birthDateChanged = (value) => {
    setBirthDate(value);
    setState((state) => ({ ...state, birthDate: value }));
    if (value && value.trim().length >= 6) {
      setState((state) => ({ ...state, birthDateError: false }));
    }
  };



  const validateForm = () =>
  {
    let error = false

    if (!state.fullname || state.fullname.trim().length < 1)
    {
      setState(state => ({...state, fullnameError : true}));
      error = true;
    }
    if (!state.email || !EmailValidator.validate(state.email))
    {
      setState(state => ({...state, emailError : true}));
      error = true;
    }

    if (!state.retypeEmail || !EmailValidator.validate(state.retypeEmail) || state.email !== state.retypeEmail)
    {
      setState(state => ({...state, retypeEmailError : true}));
      error = true;
    }

    if (!state.phone || state.phone.trim().length < 1)
    {
      setState(state => ({...state, phoneError : true}));
      error = true;
    }

    if (!state.birthDate || state.birthDate.trim().length < 10)
    {
      setState(state => ({...state, birthDateError : true}));
      error = true;
    }

    if (!state.gender)
    {
      setState(state => ({...state, genderError : true}));
      error = true;
    }



  
    return !error;   
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className={classes.pageTitle}>
        Enter your Info
      </Typography>

      <Grid
        container
        spacing={2}
        alignItems="baseline"
        style={{ marginTop: "10px" }}
      >
        <Grid item xs={12} md={6}>
          <TextField
            error={state.fullnameError ? true : false}
            required
            id="fullname"
            label="Full Name"
            fullWidth
            autoComplete="name"
            value={fullname}
            onChange={fullnameChanged}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            error={state.phoneError ? true : false}
            required
            id="phone"
            label="Phone Number"
            fullWidth
            autoComplete="tel"
            value={phone}
            onChange={phoneChanged}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            error={state.emailError ? true : false}
            required
            id="email"
            label="Email Address"
            fullWidth
            autoComplete="email"
            type="email"
            value={email}
            onChange={emailChanged}
            // helperText = 'This email address is where you will receive your results. Please tick the box below to confirm that this is a private email address to which you are happy for us to send your results.'
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            error={state.retypeEmailError ? true : false}
            required
            id="retypeEmail"
            label="Retype Email Address"
            fullWidth
            autoComplete="email"
            type="email"
            value={retypeEmail}
            onChange={retypeEmailChanged}
            // helperText = 'This email address is where you will receive your results. Please tick the box below to confirm that this is a private email address to which you are happy for us to send your results.'
          />
        </Grid>

        <Grid xs={12} style={{marginTop:"10px"}}>
           <DateField
                error={state.birthDateError ? true : false}
                title="Date of Birth"
                value={birthDate}
                dateChanged={birthDateChanged}
             >

             </DateField>
        </Grid>

        <Grid item xs={12} md={12}>
          <FormControl required fullWidth>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              error={state.genderError ? true : false}
              required
              labelId="gender-label"
              id="gender-select"
              value={gender}
              onChange={genderChanged}
            >
              <MenuItem value={"M"}>{`Male`}</MenuItem>
              <MenuItem value={"F"}>{`Female`}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12} className={classes.formControl} >
          <FormControlLabel className={classes.formControl}  style={ {color: state.emailConfirmedError ? "red" : ''}} 
            control={<Checkbox className={classes.formControl} style={ {color: state.emailConfirmedError ? "red" : ''}}  color="secondary" name="emailConfirmCheckBox" checked={emailConfirmed} onChange={emailConfirmedChanged} />}
             label={<span style={{ fontSize: '0.8rem' }}>{`I confirm that this is a private email address to which I am happy for you to send my results.`} </span>}
          />
          <p>{'* Please take care when entering your information, and double check that everything entered on this form is correct.'}</p>
        </Grid> */}

        <Grid item xs={12}>
          <TextField
            style={{ marginTop: "10px" }}
            id="notes"
            // error={state.notesError && state.package === "Others"}
            fullWidth
            // required={state.package === "Others"}
            label="Notes (optional)"
            value={notes}
            onChange={notesChanged}
            multiline
            rows={4}
            placeholder="please enter your note here..."
            variant="outlined"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
