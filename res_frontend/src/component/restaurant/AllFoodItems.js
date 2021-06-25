import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core";
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
    marginTop: 20,
    padding: 20,
  },
  subdiv: {
    width: 800,
    padding: 20,
    background: "#f5f6fa",
  },
  formControl: {
    minWidth: 148,
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  input: {
    display: "none",
  },
  formControlfooditems: {
    minWidth: 247,
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AllFoodItems(props) {
  const classes = useStyles();

  // start of states
  //const[list,setList]=useState([])
  const [dOpen, setDOpen] = React.useState(false);
  const [getFoodType, setFoodType] = useState([]);
  const [list, setList] = useState([]);
  const [getFoodItem, setFoodItem] = useState([]);
  const [fooditemimage, setFoodItemImage] = useState({
    bytes: "",
    file: "/noimage.jpg",
  });

  const [restaurantid, setRestaurantId] = useState("");
  const [foodTypeId, setFoodTypeId] = useState("");
  const [foodItems, setFoodItems] = useState("");
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");
  const [offerType, setOfferType] = useState("");
  const [foodItemType, setFoodItemType] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [rating, setRating] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [getRowData, setRowData] = useState([]);
  const [getBtnFoodImage, setBtnFoodImage] = React.useState(false);
  const [getState, setState] = useState([]);

  // End of states

  useEffect(function () {
    fetch();
    fetchFoodTypes();
  }, []);

  const fillFoodTypes = () => {
    return getFoodType.map((item, index) => {
      return <MenuItem value={item.foodtype_id}>{item.foodtype}</MenuItem>;
    });
    //   End of outer return
  };

  const fetch = async () => {
    var res = await getData("fooditems/fetchfooditems");
    setList(res);
  };
  const fetchFoodTypes = async () => {
    var res = await getData("foodtypes/listfoodtypes");
    setFoodType(res);
  };

  //  const handleFoodTypesChange=async(event)=>{
  //   setFoodTypeId(event.target.value)
  //    fetchItems(event.target.value)
  //    }

  const handleClose = () => {
    setOpen(false);
  };

  //handle submit
  const handleSubmit = async () => {
    var msg = "";
    var err = false;

    if (isEmpty(restaurantid)) {
      err = true;
      msg += "<b>Restaurant Id Should Not Be Empty.</b><br>";
    } else if (isAlphabets(restaurantid)) {
      err = true;
      msg += "<b>Restaurant Id Must Contains Digits Only.</b><br>";
    }

    if (isEmpty(foodTypeId)) {
      err = true;
      msg += "<b>Food Type Should Not Be Empty.</b><br>";
    }

    if (isEmpty(foodItems)) {
      err = true;
      msg += "<b>Food Item Should Not Be Empty.</b><br>";
    }

    if (isEmpty(restaurantid)) {
      err = true;
      msg += "<b>Restaurant Id Should Not Be Empty.</b><br>";
    }

    if (isEmpty(price)) {
      err = true;
      msg += "<b>Price Should Not Be Empty.</b><br>";
    } else if (isAlphabets(price)) {
      err = true;
      msg += " <b>Price Must Contains Digits only.</b><br>";
    }

    if (isAlphabets(offer)) {
      err = true;
      msg += " <b>Offer Must Contains Digits only.</b><br>";
    }

    if (!isEmpty(offerType)) {
      if (!isAlphabets(offerType)) {
        err = true;
        msg += "<b> Offer Type Must Contains Alphabets only.</b><br>";
      }
    }

    if (isEmpty(foodItemType)) {
      err = true;
      msg += "<b>Food Type Should Not Be Empty.</b><br>";
    }

    if (isEmpty(ingredient)) {
      err = true;
      msg += "<b>Ingredient Should Not Be Empty.</b><br>";
    } else if (!isAlphabets(ingredient)) {
      err = true;
      msg += "<b>Ingredient Must Contains Alphabets Only.</b><br>";
    }

    if (isEmpty(rating)) {
      err = true;
      msg += "<b>Rating Should Not Be Empty.</b><br>";
    }

    if (err) {
      setErrorMessage(msg);
      setOpen(true);
    }

    if (!err) {
      var body = {
        restaurantid: getRowData.restaurant_id,
        fooditemid: getRowData.fooditem_id,
        foodtypeid: foodTypeId,
        fooditem: foodItems,
        price: price,
        offer: offer,
        offertype: offerType,
        foodtype: foodItemType,
        foodingredients: ingredient,
        ratings: rating,
      };

      var config = { headers: { "content-type": "multipart/form-data" } };
      var res = await postData("fooditems/editfooditems", body);
      if (res.result) {
        swal({
          title: "New Food Item Added Successfully",
          icon: "success",
          dangerMode: true,
        });
      } else {
        swal({
          title: "Food Item Not Added",
          icon: "warning",
          dangerMode: true,
        });
      }
    }
  }; //end of handle submit

  //handle for open the dialog

  const handleRefresh=()=>
  {
   setDOpen(false)
   fetchFoodTypes()

  }

  const handleDOpen = (data) => {
    
    //fetchItems(data.foodtype_id);
    setRestaurantId(data.restaurant_id);
    setRowData(data);
    setPrice(data.price);
    setOffer(data.offer);
    setOfferType(data.offertype);
    setFoodItemType(data.fooditemtype);
    setIngredient(data.ingredients);
    setRating(data.ratings);
    setFoodTypeId(data.foodtype_id);
    setFoodItems(data.fooditem);

    setFoodItemImage({
      bytes: "",
      file: `${ServerURL}/images/${data.fooditemimage}`,
    });
    setDOpen(true);
  };
  const handleDClose = () => {
    setDOpen(false);
    //fetchFoodItemList()
  };

  const handleFoodImage = (event) => {
    setFoodItemImage({
      bytes: event.target.files[0],
      file: URL.createObjectURL(event.target.files[0]),
    });
    setBtnFoodImage(true);
  };

  const handleSaveFoodImage = async () => {
    var formData = new FormData();
    formData.append("restaurantid", getRowData.restaurant_id);
    formData.append("fooditem", getRowData.fooditem_id);
    formData.append("foodimage", fooditemimage.bytes);
    var config = { headers: { "content-type": "multipart/form-data" } };
    var res = await postDataAndImage(
      "fooditems/editfooditemimage",
      formData,
      config
    );
    if (res) {
      swal({
        title: "Food Image updated Successfully",
        icon: "success",
        dangerMode: true,
      });
    } else {
      swal({
        title: "Food Image Not Updated",
        icon: "warning",
        dangerMode: true,
      });
    }
    setBtnFoodImage(false);
  };

  const handleCancelFoodImage = () => {
    setBtnFoodImage(false);
    setFoodItemImage({
      bytes: "",
      file: `${ServerURL}/images/${getRowData.foodimage}`,
    });
  };

  const handleDelete = async () => {
    var body = {
      restaurantid: getRowData.restaurant_id,
      fooditemid: getRowData.fooditem_id,
    };
    var res = await postData("fooditems/deletefooditem", body);
    if (res) {
      swal({
        title: "Food Item Deleted",
        icon: "success",
        dangerMode: true,
      });
    } else {
      swal({
        title: "Food Item Not Deleted",
        icon: "warning",
        dangerMode: true,
      });
    }
    handleDClose();
  };

  const showEditDialog = () => {
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
                onClick={handleRefresh}
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
          {/* start of food items  */}
          <div className={classes.root}>
            <div className={classes.subdiv}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    label="Restaurant Id"
                    fullWidth
                    variant="outlined"
                    onChange={(event) => setRestaurantId(event.target.value)}
                    value={restaurantid}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControlfooditems}
                  >
                    <InputLabel>Food Type</InputLabel>
                    <Select
                      value={getRowData.foodtype_id}
                      //onChange={(event)=>handleFoodTypesChange(event)}
                      label=" Food Type"
                    >
                      {fillFoodTypes()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Food Items"
                    fullWidth
                    variant="outlined"
                    onChange={(event) => setFoodItems(event.target.value)}
                    value={foodItems}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Price"
                    fullWidth
                    variant="outlined"
                    onChange={(event) => setPrice(event.target.value)}
                    value={price}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Offer"
                    fullWidth
                    variant="outlined"
                    onChange={(event) => setOffer(event.target.value)}
                    value={offer}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Offer Type"
                    fullWidth
                    variant="outlined"
                    value={offerType}
                    onChange={(event) => setOfferType(event.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControlfooditems}
                  >
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={foodItemType}
                      onChange={(event) => setFoodItemType(event.target.value)}
                      label="Type"
                    >
                      <MenuItem value={"Veg"}>Veg</MenuItem>
                      <MenuItem value={"Non-Veg"}>Non-Veg</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Food Ingredients"
                    fullWidth
                    variant="outlined"
                    value={ingredient}
                    onChange={(event) => setIngredient(event.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Ratings"
                    fullWidth
                    variant="outlined"
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                  />
                </Grid>
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
                      id="icon-button-item"
                      type="file"
                      onChange={(event) => handleFoodImage(event)}
                    />

                    <label htmlFor="icon-button-item">
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
                      src={fooditemimage.file}
                      className={classes.large}
                    />
                    {getBtnFoodImage ? (
                      <Button
                        color="primary"
                        onClick={() => handleSaveFoodImage()}
                      >
                        Save
                      </Button>
                    ) : (
                      <></>
                    )}
                    {getBtnFoodImage ? (
                      <Button
                        color="primary"
                        onClick={() => handleCancelFoodImage()}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                </Grid>
              </Grid>
              {/* Final Grid */}
            </div>
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
          ){/* End of Food items root div */}
        </Dialog>
      </div>
    ); //end of return of ShowEdit Dialog
  }; //end of ShowEdit Dialog

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <MaterialTable
          title="List of Food Items"
          columns={[
            {
              title: "Restaurant id",
              field: "restaurant_id",
              render: (rowData) => (
                <div style={{ flexDirection: "column" }}>
                  <div>{rowData.restaurant_id}</div>
                </div>
              ),
            },
            {
              title: "Food Type",
              field: "foodtype",
              render: (rowData) => (
                <div style={{ flexDirection: "column" }}>
                  <div>{rowData.foodtype}</div>
                </div>
              ),
            },
            {
              title: "Food Item",
              field: "Name",
              render: (rowData) => (
                <div style={{ flexDirection: "column" }}>
                  <div>{rowData.fooditem}</div>
                </div>
              ),
            },
            {
              title: "Price/Offer",
              field: "Name",
              render: (rowData) => (
                <div style={{ flexDirection: "column" }}>
                  <div>
                    {rowData.price}/{rowData.offer}
                  </div>
                </div>
              ),
            },
            {
              title: "Type",
              field: "Name",
              render: (rowData) => (
                <div style={{ flexDirection: "column" }}>
                  <div>{rowData.fooditemtype}</div>
                </div>
              ),
            },
            {
              title: "Ratings",
              field: "Name",
              render: (rowData) => (
                <div style={{ flexDirection: "column" }}>
                  <div>{rowData.ratings}</div>
                </div>
              ),
            },
          ]}
          data={list}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit item",
              onClick: (event, rowData) => {
                handleDOpen(rowData);
              },
            },
          ]}
        />
      </div>
      {/* end of subdiv */}
      {showEditDialog()}
    </div>
  ); //end of return
  //final div
} //end of default function
