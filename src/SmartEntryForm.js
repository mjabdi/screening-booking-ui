import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GlobalState from "./GlobalState";
import klarnaImage from "./images/klarna.png";
import Alert from "@material-ui/lab/Alert";
import { Backdrop, CircularProgress, Grid } from "@material-ui/core";
import CategoriesForm from "./CategoriesForm";
import HealthGenderForm from "./HealthGenderFrom";
import KlarnaPaymentButton from "./KlarnaComponent";
import PaymentService from "./services/PaymentService";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Divider from "@material-ui/core/Divider";
import ScreenPackagesForm from "./ScreenPackagesForm";
import DateForm from "./DateForm";
import TimeForm from "./TimeForm";
import InformationForm from "./InformationForm";
import ReviewForm from "./ReviewForm";
import ChooseCountryForm from "./ChooseCountryForm";
import BookService from "./services/BookService";
import dateformat from "dateformat";
import ResultsForm from "./ResultsForm";
import PayForm from "./PayForm";
import ReviewFormNoDeposit from "./ReviewFormNoDeposit";
import ResultsFormNoDeposit from "./ResultsFormNoDeposit";

const useStyles = makeStyles((theme) => ({
  submitButton: {
    backgroundColor: "#d43500",
    transition: "all 0.3s ease",
    minWidth: "100px",
    "&:hover": {
      backgroundColor: "#ed3b00",
    },
  },
  submitButton2: {
    backgroundColor: "#ffffff",
    color: "#000000",
    fontSize: "12px",
    transition: "all 0.3s ease",
    minWidth: "100px",
    boxShadow: "none",
    textShadow: "none",
    border: "1.5px solid #296AB7",
    borderRadius: "100rem",
    flexGrow: 1,
    "&:hover": {
      backgroundColor: "#ffffff",
    },
  },
  submitButton3: {
    backgroundColor: "#296AB7",
    color: "#ffffff",
    fontSize: "12px",
    transition: "all 0.3s ease",
    minWidth: "100px",
    boxShadow: "none",
    textShadow: "none",
    borderRadius: "100rem",
    flexGrow: 1,
    "&:hover": {
      backgroundColor: "#296AB7",
    },
  },
  submitButton4: {
    backgroundColor: "#FFA8CD",
    color: "#000000",
    fontSize: "12px",
    transition: "all 0.3s ease",
    minWidth: "100px",
    boxShadow: "none",
    textShadow: "none",
    borderRadius: "100rem",
    flexGrow: 1,
    "&>.MuiButton-label": {
      display: "flex",
      gap: "6px",
      alignItems: "center",
    },
    "&:hover": {
      backgroundColor: "#FFA8CD",
    },
  },
  backdrop: {
    zIndex: 999,
    color: "#fff",
  },
}));

export default function SmartEntryForm() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();

  const [submiting, setSubmiting] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // window.Klarna.Payments.Buttons.init({
    //   client_id:
    //     "klarna_live_client_MVhxRjNHQSVGJFZFek1tVThKV1RxbCVBb2l1N2wvclosZWU3MWRmNGEtYTE4Ny00ZjMzLWE3MmQtMTJkZGZmODkzYzZiLDEsSFE4UzcybWxYZGRGekJNM1NTTXc5ZnFkL01JOTlNZytNR0RRZXRnQTdLcz0",
    // }).load(
    //   {
    //     container: "#container-klarna",
    //     theme: "default",
    //     shape: "default",
    //     on_click: (authorize) => {
    //       // Here you should invoke authorize with the order payload.
    //       authorize(
    //         { collect_shipping_address: true },
    //         {
    //           purchase_country: "GB",
    //           purchase_currency: "GBP",
    //           locale: "en-GB",
    //           billing_address: {
    //             given_name: "Test",
    //             family_name: "Person-uk",
    //             email: "customer@email.uk",
    //             street_address: "13 New Burlington St",
    //             street_address2: "Apt 214",
    //             postal_code: "W13 3BG",
    //             city: "London",
    //             region: "",
    //             phone: "01895808221",
    //             country: "GB",
    //           },
    //           order_amount: 1000,
    //           order_tax_amount: 0,
    //           order_lines: [
    //             {
    //               type: "physical",
    //               reference: "19-402",
    //               name: "Battery Power Pack",
    //               quantity: 1,
    //               unit_price: 1000,
    //               tax_rate: 0,
    //               total_amount: 1000,
    //               total_discount_amount: 0,
    //               total_tax_amount: 0,
    //               product_url: "https://www.estore.com/products/f2a8d7e34",
    //               image_url: "https://www.exampleobjects.com/logo.png",
    //             },
    //           ],
    //           //     customer: {
    //           //     date_of_birth: "1970-01-01",
    //           // },
    //         }, // order payload
    //         (result) => {
    //           // The result, if successful contains the authorization_token
    //         }
    //       );
    //     },
    //   },
    //   function load_callback(loadResult) {
    //     // Here you can handle the result of loading the button
    //   }
    // );

  }, []);

  const getPackageName = () => {
    if (state.cat.key === "visa") {
      let destination = state.destination;
      if (destination === "Other...") {
        destination = state.destinationText;
      }
      return `${state.cat.text.toUpperCase()} ${` ( ${destination.toUpperCase()} )`}`;
    } else {
      return `${state.cat.text.toUpperCase()} ${
        state.package ? ` / ${state.package.text.toUpperCase()}` : ""
      }`;
    }
  };

  // const submitForm = () => {
  //   var promiseArray = [];

  //   setSubmiting(true);

  //   BookService.getNewReference()
  //     .then((res) => {
  //       const ref = res.data.ref;

  //       setState((state) => ({ ...state, ref: ref }));

  //       let referrer = "/";

  //       const personInfo = {
  //         fullname: state.fullname,
  //         email: state.email,
  //         phone: state.phone,
  //         notes: state.notes,
  //         gender: state.gender,
  //         address: state.address,
  //         service: getPackageName(),
  //         birthDate: state.birthDate,
  //       };

  //       const promise = BookService.bookAppointment({
  //         ...personInfo,
  //         bookingDate: dateformat(
  //           new Date(state.bookingDate.toUTCString().slice(0, -4)),
  //           "yyyy-mm-dd"
  //         ),
  //         bookingTime: state.bookingTime,
  //         bookingRef: ref,
  //         referrer: referrer,
  //       });
  //       promiseArray.push(promise);

  //       Promise.all(promiseArray)
  //         .then((values) => {
  //           setState((state) => ({
  //             ...state,
  //             finalResults: values,
  //             activeStep: state.activeStep + 1,
  //             formDone: true,
  //           }));

  //           setSubmiting(false);
  //         })
  //         .catch((errs) => {
  //           console.log(`Error :  ${errs}`);
  //           setSubmiting(false);
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(`Cannot Get REF NO. : ${err}`);
  //       setSubmiting(false);
  //     });
  // };

  const getComponentFromState = (_state) => {
    console.log(_state);

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
    } else if (_state.cat.key === "weight_loss") {
      if (_state.activeStep === 1) {
        return <DateForm />;
      } else if (_state.activeStep === 2) {
        return <TimeForm />;
      } else if (_state.activeStep === 3) {
        return <InformationForm />;
      } else if (_state.activeStep === 4) {
        return <ReviewFormNoDeposit />;
      } else if (_state.activeStep === 5) {
        return <ResultsFormNoDeposit />;
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

    return null;
  };
  

  const submitNoDeposit = () => {
    var promiseArray = [];

    setSubmiting(true)

    BookService.getNewReference()
      .then((res) => {
        const ref = res.data.ref;

        setState((state) => ({ ...state, ref: ref }));

        let referrer = window.location.pathname;
        if (referrer && referrer.startsWith("/id")) {
          referrer = "/";
        }

        const personInfo = {
          fullname: state.fullname,
          email: state.email,
          phone: state.phone,
          notes: state.notes,
          gender: state.gender,
          address: state.address,
          service: getPackageName(),
          price: state.package?.price || '',
          birthDate: state.birthDate,      
          bookingDate: dateformat(
            new Date(state.bookingDate.toUTCString().slice(0, -4)),
            "yyyy-mm-dd"
          ),
          bookingTime: state.bookingTime,
          bookingRef: state.bookingRef,
          referrer: referrer,
          smsPush: state.smsPush
            };

        const promise = BookService.bookAppointment({
          ...personInfo,
          bookingDate: dateformat(
            new Date(state.bookingDate.toUTCString().slice(0, -4)),
            "yyyy-mm-dd"
          ),
          bookingTime: state.bookingTime,
          bookingRef: ref,
          referrer: referrer,
        });
        promiseArray.push(promise);

        Promise.all(promiseArray)
          .then((values) => {
            setState((state) => ({
              ...state,
              finalResults: values,
              activeStep: state.activeStep + 1,
              formDone: true,
            }));

            setSubmiting(false);
          })
          .catch((errs) => {
            console.log(`Error :  ${errs}`);
            setSubmiting(false);
          });
      })
      .catch((err) => {
        console.log(`Cannot Get REF NO. : ${err}`);
        setSubmiting(false);
      });
  };

  const klarnaClicked = async() => {
    const payload = {
      purchase_country: "GB",
      purchase_currency: "GBP",
      locale: "en-GB",
      order_amount: state.package.price * 100,
      order_tax_amount: 0,
      order_lines: [
        {
          name: state.package.text,
          quantity: 1,
          unit_price: state.package.price * 100,
          total_amount: state.package.price * 100,
        },
      ],
      merchant_urls: {
        // push: "https://test.travelpcrtest.com/api/push",
        // validation: "https://test.travelpcrtest.com/api/screening/payment/dopaymentusingklarna",
      },
    };
    const result = await PaymentService.createOrderOnKlarna(payload)
    console.log(result)
    // setState((state) => ({
    //   ...state,
    //   paymentMethod: "klarna",
    //   activeStep: state.activeStep + 1,
    // }));
  }
    

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={submiting}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {getComponentFromState(state)}
      {state.activeStep > 0 && !state.formDone && (
        <div style={{ marginTop: "10px" }}>
          <div>
            {state.cat.key === "health" && state.lastStep && (
              <Alert severity="info" icon={false}>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    marginBottom: ".5rem",
                  }}
                >
                  In order to secure your appointment you can either:
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "400",
                    textAlign: "start",
                  }}
                >
                  <div>
                    - Place a <b style={{ color: "red" }}>£100</b> deposit to
                    secure your appointment
                  </div>
                  <div>- Spread the cost and pay by instalments via Klarna</div>
                  <div>- Pay the full amount online </div>
                </div>
              </Alert>
            )}
            {state.showNext &&
              state.lastStep &&
              !state.formDone &&
              state.cat.key === "health" && (
                <div
                  style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    display: "flex",
                    gap: "1rem",
                  }}
                >
                  <Button
                    className={classes.submitButton2}
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      setState((state) => ({
                        ...state,
                        paymentMethod: "deposit",
                        activeStep: state.activeStep + 1,
                      }))
                    }
                  >
                    {"PAY £100 DEPOSIT ONLINE"}
                  </Button>
                  <Button
                    className={classes.submitButton3}
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      setState((state) => ({
                        ...state,
                        paymentMethod: "full",
                        activeStep: state.activeStep + 1,
                      }))
                    }
                  >
                    {"PAY FULL AMOUNT ONLINE"}
                  </Button>
                  {/* <Button
                    className={classes.submitButton4}
                    variant="contained"
                    onClick={() =>
                      klarnaClicked()
                    }
                  >
                    <div>{"PAY BY INSTALMENTS ONLINE"} </div>
                    <img
                      style={{ height: ".8rem" }}
                      src={klarnaImage}
                      alt="klarna"
                    />
                  </Button> */}
                  <KlarnaPaymentButton />
                </div>
              )}
          </div>

          <Divider />
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            style={{ width: "100%", paddingTop: "10px" }}
          >
            <Grid item>
              {state.activeStep > state.minActiveStep && (
                <Button
                  startIcon={<NavigateBeforeIcon />}
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    setState((state) => ({
                      ...state,
                      paymentMethod: "deposit",
                      activeStep: state.activeStep - 1,
                    }))
                  }
                >
                  {`Back`}
                </Button>
              )}
            </Grid>

            <Grid item>
              {state.showNext &&
                !state.lastStep &&
                !state.formDone &&
                !(
                  state.package?.key === "fertility_women" &&
                  !state.agreed_fertility
                ) && (
                  <Button
                    endIcon={<NavigateNextIcon />}
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      setState((state) => ({
                        ...state,
                        activeStep: state.activeStep + 1,
                      }))
                    }
                  >
                    {`Next`}
                  </Button>
                )}

              {state.showNext &&
                state.lastStep &&
                !state.formDone &&
                !(state.cat.key === "weight_loss") &&
                !(state.cat.key === "health") && (
                  <Button
                    className={classes.submitButton}
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      setState((state) => ({
                        ...state,
                        activeStep: state.activeStep + 1,
                      }))
                    }
                  >
                    {`Proceed To Payment`}
                  </Button>
                )}

              {state.showNext &&
                state.lastStep &&
                !state.formDone &&
                state.cat.key === "weight_loss" && (
                  <Button
                    className={classes.submitButton}
                    variant="contained"
                    color="primary"
                    onClick={() => submitNoDeposit()}
                  >
                    {`Submit`}
                  </Button>
                )}
            </Grid>
          </Grid>
        </div>
      )}

      {/* <Backdrop className={classes.backdrop} open={submiting}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
          <Grid item>
            <span style={{ textAlign: "center", color: "#fff" }}>
              {" "}
              Please wait ...{" "}
            </span>
          </Grid>
        </Grid>
      </Backdrop> */}
    </React.Fragment>
  );
}
