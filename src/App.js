import './App.css';
import Checkout from './checkout';
import WelcomeForm from './WelcomeForm';
import AgreementForm from './AgreementForm';
import GlobalState from './GlobalState'; 
import React, { useEffect } from 'react';
import BookService from './services/BookService';
import theme from "./theme";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { getCatText, getPackageByIndex } from './ScreeningPackageLoader';


function App() {
  const [state, setState] = React.useState({activeStep : 0});

  
  useEffect(() => {
    loadParametersFromUrl()
  }, [])

  const loadParametersFromUrl = () =>
  {
    const query = window.location.search.substr(1)
    const map = new Map()
    if (query && query.length > 0)
    {
      const querySplit = query.split("&");
      querySplit.forEach(e => {
        if (e.indexOf("=") > 0)
        {
          const key = e.substr(0,e.indexOf("="))
          const value = e.substr(e.indexOf("=") + 1)
          map.set(key,value)
        }
      })
    }

    console.log(map)

    const _state = {
      cat: {key: map.get("cat"), text: getCatText(map.get("cat"))},
      age: map.get("age"), 
      gender: map.get("gender")
    }

    setState(state => ({...state,
                         parametersMap : map, 
                         urlRead: true,
                         cat: {key: map.get("cat"), text: getCatText(map.get("cat")) } ,
                         age: map.get("age"),
                         gender: map.get("gender"),
                         destination: map.get("destination"),
                         packageIndex: parseInt(map.get("package")),
                         activeStep: calculateActiveStep(map.get("cat"),map.get("age"),map.get("gender"),parseInt(map.get("package")),map.get("destination")),
                         minActiveStep : calculateActiveStep(map.get("cat"),map.get("age"),map.get("gender"),parseInt(map.get("package")),map.get("destination")),
                         package: getPackageByIndex(parseInt(map.get("package")), _state)
                      }))
 }

 const calculateActiveStep = (cat, age, gender, packageIndex, destination) =>
 {
    if (cat === "health")
    {
      if (age && gender && !packageIndex)
      {
        return 2
      }else if (!packageIndex) {
        return 1
      }else if (packageIndex){
        return 3
      }
    }else if (cat === "allergy")
    {
      if (packageIndex > 0)
      {
        return 2
      }else
      {
        return 1
      }
    }else if (cat === "visa")
    {
      if (destination && destination.length > 1)
      {
        return 2
      }else
      {
        return 1
      }

    }
    else if (cat)
    {
      return 1
    } 

   return 0
 }

  return (
    <GlobalState.Provider value={[state, setState]}>
            <MuiThemeProvider theme={theme}>
        <CssBaseline />

      <div className="App">

       {state.urlRead && <WelcomeForm />}  
       
      </div>
      </MuiThemeProvider>
    </GlobalState.Provider>
  );
}

export default App;
