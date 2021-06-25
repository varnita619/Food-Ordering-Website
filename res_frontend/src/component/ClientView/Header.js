import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import { useSelector } from "react-redux";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import MoreIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import { ServerURL } from "../../FetchNodeServices";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { Button, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: 350,
    padding: 5,
  },
  fullList: {
    width: "auto",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  var restaurant = useSelector((state) => state.restaurant);
  //alert(JSON.stringify(restaurant));
  var rest = Object.values(restaurant)[0];
  //alert(rest);

  var cart = useSelector((state) => state.cart);
  var keys = Object.keys(cart);
  var values = Object.values(cart);
  var totalamt = values.reduce(calculate, 0);
  var totalsaving = values.reduce(totaloffer, 0);

  function calculate(prev, item) {
    var price =
      item.offer == 0
        ? item.qtydemand * item.price
        : item.qtydemand * item.offer;
    return prev + price;
  }

  function totaloffer(prev, item) {
    var price =
      item.offer > 0 ? (item.price - item.offer) * item.qtydemand : item.offer;
    return prev + price;
  }

  var netamount = totalamt - totalsaving;

  //////////////////////////DRAWER//////////////////
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleProceed = () => {
    props.history.push({ pathname: "/signin" });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Paper
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 15,
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: 1,
          marginBottom: 5,
        }}
      >
        Food Selected({keys.length})
      </Paper>
      <Grid container spacing={1} style={{ marginBottom: 5 }}>
        {showFoodCart()}
      </Grid>

      <div
        style={{
          background: "#f5f6fa",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: 2,
          marginBottom: 5,
        }}
      >
        Payment Details
      </div>
      <div style={{ padding: 5 }}>
        <Grid container spacing={1}>
          <Grid item xs={6} style={{ padding: 3 }}>
            Total Amount:
          </Grid>
          <Grid item xs={6} style={{ textAlign: "right" }}>
            &#8377; {totalamt}
          </Grid>

          <Grid item xs={6} style={{ padding: 3 }}>
            Total Saving:
          </Grid>
          <Grid item xs={6} style={{ textAlign: "right" }}>
            &#8377; {totalsaving}
          </Grid>

          <Grid item xs={6} style={{ padding: 3 }}>
            Delivery Charges:
          </Grid>
          <Grid item xs={6} style={{ textAlign: "right" }}>
            &#8377; {0}
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6} style={{ padding: 3 }}>
            Net Amount:
          </Grid>
          <Grid item xs={6} style={{ textAlign: "right" }}>
            &#8377; {netamount}
          </Grid>
        </Grid>
      </div>
      <div style={{ padding: 3, marginTop: 10 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleProceed()}
          color="primary"
          style={{background:'#006266'}}
        >
          Proceed
        </Button>
      </div>
    </div>
  );

  const showFoodCart = () => {
    return values.map((items) => {
      return (
        <>
          <Grid item xs={3}>
            <img
              src={`${ServerURL}/images/${items.fooditemimage}`}
              style={{ borderRadius: 5 }}
              width="60"
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <div style={{ fontWeight: 600 }}>{items.fooditem}</div>
            <div>
              {items.offer > 0 ? (
                <span>
                  <s>&#8377; {items.price}</s> {items.offertype} &#8377;{" "}
                  {items.offer} X {items.qtydemand}
                </span>
              ) : (
                <span>
                  &#8377; {items.price} X {items.qtydemand}
                </span>
              )}
            </div>
          </Grid>
          <Grid
            item
            xs={3}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <div>
              <DeleteOutline />
            </div>

            {items.offer == 0 ? (
              <div>&#8377; {items.price * items.qtydemand}</div>
            ) : (
              <div>&#8377; {items.offer * items.qtydemand}</div>
            )}
          </Grid>
          <Grid items xs={12} style={{ padding: 3 }}>
            <Divider />
          </Grid>
        </>
      );
    });
  };

  ///////////////////////////////////////

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSearch=(event)=>{
   try{
    props.searchFood(event.target.value)
   }
   catch(e){}

  }
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          onClick={toggleDrawer("right", true)}
          aria-label="show 11 new notifications"
          color="inherit"
        >
           
            <ShoppingCart />
          
        </IconButton>
        <p>Your Orders</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    
      <AppBar position="sticky" style={{background:'#006266'}}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
           // aria-label="open drawer"

            aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
          >
            <MenuIcon />
          </IconButton>
          {JSON.stringify(restaurant)!='{}' ? (
            <div className={classes.title}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={`${ServerURL}/images/${rest.logo}`}
                  width="25"
                  height="25"
                />
                <div style={{ marginLeft: 8, fontWeight: "bold" }}>
                  {rest.restaurant_name}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={(event)=>handleSearch(event)}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              onClick={toggleDrawer("right", true)}
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={keys.length} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
          <IconButton
              onClick={toggleDrawer("right", true)}
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={keys.length} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
             </div>
        </Toolbar>
     
      {renderMobileMenu}
      {renderMenu}

      <div>
        <React.Fragment key={"right"}>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </React.Fragment>
      </div>
      </AppBar>
  );
}
