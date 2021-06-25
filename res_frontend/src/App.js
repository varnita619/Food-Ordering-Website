import AddNewRestaurant from "../src/component/superamin/AddNewRestaurant";
import AllRestaurant from "../src/component/superamin/AllRestaurant";
import FoodTypes from "./component/restaurant/FoodTypes"
import FoodItems from "./component/restaurant/FoodItems"
import AllFoodTypes from "./component/restaurant/AllFoodTypes"
import AllFoodItems from "./component/restaurant/AllFoodItems"
import SuperAdminLogin from "./component/superamin/SuperAdminLogin";
import AdminDashBoard from "../src/component/superamin/AdminDashBoard";
import RestaurantLogin from "./component/restaurant/RestaurantLogin";
import RestaurantDashBoard from "./component/restaurant/RestaurantDashBoard";
import QrCodeGeneration from "./component/superamin/QrCodeGeneration";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./component/ClientView/Header"
import Home from "./component/ClientView/Home"
import QtySpinner from "./component/ClientView/QtySpinner"
import Signin from "./component/ClientView/Signin";
import Signup from "./component/ClientView/Signup";
import ShowCart from "./component/ClientView/ShowCart";
import MakePayment from "./component/ClientView/MakePayment";
import PaymentGateway from "./component/ClientView/PaymentGateway";
import Page1 from"./component/ClientView/Page1";
import Page2 from "./component/ClientView/Page2";


function App(props) {
  return (
    <div>
      <Router>
        <Route
          exact
          strict
          component={AddNewRestaurant}
          path="/addnewrestaurant"
          history={props.history}
        ></Route>

        <Route
          exact
          strict
          component={AllRestaurant}
          path="/allrestaurant"
          history={props.history}
        ></Route>

<Route
      exact
      strict
        component={FoodTypes}
        path="/foodtypes"
        history={props.history}
      ></Route>

<Route
      exact
      strict
        component={AllFoodTypes}
        path="/allfoodtypes"
        history={props.history}
      ></Route>

<Route
      exact
      strict
        component={FoodItems}
        path="/fooditems"
        history={props.history}
      ></Route>

<Route
      exact
      strict
        component={AllFoodItems}
        path="/allfooditems"
        history={props.history}
      ></Route>

        <Route
          exact
          strict
          component={SuperAdminLogin}
          path="/superadminlogin"
          history={props.history}
        ></Route>

        <Route
          exact
          strict
          component={AdminDashBoard}
          path="/admindashboard"
          history={props.history}
        ></Route>

       <Route
          exact
          strict
          component={RestaurantLogin}
          path="/restaurantlogin"
          history={props.history}
        ></Route>

        <Route
          exact
          strict
          component={RestaurantDashBoard}
          path="/restaurantdashboard"
          history={props.history}
        ></Route>

<Route
          exact
          strict
          component={QrCodeGeneration}
          path="/qrcodegeneration"
          history={props.history}
        ></Route>

<Route
          exact
          strict
          component={Header}
          path="/header"
          history={props.history}
        ></Route>

<Route
          exact
          strict
          component={Home}
          path="/home"
          history={props.history}
        ></Route>

<Route
          exact
          strict
          component={QtySpinner}
          path="/qtyspinner"
          history={props.history}
        ></Route>

<Route
          exact
          strict
          component={Signup}
          path="/signup"
          history={props.history}
        ></Route>

<Route
          exact
          strict
          component={Signin}
          path="/signin"
          history={props.history}
        ></Route>

<Route
          exact
          strict
          component={ShowCart}
          path="/showcart"
          history={props.history}
        ></Route>

<Route
          exact
          strict
          component={MakePayment}
          path="/makepayment"
          history={props.history}
        ></Route>

<Route
          exact
          strict
          component={PaymentGateway}
          path="/paymentgateway"
          history={props.history}
        ></Route>

<Route
          exact
          strict
          component={Page1}
          path="/page1"
          history={props.history}
        ></Route>

<Route
          exact
          strict
          component={Page2}
          path="/page2"
          history={props.history}
        ></Route>




      </Router>
    </div>
  );
}

export default App;

