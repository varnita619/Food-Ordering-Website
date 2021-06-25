import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";

import Select from "@material-ui/core/Select";
import {
  getData,
  ServerURL,
  postData,
  postDataAndImage,
} from "../../FetchNodeServices";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
  },
  subdiv: {
    width: 510,
    background: "#fff",
    padding: 10,
  },
  formControl: {
    minWidth: 350,
  },
  formControlstatecity: {
    minWidth: 500,
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
  const [restaurant, setRestaurant] = useState("");

  const [qrLink, setQrLink] = useState("");
  const [list, setList] = useState([]);

  let history = useHistory();
  const fetchRestaurant = async () => {
    var result = await getData("restaurant/listrestaurant");
    setList(result);
  };
  const handleRestaurantChange = async (event) => {
    var item = event.target.value;
    setQrLink(`${ServerURL}/home/${item.restaurant_id}`);
    setRestaurant(item);
  };

  const fillRestaurant = () => {
    return list.map((item, index) => {
      return <MenuItem value={item}>{item.restaurant_name}</MenuItem>;
    });
  };

  useEffect(function () {
    fetchRestaurant();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <div
          style={{
            padding: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: 3,
          }}
        >
          <div>
            <img src="/qr_code.png" width="40" />
          </div>
          <div style={{ marginLeft: 20 }}>QrCode Generation</div>
        </div>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormControl
              variant="outlined"
              className={classes.formControlstatecity}
            >
              <InputLabel>Restaurant Id</InputLabel>
              <Select
                //value={age}
                onChange={(event) => handleRestaurantChange(event)}
                label="Restaurant ID"
                fullWidth
              >
                {fillRestaurant()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Restaurant Link"
              fullWidth
              value={qrLink}
              variant="outlined"
              onChange={(event) => setQrLink(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={() =>
                history.push(
                  { pathname: "/qrimage" },
                  { link: qrLink, restaurant: restaurant }
                )
              }
              variant="contained"
              fullWidth
            >
              Generate QrCode
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
