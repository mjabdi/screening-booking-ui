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

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({

}));

export default function SmartEntryForm() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const getComponentFromStateAndParameters = (_state) => {
    const parametersMap = _state.parametersMap
    if (!parametersMap.get("cat")) {
      if (!_state.cat || _state.activeStep === 0) {
        return <CategoriesForm />
      }
      else if (_state.cat.key === "health" && _state.activeStep === 1) {
        return <HealthGenderForm />
      }
    }


    return null
  }

  return (
    <React.Fragment>
      {getComponentFromStateAndParameters(state)}
      {state.activeStep > 0 && (
        <div style={{marginTop:"10px"}}>
          <Divider/>
        <div style={{ width: "100%", display: "flex", alignItems: "flex-start", paddingTop: "10px" }}>          
          <Button startIcon={<ArrowBackIosIcon/>} variant="outlined" color="primary" onClick={() => setState(state => ({ ...state, activeStep: state.activeStep - 1 }))}>
            {`Back`}
         </Button>
        </div>

       </div> 

      )}
    </React.Fragment>
  );
}