import { Dispatch } from "redux";
import { createApiClient } from "../../api";
import {
  HIDE_TICKET,
  AllDispatchTypes,
  GET_TICKETS_BY_FILTER,
  RESTORE_TICKETS,
} from "../action-type/index";

export type FilterParams = {
  searchVal: string;
  pageNum: number;
  labels: string[];
};

export const api = createApiClient();

export const getTicketsFromServer =
  (FilterParams: FilterParams) =>
  async (dispatch: Dispatch<AllDispatchTypes>) => {
    const res = await api.getTickets(FilterParams);
    dispatch({
      type: GET_TICKETS_BY_FILTER,
      payload: res,
    });
  };

export const hideTicket =
  (id: string) => (dispatch: Dispatch<AllDispatchTypes>) => {
    dispatch({
      type: HIDE_TICKET,
      payload: id,
    });
  };

export const restoreTickets = () => (dispatch: Dispatch<AllDispatchTypes>) => {
  dispatch({
    type: RESTORE_TICKETS,
  });
};
