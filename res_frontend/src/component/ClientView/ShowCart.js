import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Header from "./Header";

import Grid from "@material-ui/core/Grid";
import QtySpinner from "./QtySpinner";

import { ServerURL } from "../../FetchNodeServices";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { Button, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));
export default function ShowCart(props) {
  const classes = useStyles();
  const [refresh, setRefresh] = useState(false);
  var cart = useSelector((state) => state.cart);
  var keys = Object.keys(cart);
  var values = Object.values(cart);
  var totalamt = values.reduce(calculate, 0);
  var totalsaving = values.reduce(totaloffer, 0);
  var dispatch = useDispatch();
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

  const handleChange = (value, item) => {
    item["qtydemand"] = value;
    dispatch({ type: "ADD_ITEM", payload: [item.fooditem_id, item] });
    setRefresh(!refresh);
  };
  const handleDelete = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item.fooditem_id });
    setRefresh(!refresh);
  };

  const handleProceedPayment = () => {
    props.history.push({ pathname: "/makepayment" });
  };
  const paymentDetails = () => {
    return (
      <div style={{width:600}}>
        <div
          style={{
            padding: 10,
            background: "#FFF",
            display: "flex",
            flexDirection: "column",
            marginBottom: 20,
             
         
           }}
        >
          <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Apply Coupon
          </div>
          <div style={{ fontWeight: 200, marginBottom: 10 }}>
            Log in to see best offers and cashback deals
          </div>
          <div style={{ fontSize: 14, fontWeight: "bold", marginBottom: 10 }}>
            Currently this feature is not available
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
              letterSpacing:2,
              fontWeight: "bold",
              marginTop:10,
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
                textAlign:'left',
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
                textAlign:'right',
                marginLeft:'auto' ,  
             
                
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
                textAlign:'right',
                marginLeft:'auto' ,  
             
             
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
                textAlign:'right',
                marginLeft:'auto' ,  
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
                textAlign:'right',
                marginLeft:'auto' ,  
             
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
            onClick={() => handleProceedPayment()}
            olor="primary"
            variant="contained"
            fullWidth
            style={{background:'#006266', color:'#FFF' }}
          >
            Proceed
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
              <div style={{ width: 100, textAlign: "right" }}>
                <DeleteOutline onClick={() => handleDelete(items)} />
              </div>
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
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <QtySpinner
              value={items.qtydemand}
              onChange={(value) => handleChange(value, items)}
            />
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
                justifyContent:'center',
               alignItems:'center'
               
              }} >
               
                

              {paymentDetails()}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
