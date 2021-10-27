import { combineReducers } from "redux";
import ticketsReducer from "./TicketsReducer";

const reducers = combineReducers({
  tickets: ticketsReducer,
});

export default reducers;
