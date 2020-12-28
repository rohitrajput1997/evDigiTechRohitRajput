/** @format */

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { CallOutlined, FaceOutlined, Payment, Today } from "@material-ui/icons";
import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import LocalStorage from "../Common/LocalStorage";
import { employeeList } from "../Redux/Action/Action";
import { addLoader, popUp, removeLoader } from "../Utils/Utils";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: "#0f2862",
    boxShadow: "1px 2px 8px gray",
  },
  form: {
    marginTop: theme.spacing(2),
    color: "#0f2862",
    fontSize: "12px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    display: "block",
    backgroundColor: "#0f2862",
    width: "140px",
    height: "40px",
    boxShadow: "1px 2px 12px gray",
  },
}));

function AddEmployee(props) {
  const classes = useStyles();
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    age: "",
    salary: "",
    phone: "",
  });
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    age: "",
    salary: "",
    phone: "",
  });
  const handleKeydown = (event) => {
    if (event.keyCode === 13) {
      handleAddEmployee();
    }
  };
  const handleOnchangefields = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
    validation(event);
  };

  const validation = (e) => {
    const { name } = e.target;
    switch (name) {
      case "firstName":
        if (e.target.value === "") {
          setError({ ...error, firstName: "Can't Blank" });
        } else {
          setError({ ...error, firstName: "" });
        }
        break;
      case "lastName":
        if (e.target.value === "") {
          setError({ ...error, lastName: "Can't Blank" });
        } else {
          setError({ ...error, lastName: "" });
        }
        break;
      case "phone":
        var phone = e.target.value;
        if (!Number(phone)) {
          setError({ ...error, phone: "Please Valid Mobile Number" });
        } else {
          setError({ ...error, phone: "" });
        }
        break;
      case "age":
        var age = e.target.value;
        if (!Number(age) || e.target.value < 18 || e.target.value > 60) {
          setError({ ...error, age: "Age are not Valid" });
        } else {
          setError({ ...error, age: "" });
        }
        break;
      case "salary":
        var salary = e.target.value;
        if (!Number(salary)) {
          setError({ ...error, salary: "Please fill vaild input" });
        } else {
          setError({ ...error, salary: "" });
        }
        break;
      default:
    }
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const firstName = value.firstName;
    const lastName = value.lastName;
    const phoneNumber = value.phone;
    const age = value.age;
    const salary = value.salary;
    const companyId = LocalStorage.getUser()[0]._id;
    let fullName = firstName.concat(" ", lastName);
    const AddEmployee = { fullName, phoneNumber, age, salary, companyId };
    if (
      fullName !== "" &&
      phoneNumber !== "" &&
      age !== "" &&
      salary !== "" &&
      companyId !== "" &&
      error === ""
    ) {
      addLoader();
      axios
        .post("http://localhost:4000/employee/insert", AddEmployee)
        .then((response) => {
          if (response.status === 200) {
            props.dispatch(employeeList());
            setValue({
              firstName: "",
              lastName: "",
              age: "",
              salary: "",
              phone: "",
            });
            popUp("Employee Add", "success", true);
          }
          removeLoader();
        })
        .catch((err) => {
          removeLoader();
          popUp(err.message, "error", true);
        });
    } else {
      popUp("Some Fields are Empty", "error", true);
    }
  };
  return (
    <Container maxWidth="sm">
      <Card className="Card shadow">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {LocalStorage.getUser()[0].name.charAt(0)}
            </Avatar>
          }
          title="Add Employee"
          subheader={LocalStorage.getUser()[0].name}
        >
          Add Employee
        </CardHeader>
        <Divider />
        <Container maxWidth="lg">
          <CardContent>
            <div className={classes.form}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={2}>
                  <FaceOutlined />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    label="First Name"
                    required
                    name="firstName"
                    fullWidth
                    onChange={handleOnchangefields}
                    value={value.firstName}
                  />
                  <small style={{ color: "red" }}>{error.firstName}</small>
                </Grid>

                <Grid item xs={5}>
                  <TextField
                    type="text"
                    label="Last Name"
                    required
                    name="lastName"
                    fullWidth
                    onChange={handleOnchangefields}
                    value={value.lastName}
                  />
                  <small style={{ color: "red" }}>{error.lastName}</small>
                </Grid>

                <Grid item xs={2}>
                  <Today />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    required
                    label="Age"
                    type="text"
                    name="age"
                    value={value.age}
                    onChange={handleOnchangefields}
                  />
                  <small style={{ color: "red" }}>{error.age}</small>
                </Grid>
                <Grid item xs={2}>
                  <CallOutlined />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    required
                    label="Phone Number"
                    type="text"
                    name="phone"
                    value={value.phone}
                    onChange={handleOnchangefields}
                  />
                  <small style={{ color: "red" }}>{error.phone}</small>
                </Grid>
                <Grid item xs={2}>
                  <Payment />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    required
                    label="Salary"
                    type="text"
                    name="salary"
                    value={value.salary}
                    onChange={handleOnchangefields}
                    onKeyDown={handleKeydown}
                  />
                  <small style={{ color: "red" }}>{error.salary}</small>
                </Grid>
              </Grid>
            </div>
          </CardContent>
          <CardActions disableSpacing>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleAddEmployee}
            >
              Add Employee
            </Button>
          </CardActions>
        </Container>
      </Card>
    </Container>
  );
}

export default connect()(AddEmployee);
