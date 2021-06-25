import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import {
  getData,
  ServerURL,
  postData,
  postDataAndImage,
} from "../../FetchNodeServices";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Select from "@material-ui/core/Select";
import Avatar from "@material-ui/core/Avatar";
import swal from "sweetalert";
import Snackbar from "@material-ui/core/Snackbar";
import reactHTML from "react-render-html";
import { isAlphabets, isEmpty } from "../Checks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    aliagnItems: "center",
    marginTop: 30,
    padding: 20,
  },
  subdiv: {
    width: 800,
    background: "#f5f6fa",
    padding: 20,
  },
  tablesubdiv: {
    width: 600,
    background: "#f5f6fa",
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  formControl: {
    minWidth: 296,
  },
  input: {
    display: "none",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AllFoodTypes() {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [dOpen, dsetOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [foodImage, setFoodImage] = useState({
    bytes: "",
    files: "/noimage.jpg",
  });
  const [foodAdImage, setFoodAdImage] = useState({
    bytes: "",

    files: "/noimage.jpg",
  });
  const [restaurantId, setRestaurantId] = useState("");
  const [foodType, setFoodType] = useState("");
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [getRowData, setRowData] = useState([]);
  const [getBtnFoodTypeImage, setBtnFoodTypeImage] = React.useState(false);
  const [getBtnFoodAdImage, setBtnFoodAdImage] = React.useState(false);

  const fetchFoodTypes = async () => {
    var res = await getData("foodtypes/listfoodtypes");
    setList(res);
  };

  useEffect(function () {
    fetchFoodTypes();
  }, []);

  //handle for close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveFoodTypeImage = async () => {
    var formData = new FormData();
    formData.append("foodimage", foodImage.bytes);
    formData.append("foodtype_id", getRowData.foodtype_id);
    var config = { headers: { "content-type": " multipart/formData" } };
    var res = postDataAndImage("foodtypes/editfoodtypeimage", formData, config);
    if (res) {
      swal({
        title: "Food Type Image Updated Successfully",
        icon: "success",
        dangerMode: true,
      });
    } else {
      swal({
        title: "Food Type Image Not Updated",
        icon: "warning",
        dangerMode: true,
      });
    }

    setBtnFoodTypeImage(false);
  }; //end of handlesavefoodtypeimage

  const handleCancelFoodTypeImage = () => {
    setBtnFoodTypeImage(false);
    setFoodImage({
      bytes: "",
      file: `${ServerURL}/images/${getRowData.foodimage}`,
    });
  };
  //  END OF handleCancelFoodTypeImage

  const handleCancelFoodAdImage = () => {
    setBtnFoodAdImage(false);
    setFoodAdImage({
      bytes: "",
      file: `${ServerURL}/images/${getRowData.foodtypead}`,
    });
  };
  //  END OF handleCancelFoodTypeAdImage

  // ******** Start OF handleDOpen*************
  const handleDOpen = (data) => {
    setRowData(data);
    setRestaurantId(data.restaurant_id);
    setFoodType(data.foodtype);
    setStatus(data.status);
    setFoodImage({ bytes: "", file: `${ServerURL}/images/${data.foodimage}` });
    setFoodAdImage({
      bytes: "",
      file: `${ServerURL}/images/${data.foodtypead}`,
    });

    dsetOpen(true);
  };

  //***********start of HandleFoodAdImage **********/
  const handleFoodAdImage = (event) => {
    setFoodAdImage({
      bytes: event.target.files[0],
      file: URL.createObjectURL(event.target.files[0]),
    });
    setBtnFoodAdImage(true);
  };
  //***********End of HandleFoodAdImage **********/

  //***********start of HandleSaveFoodAdImage **********/
  const handleSaveFoodAdImage = async () => {
    var formData = new FormData();
    formData.append("foodtypead", foodAdImage.bytes);
    formData.append("foodtype_id", getRowData.foodtype_id);
    var config = { headers: { "content-type": "multipart/formData" } };

    var res = await postDataAndImage(
      "foodtypes/editfoodadimage",
      formData,
      config
    );
    if (res) {
      swal({
        title: "Food Type Ad Image Updated Successfully",
        icon: "success",
        dangerMode: true,
      });
    } else {
      swal({
        title: "Food Type Ad Image Not Updated",
        icon: "warning",
        dangerMode: true,
      });
    }
    // To Disappear the Save Cancel Button After updation
    setBtnFoodAdImage(false);
  };
  //***********End of HandleSaveFoodAdImage **********/

  const handleDClose = () => {
    fetchFoodTypes();
    dsetOpen(false);
  };

  const handleFoodTypeImage = (event) => {
    setFoodImage({
      bytes: event.target.files[0],
      file: URL.createObjectURL(event.target.files[0]),
    });
    setBtnFoodTypeImage(true);
  };
  //********** Handle Delete********* */
  const handleDelete = async () => {
    var body = {
      foodtype_id: getRowData.foodtype_id,
    };
    var res = await postData("foodtypes/deletefoodtype", body);
    if (res) {
      swal({
        title: "Food Type Deleted Successfully",
        icon: "success",
        dangerMode: true,
      });
    } else {
      swal({
        title: "Food Type Not Deleted",
        icon: "warning",
        dangerMode: true,
      });
    }
    handleDClose();
  };
  //*************END of Handle Delete ******* */

  const handleSubmit = async () => {
    var msg = "";
    var err = false;
    if (isEmpty(restaurantId)) {
      err = true;
      msg += "<b>Restaurant Id Should Not Be Empty.</b><br>";
    }

    if (isEmpty(foodType)) {
      err = true;
      msg += "<b>Food Type Should Not Be Empty.</b><br>";
    } else if (!isAlphabets(foodType)) {
      err = true;
      msg += "<b>Food Type Must Contains Alphabets Only.</b><br>";
    }

    if (isEmpty(status)) {
      err = true;
      msg += "<b>Ad Status Should Not Be Empty.</b><br>";
    }

    if (err) {
      setErrorMessage(msg);
      setOpen(true);
    }

    if (!err) {
      var body = {
        foodtype_id: getRowData.foodtype_id,
        foodtype: foodType,
        status: status,
      };

      var res = await postData("foodtypes/editfoodtype", body);
      if (res) {
        swal({
          title: "Data Updated Successfully",
          icon: "success",
          dangerMode: true,
        });
      } else {
        swal({
          title: "Data Not Updated",
          icon: "warning",
          dangerMode: true,
        });
      }
    }
  }; //end of handleSubmit

  const showEditDialog = (data) => {
    return (
      <div>
        <Dialog
          fullScreen
          open={dOpen}
          onClose={handleDClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleDClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Food Type Details
              </Typography>
              <Button autoFocus color="inherit" onClick={handleSubmit}>
                Save
              </Button>
              <Button autoFocus color="inherit" onClick={handleDelete}>
                Delete
              </Button>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
            <div className={classes.subdiv}>
              <Grid container spacing={1}>
                {/* start of restaurant id */}
                <Grid item xs={12}>
                  <TextField
                    label="Restaurant Id"
                    fullWidth
                    variant="outlined"
                    value={restaurantId}
                    onChange={(event) => setRestaurantId(event.target.value)}
                  />
                </Grid>
                {/* End of restaurant id */}
                {/* start of restaurant Food type */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Food Type"
                    fullWidth
                    variant="outlined"
                    value={foodType}
                    onChange={(event) => setFoodType(event.target.value)}
                  />
                </Grid>
                {/* End of Food type */}

                {/* start of  Food image*/}
                <Grid item xs={12} sm={6}>
                  <div
                    style={{
                      display: "flex",
                      flexdirection: "center",
                      justifyContent: "center",
                      aliagnItems: "center",
                    }}
                  >
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="icon-button-foodimg"
                      type="file"
                      onChange={(event) => handleFoodTypeImage(event)}
                    />
                    <label htmlFor="icon-button-foodimg">
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
                      src={foodImage.file}
                      className={classes.large}
                    />
                    {getBtnFoodTypeImage ? (
                      <Button
                        color="primary"
                        style={{ padding: 5 }}
                        onClick={() => handleSaveFoodTypeImage()}
                      >
                        Save
                      </Button>
                    ) : (
                      <></>
                    )}
                    {getBtnFoodTypeImage ? (
                      <Button
                        color="primary"
                        onClick={() => handleCancelFoodTypeImage()}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                </Grid>
                {/* End of Food image */}
                {/* start of status */}
                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel>Ad Status</InputLabel>
                    <Select
                      value={status}
                      onChange={(event) => setStatus(event.target.value)}
                      label="Status"
                    >
                      <MenuItem value={"Yes"}>Yes</MenuItem>
                      <MenuItem value={"No"}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* End of status */}

                {/* start of  Food typeAdImage */}
                <Grid item xs={12} sm={6}>
                  <div
                    style={{
                      display: "flex",
                      flexdirection: "center",
                      justifyContent: "center",
                      aliagnItems: "center",
                    }}
                  >
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="icon-button-ad"
                      type="file"
                      onChange={(event) => handleFoodAdImage(event)}
                    />

                    <label htmlFor="icon-button-ad">
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
                      style={{ marginLeft: "30" }}
                      src={foodAdImage.file}
                      className={classes.large}
                    />
                    {getBtnFoodAdImage ? (
                      <Button
                        color="primary"
                        style={{ padding: 5 }}
                        onClick={() => handleSaveFoodAdImage()}
                      >
                        Save
                      </Button>
                    ) : (
                      <></>
                    )}
                    {getBtnFoodAdImage ? (
                      <Button
                        color="primary"
                        style={{ padding: 5 }}
                        onClick={() => handleCancelFoodAdImage()}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                </Grid>
                {/* End of Food typeAd */}
              </Grid>
              {/* End of main Grid */}
            </div>
            {/* End of subdiv */}
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={open}
              autoHideDuration={6000}
              //onClose={handleClose}
              message={reactHTML(errorMessage)}
              action={
                <React.Fragment>
                  <Button color="secondary" size="small" onClick={handleClose}>
                    UNDO
                  </Button>
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
          {/* End of Snackbar */}
        </Dialog>
      </div>
    );
  };
  {
    /* End of showEditDialog */
  }

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <MaterialTable
          title="Food Type Details"
          columns={[
            { title: "Restaurant Name", field: "restaurant_id" },
            { title: "Food Types", field: "foodtype" },
            { title: "Ad Status", field: "status" },
          ]}
          data={list}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Food Type",
              onClick: (event, rowData) => handleDOpen(rowData),
            },
          ]}
        />
      </div>
      {showEditDialog()}
    </div>
  );
}
