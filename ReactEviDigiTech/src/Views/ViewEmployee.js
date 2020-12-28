/** @format */

import {
  Container,
  Divider,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { employeeList } from "../Redux/Action/Action";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  table: {
    minWidth: 500,
  },
  container: {
    maxHeight: 440,
    maxWidth: 700,
  },
});

const rows = [
  { id: "serial", label: "Serial No", maxWidth: "50", align: "center" },
  { id: "FullName", label: "Full Name", maxWidth: "100", align: "left" },
  { id: "Age", label: "Age", maxWidth: "100", align: "left" },
  { id: "Phone", label: "Phone", maxWidth: "100", align: "left" },
  { id: "Salary", label: "Salary", maxWidth: "100", align: "left" },
];
const EnhancedTableToolbar = () => {
  return (
    <Toolbar>
      <Typography variant="h6" id="tableTitle" component="div">
        List of Employee{" "}
      </Typography>
    </Toolbar>
  );
};
function ViewEmployee(props) {
  const classes = useStyles();

  useEffect(() => {
    if (props.data.employeeFetch.employeeList.length === 0) {
      props.dispatch(employeeList());
    }
  }, []);
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <TableContainer component={Paper} className="shadow">
          <EnhancedTableToolbar />
          <Divider />
          {props.data.employeeFetch.employeeList.length !== 0 ? (
            <Table stickyHeader className={classes.table}>
              <caption>
                List of employee is{" "}
                {props.data.employeeFetch.employeeList.length}{" "}
              </caption>
              <TableHead>
                <TableRow hover role="checkbox">
                  {rows.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ maxWidth: column.maxWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.data.employeeFetch.employeeList.map((item, index) => (
                  <TableRow hover role="checkbox" key={index}>
                    <TableCell align={"center"}>{index + 1}</TableCell>
                    <TableCell align={"left"}>{item.name}</TableCell>
                    <TableCell align={"left"}>{item.age}</TableCell>
                    <TableCell align={"left"}>{item.phoneNumber}</TableCell>
                    <TableCell align={"left"}>{item.salary}/-</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <center>
              <br />
              <Typography component="h1">No Data Found</Typography>
              <br />
            </center>
          )}
        </TableContainer>
      </Container>
    </div>
  );
}
const mapStateToProps = (state) => ({
  data: state,
});

export default connect(mapStateToProps)(ViewEmployee);
