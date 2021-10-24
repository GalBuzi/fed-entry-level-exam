import {Dispatch} from "redux";
import { createApiClient } from "../../api";
import {
    HideTicket, HIDE_TICKET, 
    TicketDispatchTypes, 
    TICKETS_SUCCESS,
    RESTORE_TICKETS, restore
} from "../action-type/index";

export const api = createApiClient()

export const getTicketsFromServer = (searchVal:string, pageNum:number) => async (dispatch: Dispatch<TicketDispatchTypes>) => {
    try {
      const res = await api.getTickets(searchVal, pageNum)
  
      dispatch({
        type: TICKETS_SUCCESS,
        payload: res
      })
  
    } catch(e) {
      
    }
  };


  export const hideTicket = (id : string) => (dispatch: Dispatch<HideTicket>) => {
    dispatch({
        type: HIDE_TICKET,
        payload: id
    })
  }


  export const restoreTickets = () => (dispatch: Dispatch<restore>) => {
    dispatch({
        type: RESTORE_TICKETS
    })
  }



  