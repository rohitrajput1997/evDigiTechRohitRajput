/** @format */

import { FETCH_EMPLOYEE_DATA } from "../Action/Action";
const initialState = {
  employeeList: [],
};

export default function employeeFetch(state = initialState, action) {
  switch (action.type) {
    case FETCH_EMPLOYEE_DATA:
      return {
        ...state,
        employeeList: action.payload.employeeList,
      };
    default:
      return state;
  }
}
