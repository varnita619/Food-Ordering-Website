import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import {getData,postData} from "../../FetchNodeServices";


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

export default function AllOrders(props) {
    const classes = useStyles();
    const [list,setList]=useState([]);
    const [lists,setLists]=useState([]);
    const [getRowData, setRowData] = useState([]);
    const [orderdate,setOrderDate]=useState("");
    const [ordertime,setOrderTime]=useState("");
    const [mobileno,setMobileNo]=useState("");
    const [emailid,setEmailId]=useState("");
    const [fooditemid,setFoodItemId]=useState("");
    const [quantity,setQuantity]=useState("");
    const [price,setPrice]=useState("");
    const [offer,setOffer]=useState("");

    const fetchOrders = async () => {
      var body = {
        orderid:getRowData.orderid,
        orderdate: orderdate,
        ordertime: ordertime,
        mobileno: mobileno,
        emailid: emailid,
      }
        var res = await getData("orders/listorders",body);
        setList(res);
      };
    const fetchOrderDetails = async()=>{
      var body={
        "orderid":getRowData.orderid,
        fooditemid: fooditemid,
        quantity: quantity,
        price: price,
        offer: offer,

      }
        var result = await postData("orders/listordersdata",body)
        setLists(result);
    }
    
      useEffect(function () {
        fetchOrders();
        fetchOrderDetails();
      }, []);

      const handleSubmit = (data)=>{
        setOrderDate(data.orderdate);
        setOrderTime(data.ordertime);
        setMobileNo(data.mobileno);
        setEmailId(data.emailid);
        setFoodItemId(data);
        setQuantity(data);
        setPrice(data);
        setOffer(data);
        
        setRowData(data);
        
      }


    return (
        <div className={classes.root}>
      <div className={classes.subdiv}>
      <MaterialTable
          columns={[
            { title: 'Order Id', field: 'orderid',
            render: (rowData) => (
              <div style={{ flexDirection: "column" }}>
                <div>{rowData.orderid}</div>
              </div>
            ), },
            { title: 'Order Date', field: 'orderdate',
            render: (rowData) => (
              <div style={{ flexDirection: "column" }}>
                <div>{rowData.orderdate}</div>
              </div>
            ), },
            { title: 'Order Time', field: 'ordertime',
            render: (rowData) => (
              <div style={{ flexDirection: "column" }}>
                <div>{rowData.ordertime}</div>
              </div>
            ), },
            { title: 'Mobile No.', field: 'mobileno',
            render: (rowData) => (
              <div style={{ flexDirection: "column" }}>
                <div>{rowData.mobileno}</div>
              </div>
            ), },
            { title: 'Email Id', field: 'emailid',
            render: (rowData) => (
              <div style={{ flexDirection: "column" }}>
                <div>{rowData.emailid}</div>
              </div>
            ), },
            
          ]}
          
          data={list}
          title="Orders Information"
          detailPanel={rowData => {           
          return(
            <div>
            <MaterialTable
        columns={[
            { title: 'Food Item Id', field: 'fooditemid' },
            { title: 'Quantity', field: 'qtydemand' },
            { title: 'Price', field: 'price' },
            { title: 'Offer Price', field: 'offer' },
            
          ]}
          data={rowData.lists}
          title="Transaction Details"
          />
          </div>
          )
          }}
          onRowClick={(event, rowData, handleSubmit) => handleSubmit(rowData)}
        />
      
        
      </div>
      </div>
    )
    }
