import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(orderid, orderdate, ordertime, mobileno, emailid) {
  return {
    orderid,
    orderdate,
    ordertime,
    mobileno,
    emailid,
   history: [
        { title: 'Food Item Id', field: 'fooditemid' },
        { title: 'Quantity', field: 'qtydemand' },
        { title: 'Price', field: 'price' },
        { title: 'Offer Price', field: 'offer' },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderid}
        </TableCell>
        <TableCell align="right">{row.orderdate}</TableCell>
        <TableCell align="right">{row.ordertime}</TableCell>
        <TableCell align="right">{row.mobileno}</TableCell>
        <TableCell align="right">{row.emailid}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
               Transaction Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Food Item Id</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Offer Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.fooditemid}>
                      <TableCell component="th" scope="row">
                        {historyRow.fooditemid}
                      </TableCell>
                      <TableCell>{historyRow.quantity}</TableCell>
                      <TableCell align="right">{historyRow.price}</TableCell>
                      <TableCell align="right">{historyRow.offer}</TableCell>
                      {/* <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    orderid: PropTypes.number.isRequired,
    orderdate: PropTypes.number.isRequired,
    ordertime: PropTypes.number.isRequired,
    mobileno: PropTypes.number.isRequired,
    emailid: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        fooditemid: PropTypes.number.isRequired,
        quantity: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        offer: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
    { title: 'Order Id', field: 'orderid' },
    { title: 'Order Date', field: 'orderdate' },
    { title: 'Order Time', field: 'ordertime' },
    { title: 'Mobile No.', field: 'mobileno' },
    { title: 'Email Id', field: 'emailid' },
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order Id</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right">Order Time</TableCell>
            <TableCell align="right">Mobile No</TableCell>
            <TableCell align="right">Email Id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.offerid} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}