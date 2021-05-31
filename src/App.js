import './App.css';
import Checkout from './checkout';
import WelcomeForm from './WelcomeForm';
import AgreementForm from './AgreementForm';
import GlobalState from './GlobalState'; 
import React, { useEffect } from 'react';
import BookService from './services/BookService';
import theme from "./theme";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";



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

    setState(state => ({...state,
                         parametersMap : map, 
                         urlRead: true,
                         cat: {key: map.get("cat")} ,
                         age: map.get("age"),
                         gender: map.get("gender"),
                         packageUrl: map.get("package"),
                         activeStep: calculateActiveStep(map.get("cat"),map.get("age"),map.get("gender")) 
                      }))
 }

 const calculateActiveStep = (cat, age, gender, packageUrl) =>
 {
   if (!packageUrl)
   {
      if (cat === "health")
      {
        if (age && gender)
        {
          return 2
        }else {
          return 1
        }
      }else if (cat === "allergy")
      {
        return 1
      } 
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
