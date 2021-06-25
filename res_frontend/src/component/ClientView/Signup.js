import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Header from "./Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import OtpGenerator from "otp-generator";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import IconButton from "@material-ui/core/IconButton";

import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { ServerURL, postData } from "../../FetchNodeServices";
const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: "url(bg3.jfif)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
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

export default function Signup(props) {
  var mobileno = props.history.location.state.mobileno;
  const classes = useStyles();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [emailid, setEmailid] = useState("");

  const [otp, setOtp] = useState("");
  const [gotp, setGOtp] = useState("");
  var dispatch = useDispatch();
  const [values, setValues] = React.useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
    showCPassword: false,
  });

  const OtpGenrate = () => {
    var temp = OtpGenerator.generate(4, {
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
    setGOtp(temp);
    alert(temp);
  };
  useEffect(function () {
    OtpGenrate();
  }, []);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowCPassword = () => {
    setValues({ ...values, showCPassword: !values.showCPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async () => {
    if (otp == gotp) {
      if (values.password == values.confirmPassword) {
        var body = {
          mobileno: mobileno,
          emailid: emailid,
          firstname: firstname,
          lastname: lastname,
          password: values.password,
          addressstatus: false,
        };
        var result = await postData("userDetails/insertuserdetails", body);
        if (result.result) {
          dispatch({ type: "ADD_CLIENT", payload: [mobileno, body] });
          props.history.push({ pathname: "/showcart" });
        } else {
          alert("Fail to save your record");
        }
      } else {
        alert("Confirm Password not Matched...");
      }
    } else {
      alert("Invalid Otp....");
    }
  };

  return (
    <div>
      <Header history={props.history} />
      <Grid container>
        <CssBaseline />
        <Grid item xs={false} md={6} sm={6} className={classes.image} />

        <Grid item xs={12} md={6} sm={6} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
              Sign Up
            </div>
            <div style={{ fontSize: 12, fontWeight: "600", marginBottom: 7 }}>
              Pls fill your details
            </div>

            <TextField
              id="outlined-basic"
              fullWidth
              label="Your First Name"
              variant="outlined"
              onChange={(event) => setFirstname(event.target.value)}
              style={{ marginTop: 8 }}
            />

            <TextField
              id="outlined-basic"
              fullWidth
              label="Your Last Name"
              variant="outlined"
              onChange={(event) => setLastname(event.target.value)}
              style={{ marginTop: 8 }}
            />

            <TextField
              id="outlined-basic"
              fullWidth
              label="Enter Your Email id"
              variant="outlined"
              style={{ marginTop: 8 }}
              onChange={(event) => setEmailid(event.target.value)}
            />

            <FormControl fullWidth variant="outlined" style={{ marginTop: 8 }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                fullWidth={true}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>

            <FormControl fullWidth variant="outlined" style={{ marginTop: 8 }}>
              <InputLabel htmlFor="outlined-adornment-confirmPassword">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlinenpm startd-adornment-confirmPassword"
                type={values.showCPassword ? "text" : "password"}
                value={values.confirmPassword}
                fullWidth={true}
                onChange={handleChange("confirmPassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowCPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showCPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>

            <div style={{display:'flex',justifyContent:'center',alignContent:'center',margin:10}}>
            <FormControlLabel control={<Checkbox name="checkedC" />} /> 
             <div style={{display:'flex',justifyContent:'center',padding:10,alignItems:'center'}}> 
             Enable <WhatsAppIcon style={{ color: "#009432" }} /> Whatsapp Messages
              </div>
            </div>

            <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
              Verify
            </div>
            <div style={{ fontSize: 14, marginBottom: 5 }}>
              We have sent 6 digit otp on <b>+91-{mobileno}</b>
            </div>

            <TextField
              id="outlined-basic"
              label="Enter Your OTP"
              variant="outlined"
              onChange={(event) => setOtp(event.target.value)}
              fullWidth
            />

            <Button
              onClick={() => handleSubmit()}
              variant="contained"
              color="primary"
              fullWidth
              style={{background:'#006266', marginTop: 8, marginBottom: 8 }}
            >
              Save & Verify
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
