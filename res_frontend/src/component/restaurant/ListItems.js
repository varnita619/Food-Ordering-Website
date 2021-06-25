import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FoodTypes from "./FoodTypes"
import FoodItems from "./FoodItems"
import AllFoodTypes from "./AllFoodTypes"
import AllOrders from "./AllOrders"
import AllFoodItems from "./AllFoodItems";
import AllOrdersDetails from "./AllOrdersDetails";



export default function ListItems(props) {

 const handleClick=(component)=>{
 props.setDashBoardView(component)



 }




  const mainListItems = () => {
    return (
      <div>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Add Food Type" onClick={()=>handleClick(<FoodTypes restaurant={props.restaurant}/>)} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="List Food Type" onClick={()=>handleClick(<AllFoodTypes/>)} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Add Food Items"  onClick={()=>handleClick(<FoodItems restaurant={props.restaurant}/>)} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="List Food Items"  onClick={()=>handleClick(<AllFoodItems/>)} />
        </ListItem>
      </div>
    );
  };

  const secondaryListItems = () => {
    return (
      <div>
        <ListSubheader inset>Order's Information</ListSubheader>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Current Order" onClick={()=>handleClick(<AllOrders/>)} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Current Order Details" onClick={()=>handleClick(<AllOrdersDetails/>)} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Year-end sale" />
        </ListItem>
      </div>
    );
  };

  return (
    <div>
      {mainListItems()}
      {secondaryListItems()}
    </div>
  );
}
