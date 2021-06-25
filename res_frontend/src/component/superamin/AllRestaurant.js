import React, { useEffect, useState } from "react";

import MaterialTable from "material-table";

import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";

import Slide from "@material-ui/core/Slide";
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
import {
  ServerURL,
  getData,
  postData,
  postDataAndImage,
} from "../../FetchNodeServices";
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
    width: 1000,
    background: "#ffeaa7",
    padding: 10,
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },

  formControlstatecity: {
    minWidth: 200,
  },
  formControl: {
    minWidth: 350,
  },
  input: {
    display: "none",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AllRestaurant() {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [btnShopAct,setBtnShopAct ]=useState(false)
  const [dopen, dsetOpen] = React.useState(false);
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
  const [getRowData, setRowData] = useState([]);
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
    fetchCities(event.target.value);
  };

  const fetchCities = async (stateid) => {
    var body = { stateid: stateid };
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
      var body = {
        restaurant_id: getRowData.restaurant_id,
        restaurant_name: restaurantName,
        owner_name: ownerName,
        address: address,
        state: stateId,
        city: cityId,
        zipcode: zipcode,
        location: location,
        emailaddress: emailAddress,
        mobilenumber: mobileNumber,
        type: type,
        id: id,
        shopact: shopAct,
        fssai: fssai,
        gst: gst,
        status: status,
      };

      var res = await postData("restaurant/editrestaurant", body);
      //alert(res.result)
      if (res.result) {
        swal({
          title: "New Restaurant Edit Successfully",
          icon: "success",
          dangerMode: true,
        });
      } else {
        swal({
          title: "Fail to Add New Restaurant",
          icon: "warning",
          dangerMode: true,
        });
      }
    }
    
  };

  const fetchRestaurant = async () => {
    var result = await getData("restaurant/listrestaurant");
    setList(result);
  };

  const handleDClose = () => {
    dsetOpen(false);
  };
 const handleDelete=async()=>{
  var body={"restaurantid":getRowData.restaurant_id}
  var res = await postData(
    "restaurant/deleterestaurant",
    body
  
  );
  //alert(res.result)
  if (res.result) {
    swal({
      title: "Reataurant Deleted Successfully",
      icon: "success",
      dangerMode: true,
    });
  } else {
    swal({
      title: "Fail to Delete Record",
    
      icon: "warning",
      dangerMode: true,
    });
  }

 }
  const handleRefresh=()=>
  {
   dsetOpen(false)
   fetchRestaurant()

  }

  const handleSaveShopActImage=async()=>
  { var formData=new FormData()
     formData.append("restaurantid",getRowData.restaurant_id,)
     formData.append("shopactimage", shopActImage.bytes);
     var config = { headers: { "content-type": "multipart/form-data" } };
     var res = await postDataAndImage(
       "restaurant/updateShopActImage",
       formData,
       config
     );
     //alert(res.result)
     if (res.result) {
       swal({
         title: "Shop Act Image Updated Successfully",
         icon: "success",
         dangerMode: true,
       });
     } else {
       swal({
         title: "Fail to Update Image?",
       
         icon: "warning",
         dangerMode: true,
       });
     }
    setBtnShopAct(false)

  }

  const handleShopAct=(event)=>{
    setShopActImage({
      bytes: event.target.files[0],
      file: URL.createObjectURL(event.target.files[0]),
    })
    setBtnShopAct(true)

  }
  const handleDOpen = (data) => {
    fetchCities(data.state);
    setRestaurantName(data.restaurant_name);
    setOwnerName(data.owner_name);
    setAddress(data.address);
    setZipcode(data.zipcode);
    setLocation(data.location);
    setMobileNumber(data.mobilenumber);
    setEmailAddress(data.emailaddress);
    setType(data.type);
    setStatus(data.status);
    setGst(data.gst);
    setId(data.idproof);
    setfssai(data.fssai);
    setShopAct(data.shopact);

    setShopActImage({
      bytes: "",
      file: `${ServerURL}/images/${data.shopactimage}`,
    });
    setFssaiImage({
      bytes: "",
      file: `${ServerURL}/images/${data.fssaiimage}`,
    });
    setIdProofImage({
      bytes: "",
      file: `${ServerURL}/images/${data.idproofimage}`,
    });
    setLogo({ bytes: "", file: `${ServerURL}/images/${data.logo}` });
    setRowData(data);
    dsetOpen(true);
  };

  const showEditDialog = () => {
    return (
      <div>
        <Dialog
          fullScreen
          open={dopen}
          onClose={handleDClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleRefresh}
                aria-label="close"
              >
                <CloseIcon  />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Restaurant Details
              </Typography>
              <Button autoFocus color="inherit" onClick={handleSubmit}>
                Edit
              </Button>
              <Button autoFocus color="inherit" onClick={handleDelete}>
                Delete
              </Button>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
            <div className={classes.subdiv}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Restaurant Name"
                    fullWidth
                    value={restaurantName}
                    variant="outlined"
                    onChange={(event) => setRestaurantName(event.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(event) => setOwnerName(event.target.value)}
                    label="Owner Name"
                    value={ownerName}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    fullWidth
                    variant="outlined"
                    value={address}
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
                      value={getRowData.state}
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
                      value={getRowData.city}
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
                    value={zipcode}
                    onChange={(event) => setZipcode(event.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email Id"
                    value={emailAddress}
                    onChange={(event) => setEmailAddress(event.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Mobile Number"
                    value={mobileNumber}
                    onChange={(event) => setMobileNumber(event.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={type}
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
                    value={shopAct}
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
                      onChange={(event) =>handleShopAct(event)
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
                    {btnShopAct?<Button color="primary" style={{padding:5}} onClick={()=>handleSaveShopActImage()}>Save</Button>:<></>}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Id Proof"
                    value={id}
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
                    value={fssai}
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
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={status}
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
                    value={gst}
                    onChange={(event) => setGst(event.target.value)}
                    fullWidth
                    variant="outlined"
                  />
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
        </Dialog>
      </div>
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(function () {
    fetchRestaurant();
    fetchStates();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <MaterialTable
          title="List of Restaurant"
          columns={[
            {
              title: "Name",
              field: "Name",
              render: (rowData) => (
                <div style={{ flexDirection: "column" }}>
                  <div>
                    <b>{rowData.restaurant_name}</b>
                  </div>
                  <div>{rowData.owner_name}</div>
                </div>
              ),
            },

            {
              title: "Address",
              field: "address",
              render: (rowData) => (
                <div style={{ flexDirection: "column" }}>
                  <div>{rowData.address}</div>
                  <div>
                    {rowData.cityname},{rowData.statename}
                  </div>
                </div>
              ),
            },

            {
              title: "Contact",
              field: "Name",
              render: (rowData) => (
                <div style={{ flexDirection: "column" }}>
                  <div>
                    <b>{rowData.mobilenumber}</b>
                  </div>
                  <div>{rowData.emailaddress}</div>
                </div>
              ),
            },

            {
              title: "GST/Fssai",
              field: "Name",
              render: (rowData) => (
                <div style={{ flexDirection: "column" }}>
                  <div>
                    <b>{rowData.gst}</b>
                  </div>
                  <div>
                    {rowData.fssai},{rowData.status}
                  </div>
                </div>
              ),
            },
            {
              title: "Logo",
              field: "Name",
              render: (rowData) => (
                <div style={{ borderRadius: 10 }}>
                  <img
                    src={`${ServerURL}/images/${rowData.logo}`}
                    width="50"
                    height="50"
                  />
                </div>
              ),
            },
          ]}
          data={list}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Restaurant",
              onClick: (event, rowData) => handleDOpen(rowData),
            },
          ]}
        />
      </div>
      {showEditDialog()}
    </div>
  );
}
