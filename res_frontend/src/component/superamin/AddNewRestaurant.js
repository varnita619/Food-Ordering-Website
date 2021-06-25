import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import renderHTML from "react-render-html";
import swal from "sweetalert";
import FormControl from "@material-ui/core/FormControl";
import Avatar from "@material-ui/core/Avatar";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { getData, postData, postDataAndImage } from "../../FetchNodeServices";
import { isEmpty, isAlphabets } from "../Checks";

import Snackbar from "@material-ui/core/Snackbar";

import CloseIcon from "@material-ui/icons/Close";

var otpGenerator = require("otp-generator");
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
  },
  subdiv: {
    width: 700,
    background: "#ffeaa7",
    padding: 10,
  },
  formControl: {
    minWidth: 350,
  },
  formControlstatecity: {
    minWidth: 200,
  },

  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  input: {
    display: "none",
  },
}));

export default function AddNewRestaurant(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [shopActImage, setShopActImage] = useState({
    bytes: "",
    file: "/noimage.jpg",
  });
  const [idProofImage, setIdProofImage] = useState({
    bytes: "",
    file: "/noimage.jpg",
  });
  const [fssaiImage, setFssaiImage] = useState({
    bytes: "",
    file: "/noimage.jpg",
  });
  const [logo, setLogo] = useState({ bytes: "", file: "/noimage.jpg" });
  const [getState, setState] = useState([]);
  const [getCity, setCity] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [address, setAddress] = useState("");
  const [stateId, setStateId] = useState("");
  const [cityId, setCityId] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [status, setStatus] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [gst, setGst] = useState("");
  const [fssai, setfssai] = useState("");
  const [shopAct, setShopAct] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchStates = async () => {
    var list = await getData("statecity/fetchstates");
    //console.log("States", list);
    setState(list);
  };

  const fillStates = () => {
    return getState.map((item, index) => {
      return <MenuItem value={item.stateid}>{item.statename}</MenuItem>;
    });
  };

  const handleStateChange = async (event) => {
    setStateId(event.target.value);
    var body = { stateid: event.target.value };
    var list = await postData("statecity/fetchcities", body);
    setCity(list);
  };

  const fillCities = () => {
    return getCity.map((item, index) => {
      return <MenuItem value={item.cityid}>{item.cityname}</MenuItem>;
    });
  };

  const handleLogo = (event) => {
    alert(URL.createObjectURL(event.target.files[0]));
    setLogo({
      bytes: event.target.files[0],
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleSubmit = async () => {
    var msg = "";
    var err = false;
    if (isEmpty(restaurantName)) {
      err = true;
      msg += "<b>Restaurant Name Should Not Be Empty...<b><br>";
    }

    if (isEmpty(ownerName)) {
      err = true;
      msg += "<b>Owner Name Should Not Be Empty...<b><br>";
    }

    if (!isAlphabets(ownerName)) {
      err = true;
      msg += "<b>Owner Name  Must Contains Alphabets Only...<b><br>";
    }
    if (err) {
      setErrorMessage(msg);
      setOpen(true);
    }

    if (!err) {
      var password = otpGenerator.generate(6, {
        upperCase: false,
        specialChars: false,
      });
      var formData = new FormData();
      formData.append("restaurant_name", restaurantName);
      formData.append("owner_name", ownerName);
      formData.append("address", address);
      formData.append("state", stateId);
      formData.append("city", cityId);
      formData.append("zipcode", zipcode);
      formData.append("location", location);
      formData.append("emailaddress", emailAddress);
      formData.append("mobilenumber", mobileNumber);
      formData.append("type", type);
      formData.append("id", id);
      formData.append("idproofimage", idProofImage.bytes);
      formData.append("shopact", shopAct);
      formData.append("shopactimage", shopActImage.bytes);
      formData.append("fssai", fssai);
      formData.append("fssaiimage", fssaiImage.bytes);
      formData.append("gst", gst);
      formData.append("status", status);
      formData.append("logo", logo.bytes);
      formData.append("password", password);
      var config = { headers: { "content-type": "multipart/form-data" } };
      var res = await postDataAndImage(
        "restaurant/addnewrestaurant",
        formData,
        config
      );
      //alert(res.result)
      if (res.result) {
        swal({
          title: "New Restaurant Added Successfully",
          icon: "success",
          dangerMode: true,
        });
      } else {
        swal({
          title: "Add New Restaurant?",
          text: "Fail to Add New Restaurant",
          icon: "warning",
          dangerMode: true,
        });
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(function () {
    fetchStates();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Restaurant Name"
              fullWidth
              variant="outlined"
              onChange={(event) => setRestaurantName(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(event) => setOwnerName(event.target.value)}
              label="Owner Name"
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Address"
              fullWidth
              variant="outlined"
              onChange={(event) => setAddress(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl
              variant="outlined"
              className={classes.formControlstatecity}
            >
              <InputLabel>States</InputLabel>
              <Select
                //value={age}
                onChange={(event) => handleStateChange(event)}
                label="State"
                fullWidth
              >
                {fillStates()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl
              variant="outlined"
              className={classes.formControlstatecity}
            >
              <InputLabel>City</InputLabel>
              <Select
                //value={age}
                onChange={(event) => setCityId(event.target.value)}
                label="City"
                fullWidth
              >
                {fillCities()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Zip Code"
              onChange={(event) => setZipcode(event.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Email Id"
              onChange={(event) => setEmailAddress(event.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Mobile Number"
              onChange={(event) => setMobileNumber(event.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              onChange={(event) => setLocation(event.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>Type</InputLabel>
              <Select
                //value={age}
                onChange={(event) => setType(event.target.value)}
                label="Type"
                fullWidth
              >
                <MenuItem value={"Indian"}>Indian</MenuItem>
                <MenuItem value={"South Indian"}>South Indian</MenuItem>
                <MenuItem value={"Chinese"}>Chinese</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Shop Act/Company"
              onChange={(event) => setShopAct(event.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-act"
                type="file"
                multiple
                onChange={(event) =>
                  setShopActImage({
                    bytes: event.target.files[0],
                    file: URL.createObjectURL(event.target.files[0]),
                  })
                }
              />
              <label htmlFor="icon-button-act">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              <Avatar
                alt="Remy Sharp"
                variant="rounded"
                style={{ marginLeft: 20 }}
                src={shopActImage.file}
                className={classes.large}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Id Proof"
              onChange={(event) => setId(event.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-id"
                type="file"
                multiple
                onChange={(event) =>
                  setIdProofImage({
                    bytes: event.target.files[0],
                    file: URL.createObjectURL(event.target.files[0]),
                  })
                }
              />
              <label htmlFor="icon-button-id">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              <Avatar
                alt="Remy Sharp"
                variant="rounded"
                style={{ marginLeft: 20 }}
                src={idProofImage.file}
                className={classes.large}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Fssai"
              onChange={(event) => setfssai(event.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-fssai"
                type="file"
                multiple
                onChange={(event) =>
                  setFssaiImage({
                    bytes: event.target.files[0],
                    file: URL.createObjectURL(event.target.files[0]),
                  })
                }
              />
              <label htmlFor="icon-button-fssai">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              <Avatar
                alt="Remy Sharp"
                variant="rounded"
                style={{ marginLeft: 20 }}
                src={fssaiImage.file}
                className={classes.large}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>Status</InputLabel>
              <Select
                //value={age}
                onChange={(event) => setStatus(event.target.value)}
                label="Status"
                fullWidth
              >
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"Deactive"}>Deactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-logo"
                type="file"
                multiple
                onChange={(event) => handleLogo(event)}
              />
              <label htmlFor="icon-button-logo">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              <Avatar
                alt="Remy Sharp"
                variant="rounded"
                style={{ marginLeft: 20 }}
                src={logo.file}
                className={classes.large}
              />
            </div>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="GST"
              onChange={(event) => setGst(event.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Button
              onClick={() => handleSubmit()}
              variant="contained"
              fullWidth
              color="primary"
            >
              Submit
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button variant="contained" fullWidth color="primary">
              Reset
            </Button>
          </Grid>



        </Grid>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={renderHTML(errorMessage)}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
