import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Select from "@material-ui/core/Select";
import Avatar from "@material-ui/core/Avatar";
import { getData, postData, postDataAndImage } from "../../FetchNodeServices";
import { makeStyles } from "@material-ui/core";
import swal from "sweetalert";
import { isAlphabets, isEmpty } from "../Checks";
import Snackbar from "@material-ui/core/Snackbar";
import reactHTML from "react-render-html";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    aliagnItems: "center",
    marginTop: 20,
    padding: 20,
  },
  subdiv: {
    width: 520,
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
}));
//  End of makeStyles

export default function FoodItems(props) {
  const classes = useStyles();
  const [getFoodType, setFoodType] = useState([]);
  const [getFoodItem, setFoodItem] = useState([]);
  const [fooditemimage, setFoodItemImage] = useState({
    bytes: "",
    file: "/noimage.jpg",
  });

  const [restaurantid, setRestaurantId] = useState(props.restaurant.restaurant_id);
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

  const fetchFoodTypes = async () => {
    var body={restaurant_id:props.restaurant.restaurant_id}
    var list = await postData("foodtypes/listfoodtypesbyrestaurant",body);
    setFoodType(list);
  };

  const fillFoodTypes = () => {
    return getFoodType.map((item, index) => {
      return <MenuItem value={item.foodtype_id}>{item.foodtype}</MenuItem>;
    });
    //   End of outer return
  };

  const handleFoodTypesChange = async (event) => {
    setFoodTypeId(event.target.value);
  };

  const fillFoodItems = () => {
    return getFoodItem.map((item, index) => {
      return <MenuItem value={item.food_itemid}>{item.food_itemname}</MenuItem>;
    });
  };

  useEffect(function () {
    fetchFoodTypes();
  }, []);

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
      var formData = new FormData();
      formData.append("restaurantid", restaurantid);
      formData.append("foodtypeid", foodTypeId);
      formData.append("fooditem", foodItems);
      formData.append("price", price);
      formData.append("offer", offer);
      formData.append("offertype", offerType);
      formData.append("foodtype", foodItemType);
      formData.append("foodingredients", ingredient);
      formData.append("ratings", rating);
      formData.append("foodimage", fooditemimage.bytes);

      var config = { headers: { "content-type": "multipart/form-data" } };
      var res = await postDataAndImage(
        "fooditems/addnewfooditem",
        formData,
        config
      );
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
  };

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              label="Restaurant Id"
              value={restaurantid}
              disabled={true}

              fullWidth
              variant="outlined"
              onChange={(event) => setRestaurantId(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              variant="outlined"
              className={classes.formControlfooditems}
            >
              <InputLabel>Food Type</InputLabel>
              <Select
                //value={Type}
                onChange={(event) => handleFoodTypesChange(event)}
                label=" Food Type"
              >
                {fillFoodTypes()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Food Item"
              fullWidth
              variant="outlined"
              onChange={(event) => setFoodItems(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Price"
              fullWidth
              variant="outlined"
              onChange={(event) => setPrice(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Offer"
              fullWidth
              variant="outlined"
              onChange={(event) => setOffer(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Offer Type"
              fullWidth
              variant="outlined"
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
                //value={Type}
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
              onChange={(event) => setIngredient(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Ratings"
              fullWidth
              variant="outlined"
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
                onChange={(event) =>
                  setFoodItemImage({
                    bytes: event.target.files[0],
                    file: URL.createObjectURL(event.target.files[0]),
                  })
                }
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
            </div>
          </Grid>

          {/* Buttons  */}
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
  );
}
