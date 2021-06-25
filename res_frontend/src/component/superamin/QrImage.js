import React, { useState } from "react";
import './Qr.css';
import logo from "./logo.png";
import payment from "./cashfree-payment-options.png";
import restaurant from "./resto.jpg";
import QR from "./QR.PNG";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import PrintIcon from "@material-ui/icons/Print";
import {
  getData,
  ServerURL,
  postData,
  postDataAndImage,
} from "../../FetchNodeServices";

var QRCode = require('qrcode.react');
function QrImage(props) {
  const [state,setState]=useState(true)
  const [qrLink, setQrLink] = useState(props.history.location.state.link);
  const [restaurant, setRestaurant] = useState(props.history.location.state.restaurant);
  
   const showQrCode=()=>{
  
      return(
             <div>
              <QRCode value={qrLink} size={200} />,
              </div>
            );
      
   }
  
  return (
    <div className="App">
      <React.Fragment>
        <Container maxWidth="sm">
          
          <div className="container">
            <div className="column-1">
            <div className="header">
            <img src={`${ServerURL}/images/${restaurant.logo}`} width="100%" />
          </div>
              <h2>scan here for menu</h2>
              {state?<div>{showQrCode()}</div>:<div></div>}
              <h2>{restaurant.restaurant_name}</h2>
              <h3>{restaurant.mobilenumber}</h3>
              <img src={payment} width="100%" />
                         </div>
           
          </div>
         
            
          
         
        </Container>
        <Button
              variant="contained"
              color="primary"
              startIcon={<PrintIcon />}
              onClick={() => window.print()}
             
              style={{margin:10,width:200}}
            >
              Print
            </Button>

      </React.Fragment>
    </div>
  );
}
export default QrImage;
