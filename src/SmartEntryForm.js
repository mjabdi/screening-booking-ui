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
const useStyles = makeStyles((theme) => ({

}));

export default function SmartEntryForm() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const getComponentFromStateAndParameters = () =>
  {
    const parametersMap = state.parametersMap
    console.log(parametersMap.get("cat"))
    if (!parametersMap.get("cat")){
      return <CategoriesForm/>
    }else
    {
      return null
    }
  }

  return (
    <React.Fragment>
        {getComponentFromStateAndParameters()}      
   </React.Fragment>
  );
}