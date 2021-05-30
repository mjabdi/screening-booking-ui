import * as EmailValidator from 'email-validator';

export default function ValidateStep (state,setState, step) 
  {
    var error = false;

    if (step === 0)
    {
      if (!state.bookingDate || !state.bookingDate.getTime())
      {
        setState(state => ({...state, bookingDateError : true}));
        error = true;
      }
    }
    if (step === 1)
    {
      /// Validate time
      
      if (!state.bookingTime)
      {
        setState(state => ({...state, bookingTimeError : true}));
        error = true;
      }
    } else if (step === 2){
      ///validate Basic Info
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
    }

      return !error;   
  }