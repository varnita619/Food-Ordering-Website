import React, { Component, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
// import { postData } from '../../FetchService';

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
  margin: {
    marginRight: "80%",
    paddingLeft: "",
  },
  button: {
    margin: theme.spacing.unit,
  },

  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const PaymentGateway = (props) => {
  var dispatch = useDispatch();
  var cart = useSelector((state) => state.cart);
  var client = useSelector((state) => state.client);
  var user = Object.values(client)[0];
  var keys = Object.keys(cart);
  var values = Object.values(cart);
  var totalamt = values.reduce(calculate, 0);
  function calculate(prev, item) {
    var price =
      item.offer == 0
        ? item.qtydemand * item.price
        : item.qtydemand * item.offer;
    return prev + price;
  }
 
  const [getUserData, setUserData] = useState(user);

  
  const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: 1000, //  = INR 1
    name: "HOTEL NAME",
    description: 'some description',
    image:
      "https://i.pinimg.com/originals/d1/d2/66/d1d26618a7876afa7b99f2afebf6c790.jpg",
    handler: function (response) {
         
        alert(response.razorpay_payment_id);
    },
    prefill: {
      name: getUserData.firstname + " " + getUserData.lastname,
      contact: getUserData.mobileno,
      email: getUserData.emailid,
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "blue",
      hide_topbar: false,
    },
  };

  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const { classes } = props;

  return (
    <>
      <center>
        <Button
          variant="contained"
          color="primary"
          // size="large"
          // className={classes.button}
          onClick={openPayModal}
        >
          <h3>Proceed to Pay</h3>
        </Button>
      </center>
    </>
  );
};
export default withStyles(styles)(PaymentGateway);