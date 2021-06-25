import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Header from "./Header";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import clsx from "clsx";
import { ServerURL, postData } from "../../FetchNodeServices";
import { isMobile, isEmpty } from "../Checks";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import IconButton from "@material-ui/core/IconButton";
import OtpGenerator from "otp-generator";
//mport {isMobile} from 'react-device-detect';

import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { SettingsRemoteSharp } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: "url(bg.jfif)",

    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    marginTop: 25,
  },
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(1, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function Signin(props) {
  const classes = useStyles();
  const [mobileno, setMobileNo] = useState("");
  const [msg, setMsg] = useState("");
  const [otp, setOtp] = useState("");
  const [gotp, setGOtp] = useState("");
  const [status, setStatus] = useState(false);
  var dispatch = useDispatch();
  const handleShowCart = () => {
    if (otp == gotp) {
      props.history.push({ pathname: "/showcart" });
    } else {
      alert("Invalid otp....");
    }
  };
  const handleCheckUserMobileNumber = async () => {
    var error = false;
    if (isEmpty(mobileno)) {
      error = true;
      setMsg("Pls Input Mobile Number...");
    } else {
      if (!isMobile(mobileno)) {
        error = true;
        setMsg("Invalid Mobile Number Pls Input Valid Mobile Number");
      }
    }
    if (!error) {
      var body = { mobileno: mobileno };
      var result = await postData("userdetails/chkusermobileno", body);
      if (result.result) {
        setStatus(true);
        var temp = OtpGenerator.generate(4, {
          alphabets: false,
          upperCase: false,
          specialChars: false,
        });
        setGOtp(temp);
        alert(temp);
        var body = { otp: `Pls input otp ${temp}`, mob: mobileno };
        var smsresult = postData("sms/sendotp", body);

        dispatch({
          type: "ADD_CLIENT",
          payload: [result.data.mobileno, result.data],
        });
      } else {
        props.history.push({ pathname: "/signup" }, { mobileno: mobileno });
      }
    }
  };
  return (
    <div>
      <Header history={props.history} />
      <Grid container className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} md={6} sm={6} className={classes.image} />

        <Grid item xs={12} md={6} sm={6} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
              Sign In
            </div>

            <TextField
              id="standard-start-adornment"
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              // style={{ width:(isMobile)?'auto':400}}
              fullWidth
              onChange={(event) => setMobileNo(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
            />

            <div
              style={{
                padding: 5,
                fontSize: 12,
                fontWeight: "bold",
                color: "red",
              }}
            >
              {msg}
            </div>

            <IconButton
              aria-label="right"
              style={{ background: '#006266', color: "#FFF" }}
              onClick={() => handleCheckUserMobileNumber()}
            >
              <KeyboardArrowRightIcon size="large" />
            </IconButton>

            {status ? (
              <>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginBottom: 5,
                    marginTop: 20,
                  }}
                >
                  Verify
                </div>
                <div style={{ fontSize: 14, marginBottom: 5 }}>
                  We have sent 6 digit otp on <b>+91-{mobileno}</b>
                </div>
                <TextField
                  id="standard-start-otp"
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                  label="Enter your Otp"
                  fullWidth
                  //style={{ width:(isMobile)?'auto':400}}
                  onChange={(event) => setOtp(event.target.value)}
                />

                <IconButton
                  aria-label="right"
                  style={{
                    background: '#006266',
                    color: "#FFF",
                    marginTop: 10,
                  }}
                  onClick={() => handleShowCart()}
                >
                  <KeyboardArrowRightIcon size="large" />
                </IconButton>
              </>
            ) : (
              <></>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
