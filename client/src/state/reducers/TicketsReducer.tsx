import {
  GET_TICKETS_BY_FILTER,
  AllDispatchTypes,
  HIDE_TICKET,
  RESTORE_TICKETS,
} from "../action-type";
import { Ticket } from "../../api";

interface TicketsState {
  tickets: Ticket[];
  hiddenCurrentPageTickets: Ticket[];
  currentPage: number;
  totalPages: number;
  search: string;
  activeLabels: string[];
}

const initialState: TicketsState = {
  tickets: [],
  hiddenCurrentPageTickets: [],
  totalPages: 0,
  search: "",
  currentPage: 1,
  activeLabels: [],
};

const ticketsReducer = (
  state: TicketsState = initialState,
  action: AllDispatchTypes
) => {
  switch (action.type) {
    case GET_TICKETS_BY_FILTER:
      return {
        tickets: action.payload.paginatedData.sort((a, b) =>
          a.id.localeCompare(b.id)
        ),
        hiddenCurrentPageTickets: [],
        currentPage: action.payload.pageNum,
        totalPages: action.payload.totalPages,
        search: action.payload.searchVal,
        activeLabels: action.payload.activeLabels,
      };

    case HIDE_TICKET:
      let idToHide = action.payload;
      let index = state.tickets.findIndex(function (o) {
        return o.id === idToHide;
      });

      let ticketToHide = state.tickets.splice(index, 1)[0];

      return {
        tickets: state.tickets.sort((a, b) => a.id.localeCompare(b.id)),
        currentPage: state.currentPage,
        hiddenCurrentPageTickets: [
          ...state.hiddenCurrentPageTickets,
          ticketToHide,
        ],
        totalPages: state.totalPages,
        search: state.search,
        activeLabels: state.activeLabels,
      };

    case RESTORE_TICKETS:
      let restored = [...state.hiddenCurrentPageTickets, ...state.tickets];

      return {
        tickets: restored.sort((a, b) => a.id.localeCompare(b.id)),
        currentPage: state.currentPage,
        hiddenCurrentPageTickets: [],
        totalPages: state.totalPages,
        search: state.search,
        activeLabels: state.activeLabels,
      };
    default:
      return state;
  }
};

export default ticketsReducer;
