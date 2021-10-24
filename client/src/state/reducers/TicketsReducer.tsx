import {
    TICKETS_SUCCESS, 
    TicketDispatchTypes, 
    Ticket, 
    HIDE_TICKET,
    RESTORE_TICKETS} from '../action-type';

interface TicketsState{
    tickets : Ticket[],
    hiddenCurrentPageTickets: Ticket[],
    currentPage: number,
	totalPages: number,
	search: string;
}

const initialState : TicketsState = {
    tickets : [],
    hiddenCurrentPageTickets: [],
    // currentPageTickets: [],
    totalPages : 0,
    search : '',
    currentPage : 1
}

const ticketsReducer = (state : TicketsState = initialState, action : TicketDispatchTypes) => {
    switch (action.type) {
        case TICKETS_SUCCESS:
            return {
                tickets: action.payload.paginatedData.sort((a, b) => a.id.localeCompare(b.id)),
                currentPage : 1,
                hiddenCurrentPageTickets: [],
                totalPages : action.payload.totalPages,
                search : ''
            } 
        case HIDE_TICKET:
            let idToHide = action.payload
            let index = state.tickets.findIndex(function(o){
                return o.id === idToHide;
            })
    
            let ticketToHide = state.tickets.splice(index, 1)[0];

            return{
                tickets: state.tickets.sort((a, b) => a.id.localeCompare(b.id)),
                currentPage : state.currentPage,
                hiddenCurrentPageTickets: [...state.hiddenCurrentPageTickets, ticketToHide],
                totalPages : state.totalPages,
                search : state.search
            }  
        
        case RESTORE_TICKETS:
            let restored = [...state.hiddenCurrentPageTickets, ...state.tickets]

            return{
                tickets: restored.sort((a, b) => a.id.localeCompare(b.id)),
                currentPage : state.currentPage,
                hiddenCurrentPageTickets: [],
                totalPages : state.totalPages,
                search : state.search
            }
        default:
            return state
        }
}

export default ticketsReducer;