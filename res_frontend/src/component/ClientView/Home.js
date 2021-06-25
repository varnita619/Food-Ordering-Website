import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import QtySpinner from "./QtySpinner";
import {useDispatch,useSelector} from "react-redux"
import Typography from "@material-ui/core/Typography";
import { ServerURL, getData, postData } from "../../FetchNodeServices";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",

    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));
export default function Home(props) {
  const classes = useStyles();
  const [foodType, setFoodType] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [foodItemsList, setFoodItemsList] = useState([]);
  const [refresh,setRefresh]=useState(false)
  
  var dispatch=useDispatch()
  useEffect(function () {
    fetchFoodTypes(1);
    fetchByID(1)
    fetchFoodItemsByOffer(1)
  }, []);
  const fetchByID = async (resid) => {
    var body = { restaurant_id: resid };
    var list = await postData("restaurant/restaurantbyid", body);
   // alert(JSON.stringify(list))
    list=list[0] 
    dispatch({type:'ADD_RES',payload:[list.restaurant_id,list]})
    setRestaurant(list[0]);
  }

  const fetchFoodTypes = async (resid) => {
    var body = { restaurant_id: resid };
    var list = await postData("foodtypes/listfoodtypesbyrestaurant", body);
    setFoodType(list);
  };

  const fetchFoodItems = async (typeid) => {
    var body = { foodtype_id: typeid, };
    var list = await postData("fooditems/listfooditemsbyfoodtype", body);
    setFoodItemsList(list);
  };

  const fetchFoodItemsByOffer = async (resid) => {
    var body = {restaurant_id:resid };
    var list = await postData("fooditems/listfooditemsoffer", body);
    setFoodItemsList(list);
  };

  const handleChange = (value,item) => {
    if(value==0)
    {
      dispatch({type:'REMOVE_ITEM',payload:item.fooditem_id})
      setRefresh(!refresh)
  

    }
    else
    {
    item['qtydemand']=value
    dispatch({type:'ADD_ITEM',payload:[item.fooditem_id,item]})
    setRefresh(!refresh)
    }
  };

  const displayFoodItems = () => {
    return foodItemsList.map((item, index) => {
      return (
        <div
          style={{
            border: "0.5px solid #dfe6e9",
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            margin: 10,
          }}
        >
          <div style={{ marginBottom: 5 }}>
          {item.fooditemtype="Veg"?<img src='/veg.png' width="10" style={{position:'absolute',zIndex:1,padding:10}}/>:<img src='/nonveg.jpg' width="10" style={{position:'absolute',zIndex:1,padding:10}}/>}
            <img
              src={`${ServerURL}/images/${item.fooditemimage}`}
              width="160"
              height="120"
              style={{ borderRadius: 5 }}
            />
          </div>
          <div
            style={{
              padding: 5,
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 1,
              whiteSpace: "nowrap",
              width: "140px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.fooditem}
          </div>
          <div
            style={{
              fontSize: 12,
              padding: 5,
              fontWeight: 600,
              letterSpacing: 1,
              whiteSpace: "nowrap",
              width: "140px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.ingredients}
          </div>
          <div
            style={{
              fontSize: 10,
              padding: 5,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            {item.offer == 0 ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontWeight: 600 }}>MRP &#8377; {item.price}</div>
                <div style={{ fontWeight: 800, color: "green" }}>&nbsp;</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontWeight: 600 }}>
                  MRP <s>&#8377; {item.price}</s> {item.offertype} &#8377;{" "}
                  {item.offer}
                </div>
                <div style={{ fontWeight: 800, color: "green" }}>
                  You Save &#8377; {item.price - item.offer}
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              fontSize: 12,
              padding: 5,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            <span>{item.ratings}/5</span> <img src="star1.png" width="15" />
          </div>
          <div
            style={{
              width: 150,
              justifyContent: "center",
              alignItems: "center",
              padding: 8,
              display: "flex",
            }}
          >
            <QtySpinner value={0} onChange={(value) => handleChange(value,item)} />
          </div>
        </div>
      );
    });
  };

  const showFoodtypeDesktop = () => {
    return foodType.map((item, index) => {
      return (
        <List className={classes.root}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src={`${ServerURL}/images/${item.foodimage}`}
              />
            </ListItemAvatar>
            <ListItemText
              primary={item.foodtype}
              secondary={""}
              onClick={() => fetchFoodItems(item.foodtype_id)}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      );
    });
  };

  const showFoodtypeMobile = () => {
    return foodType.map((item, index) => {
      return (
        <div
          onClick={() => fetchFoodItems(item.foodtype_id)}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 75,
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={`${ServerURL}/images/${item.foodimage}`}
          />
          <div style={{ fontSize: 7, fontWeight: 800, letterSpacing: 1 }}>
            {item.foodtype}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <Header history={props.history}  />
      <div className={classes.grow}>
        <div className={classes.sectionDesktop}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              width: "100%",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs="12" sm={6}>
                {showFoodtypeDesktop()}
              </Grid>
              <Grid item xs="12" sm={6}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {displayFoodItems()}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>

        <div className={classes.sectionMobile}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              width: "100%",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs="12" sm={6}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  {showFoodtypeMobile()}
                </div>
              </Grid>
              <Grid item xs="12" sm={6}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {displayFoodItems()}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}
