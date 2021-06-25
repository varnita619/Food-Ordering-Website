import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Header from "./Header";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ServerURL, postData } from "../../FetchNodeServices";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { Button, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

////////////////DRAWER///////////
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";

//////////////////////////////////
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  list: {
    width: 350,
  },
  fullList: {
    width: "auto",
  },
}));
export default function MakePayment(props) {
  const classes = useStyles();

  const [refresh, setRefresh] = useState(false);
  var cart = useSelector((state) => state.cart);
  var client = useSelector((state) => state.client);
  var user = Object.values(client)[0];
  var keys = Object.keys(cart);
  var values = Object.values(cart);
  var totalamt = values.reduce(calculate, 0);
  var totalsaving = values.reduce(totaloffer, 0);
  var dispatch = useDispatch();

  /////////////////////DRAWER///////////////////
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState("");
  const [zipcode, setZipcode] = useState("");

  const handleAddAddress = async () => {
    var body = {
      address1: address1,
      address2: address2,
      state: states,
      city: city,
      zipcode: zipcode,
      mobileno: user.mobileno,
    };
    var result = await postData("userdetails/updateuserdetails", body);
    if (result.result) {
      var body = { mobileno: user.mobileno };
      var res = await postData("userdetails/chkusermobileno", body);

      if (res.result) {
        dispatch({
          type: "ADD_CLIENT",
          payload: [res.data.mobileno, res.data],
        });
        setRefresh(!refresh);
      }
    } else {
      alert("Fail to Save Address...");
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <Grid container spacing={1} style={{ padding: 10 }}>
        <Grid item xs={12}>
          <h4>{user.firstname}</h4>
          <h5>Add your address..</h5>
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(event) => setAddress1(event.target.value)}
            fullWidth
            variant="outlined"
            label="Address Line One"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            onChange={(event) => setAddress2(event.target.value)}
            fullWidth
            variant="outlined"
            label="Address Line Two"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            onChange={(event) => setStates(event.target.value)}
            fullWidth
            variant="outlined"
            label="State"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            onChange={(event) => setCity(event.target.value)}
            fullWidth
            variant="outlined"
            label="City"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(event) => setZipcode(event.target.value)}
            fullWidth
            variant="outlined"
            label="Zipcode"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleAddAddress()}
            color="primary"
          >
            Save Address
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  ////////////////////////////////////////////////////

  function calculate(prev, item) {
    var price =
      item.offer == 0
        ? item.qtydemand * item.price
        : item.qtydemand * item.offer;
    return prev + price;
  }

  function totaloffer(prev, item) {
    var price =
      item.offer > 0 ? (item.price - item.offer) * item.qtydemand : item.offer;
    return prev + price;
  }

  var netamount = totalamt;

  const paymentDetails = () => {
    return (
      <div style={{ width: 600 }}>
        <div
          style={{
            padding: 15,
            background: "#FFF",
            display: "flex",
            flexDirection: "column",
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Delivery Address
          </div>
          <div style={{ fontWeight: 200, marginBottom: 10 }}>
            {user.firstname} {user.lastname}
          </div>
          <div>
            {!user.addressstatus ? (
              <Button
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 10,
                  width: 200,
                }}
                variant="contained"
                onClick={toggleDrawer("right", true)}
                color="primary"
              >
                Add Address
              </Button>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>{user.address1}</div>
                <div>{user.address2}</div>
                <div>
                  {user.city},{user.state},{user.zipcode}
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            background: "#FFF",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: 2,
              fontWeight: "bold",
              marginTop: 10,
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Payment Details
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                fontWeight: 200,
                marginBottom: 10,
                textAlign: "left",
                padding: 5,
              }}
            >
              M.R.P
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,

                padding: 5,
                textAlign: "right",
                marginLeft: "auto",
              }}
            >
              &#8377; {totalamt + totalsaving}
            </div>
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                fontWeight: 200,
                marginBottom: 10,

                padding: 5,
              }}
            >
              Product Discount
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,

                padding: 5,
                textAlign: "right",
                marginLeft: "auto",
              }}
            >
              &#8377; {totalsaving}
            </div>
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                fontWeight: 200,
                marginBottom: 10,

                padding: 5,
              }}
            >
              Delivery Charges
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,

                padding: 5,
                textAlign: "right",
                marginLeft: "auto",
              }}
            >
              &#8377; {0}
            </div>
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                fontWeight: 200,
                marginBottom: 10,

                padding: 5,
              }}
            >
              Total Amount
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,

                padding: 5,
                textAlign: "right",
                marginLeft: "auto",
              }}
            >
              &#8377; {netamount}
            </div>
          </div>
          <Divider />
        </div>

        <div style={{ marginTop: 10 }}>
          <Button
            variant="contained"
            onClick={() => props.history.push({ pathname: "/page1" })}
            olor="primary"
            variant="contained"
            fullWidth
            style={{ background: "#006266", color: "#FFF" }}
          >
            Make Payment
          </Button>
        </div>
      </div>
    );
  };

  const showFoodCart = () => {
    return values.map((items) => {
      return (
        <>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              src={`${ServerURL}/images/${items.fooditemimage}`}
              style={{ borderRadius: 5 }}
              width="90"
              height="90"
              style={{ paddingRight: 10 }}
            />

            <div
              style={{ display: "felx", width: 500, flexDirection: "column" }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {items.fooditem}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {items.offer > 0 ? (
                  <span>
                    <s>&#8377; {items.price}</s>
                    <div style={{ fontWeight: "bold", fontSize: 14 }}>
                      {items.offertype} &#8377; {items.offer} X{" "}
                      {items.qtydemand}
                    </div>
                  </span>
                ) : (
                  <span style={{ fontWeight: "bold", fontSize: 14 }}>
                    &#8377; {items.price} X {items.qtydemand}
                  </span>
                )}
              </div>
              <div style={{ fontWeight: 800, color: "green" }}>
                {items.offer > 0 ? (
                  <div>You Save &#8377; {items.price - items.offer}</div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>

            <div>
              {items.offer == 0 ? (
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    width: 100,
                    textAlign: "right",
                  }}
                >
                  &#8377; {items.price * items.qtydemand}
                </div>
              ) : (
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    width: 100,
                    textAlign: "right",
                  }}
                >
                  &#8377; {items.offer * items.qtydemand}
                </div>
              )}
            </div>
          </div>

          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        </>
      );
    });
  };

  return (
    <div style={{ background: "#ecf0f1" }}>
      <Header history={props.history} />
      <div style={{ padding: 25 }}>
        <Grid container spacing={1}>
          <Grid
            items
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <img src="/fillcart.png" width="40" style={{ padding: 5 }} />
            <span style={{ fontWeight: "bold", fontSize: 20 }}>
              Order Summary ({keys.length})
            </span>
          </Grid>

          <Grid items xs={12} md={6} sm={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#FFF",
                borderRadius: 2,
                padding: 10,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <div style={{ fontSize: 20, fontWeight: "bold", width: 300 }}>
                  ({keys.length}) Items
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "right",
                    width: 300,
                  }}
                >
                  &#8377; {netamount}
                </div>
              </div>

              {showFoodCart()}
            </div>
          </Grid>

          <Grid items xs={12} md={6} sm={6}>
            <div
              style={{
                display: "flex",

                // background: "#FFF",
                borderRadius: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {paymentDetails()}
            </div>
          </Grid>
        </Grid>
      </div>
      {/*DRAWER */}
      <div>
        <React.Fragment key={"right"}>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </React.Fragment>
      </div>
    </div>
  );
}
