import React, { useEffect } from "react";
import GlobalState from "./GlobalState";
import dateformat from "dateformat";
import PaymentService from "./services/PaymentService";
const KlarnaPaymentButton = () => {
    const [state, setState] = React.useContext(GlobalState);

    const orderDetails = {
      intent: "buy",
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
      //   merchant_urls: {
      //     checkout:
      //       "https://test.travelpcrtest.com/api/screening/payment/dopaymentusingklarna",
      //     confirmation:
      //       "https://test.travelpcrtest.com/api/screening/payment/dopaymentusingklarna",
      //     terms:
      //       "https://test.travelpcrtest.com/api/screening/payment/dopaymentusingklarna",
      //     push: "https://test.travelpcrtest.com/api/screening/payment/dopaymentusingklarna",
      //     validation:
      //       "https://test.travelpcrtest.com/api/screening/payment/dopaymentusingklarna",
      //   },
    };
  useEffect(() => {
    window.scrollTo(0, 0);
    window.Klarna.Payments.Buttons.init({
      client_id:
      "klarna_test_client_aD9TdzY2dFJqYWR0OEpIa00qUipnYVYtODNMWFAtQS0sMjEwNTg0YmYtOTRmMC00NDgwLTkwYTktNjlkMDVhOTM4MTJjLDEsTjBHdXgwbVlUYmJhMm5FdGVGbVBPYUlRTktLY0c4K2ZRdjE5TWtTeWk4QT0",
        // "klarna_live_client_MVhxRjNHQSVGJFZFek1tVThKV1RxbCVBb2l1N2wvclosZWU3MWRmNGEtYTE4Ny00ZjMzLWE3MmQtMTJkZGZmODkzYzZiLDEsSFE4UzcybWxYZGRGekJNM1NTTXc5ZnFkL01JOTlNZytNR0RRZXRnQTdLcz0",
    }).load(
      {
        container: "#container-klarna",
        theme: "default",
        shape: "pill",
        on_click: (authorize) => {
          authorize(
            { collect_shipping_address: false },
            orderDetails,
            async (result) => {
              // The result, if successful contains the authorization_token
              console.log('result',result)

                const result2 = await PaymentService.createOrderOnKlarna(
                  result.authorization_token,
                  { personInfo: personInfo(), payment: orderDetails }
                );
                console.log(result2, result2.data);
                    setState((state) => ({
                      ...state,
                      finalResults: [result2],
                      activeStep: state.activeStep + 2,
                      formDone: true,
                    }));
            }
          );
        },
      },
      function load_callback(loadResult) {
        // Here you can handle the result of loading the button
        console.log('loadResult', loadResult);
      }
    );
     
  }, []);
    const getPackageName = () => {
      if (state.standalonePackage) {
        return state.package.text.toUpperCase();
      } else if (state.cat.key === "visa") {
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

  const personInfo = () => {
    let referrer = window.location.pathname;
    if (referrer && referrer.startsWith("/id")) {
      referrer = "/";
    }

    return {
      fullname: state.fullname,
      email: state.email,
      phone: state.phone,
      notes: state.notes,
      gender: state.gender,
      address: state.address,
      service: getPackageName(),
      price: state.package?.price || "",
      birthDate: state.birthDate,
      bookingDate: dateformat(
        new Date(state.bookingDate.toUTCString().slice(0, -4)),
        "yyyy-mm-dd"
      ),
      bookingTime: state.bookingTime,
      bookingRef: state.bookingRef,
      referrer: referrer,
      smsPush: state.smsPush,
    };
  };

  return (
    <div
      id="container-klarna"
      style={{ width: "250px" }}
    ></div>
  );
};

export default KlarnaPaymentButton;
