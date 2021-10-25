export const GET_TICKETS_BY_FILTER = "GET_TICKETS_BY_FILTER";
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


  export interface GetTicketsByFilter {
    type: typeof GET_TICKETS_BY_FILTER,
    payload: jsonObj
  }

  export interface HideTicket {
    type: typeof HIDE_TICKET,
    payload: string
  }

  export interface Restore {
    type: typeof RESTORE_TICKETS,
  }
  
  export type AllDispatchTypes = GetTicketsByFilter | HideTicket | Restore