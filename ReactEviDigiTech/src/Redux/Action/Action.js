/** @format */

import axios from "axios";
import { addLoader, popUp, removeLoader } from "../../Utils/Utils";
export function employeeList() {
  return (dispatch) => {
    return (
      addLoader(),
      axios
        .get("employee/fetch")
        .then((response) => {
          dispatch(fetchEmployee(response.data));
          removeLoader();
          return response.data;
        })
        .catch((err) => {
          popUp(err.message, "error", true);
          removeLoader();
        })
    );
  };
}

export const FETCH_EMPLOYEE_DATA = "FETCH_EMPLOYEE_DATA";

export const fetchEmployee = (employeeList) => ({
  type: FETCH_EMPLOYEE_DATA,
  payload: { employeeList },
});
