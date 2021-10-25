import {Dispatch} from "redux";
import { createApiClient } from "../../api";
import {
    HIDE_TICKET, 
    AllDispatchTypes, 
    GET_TICKETS_BY_FILTER,
    RESTORE_TICKETS,
} from "../action-type/index";

export const api = createApiClient()

export const getTicketsFromServer = (searchVal:string, pageNum:number) => async (dispatch: Dispatch<AllDispatchTypes>) => {
    try {
      const res = await api.getTickets(searchVal, pageNum)
  
      dispatch({
        type: GET_TICKETS_BY_FILTER,
        payload: res
      })
  
    } catch(e) {
      
    }
  };


  export const hideTicket = (id : string) => (dispatch: Dispatch<AllDispatchTypes>) => {
    dispatch({
        type: HIDE_TICKET,
        payload: id
    })
  }


  export const restoreTickets = () => (dispatch: Dispatch<AllDispatchTypes>) => {
    dispatch({
        type: RESTORE_TICKETS
    })
  }



  