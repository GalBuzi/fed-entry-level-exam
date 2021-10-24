export const TICKETS_SUCCESS = "TICKETS_SUCCESS";
export const HIDE_TICKET = "HIDE_TICKET"
export const RESTORE_TICKETS = "RESTORE_TICKETS"

export type Ticket = {
	id: string,
	title: string;
	content: string;
	creationTime: number;
	userEmail: string;
	labels?: string[];
}

export type jsonObj = {
	 paginatedData:Ticket[],
	 totalPages:number
  }


  export interface TicketSuccess {
    type: typeof TICKETS_SUCCESS,
    payload: jsonObj
  }

  export interface HideTicket {
    type: typeof HIDE_TICKET,
    payload: string
  }

  export interface restore {
    type: typeof RESTORE_TICKETS,
  }
  
  export type TicketDispatchTypes = TicketSuccess | HideTicket | restore