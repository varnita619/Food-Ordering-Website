import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "../../FetchNodeServices";
const useStyles = makeStyles({
  root: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
},
subdiv:{width: 550,
  padding: 20,
  marginTop: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
},
  card: {
    border: "1px solid #bdc3c7",
    
  },
  cardactionarea: {
    borderBottom: "1px solid #bdc3c7",
    borderTop: "2px solid #bdc3c7",
  },
  cardmedia: {
    borderBottom: "1px solid #bdc3c7",
  },
});
function Page2(props) {
  const classes = useStyles();
  var restaurant = useSelector((state) => state.restaurant);
  var rest = Object.values(restaurant)[0];

  var client = useSelector((state) => state.client);
  var user = Object.values(client)[0];
  var history = useHistory();
  var cart = useSelector((state) => state.cart);
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
    description: "some description",
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

  //const { classes } = props;

  const handleCashOnDelivery = () => {
    //history.push({'pathname':'/page2'})
    handleOrderSubmit("Cash On Delivery", "none", "none");
  };

  const handleOnLinePayment = () => {
    //    history.push({ pathname: "/paymentgateway" });
    openPayModal();
  };

  const handleOrderSubmit = async (
    paymentmode,
    paymentstatus,
    transationid
  ) => {
    var date = new Date();
    var cd =
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    var ct =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var body = {
      orderdate: cd,
      ordertime: ct,
      mobileno: user.mobileno,
      emailid: user.emailid,
      totalamt: totalamt,
    };
    var result = await postData("orders/generateorder", body);
    alert(result.result + "," + result.orderid);
    if (result.result) {
      body = {
        orderid: result.orderid,
        orderdate: cd,
        ordertime: ct,
        mobileno: user.mobileno,
        emailid: user.emailid,
        totalamt: totalamt,
        deliverystatus: "pending",
        paymentstatus: paymentstatus,
        paymentmode: paymentmode,
        restaurantid: rest.restaurant_id,
        deliverat: user.deliveryat,
        cart: values,
      };
      var orderstatus = await postData("orders/submitorder", body);
      alert(orderstatus.result);
    }
  };

  return (
    <div>
      <Header history={props.history} />

      <div className={classes.root}>
        <div className={classes.subdiv}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardActionArea className={classes.cardactionarea}>
                  <CardMedia
                    className={classes.cardmedia}
                    component="img"
                    alt="Cash on Delivery"
                    image="/cod.jpg"
                    title="Cash on Delivery"

                  />
                </CardActionArea>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleCashOnDelivery()}
                    style={{background:'#006266'}}
                  >
                    Cash on Delivery
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardActionArea className={classes.cardactionarea}>
                  <CardMedia
                    className={classes.cardmedia}
                    component="img"
                    alt="Online Payment"
                    image="/online-payment.jpg"
                    title="Online Payment"
                    style={{ padding: 50 }}
                  />
                </CardActionArea>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleOnLinePayment()}
                    style={{background:'#006266'}}
                  >
                    Online Payment
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Page2;
