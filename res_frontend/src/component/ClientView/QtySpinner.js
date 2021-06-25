import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { PortraitSharp } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({}));

export default function QtySpinner(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.value);
  const handleIncreament = () => {
    var c = value + 1;
    setValue(c);
    props.onChange(c);
  };

  const handleDecreament = () => {
    if (value >= 0) {
      var c = value - 1;
      setValue(c);
      props.onChange(c);
    }
  };

  return (
    <div>
      {value > 0 ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Avatar
            onClick={() => handleDecreament()}
            style={{
              fontWeight: 800,
              fontSize: 16,
              width: 25,
              height: 25,
              background: "#006266",
              color: "#FFF",
            }}
          >
            -
          </Avatar>
          <div
            style={{
              fontWeight: 600,
              fontSize: 16,
              width: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {value}
          </div>
          <Avatar
            onClick={() => handleIncreament()}
            style={{
              fontWeight: 800,
              fontSize: 16,
              width: 25,
              height: 25,
              background: "#006266",
              color: "#FFF",
            }}
          >
            +
          </Avatar>
        </div>
      ) : (
        <div>
          <Button
            onClick={() => handleIncreament()}
            color="primary"
            variant="contained"
            style={{background:'#006266', height: 25, fontSize: 10, width: 150 }}
          >
            Add to Cart
          </Button>
        </div>
      )}
    </div>
  );
}
