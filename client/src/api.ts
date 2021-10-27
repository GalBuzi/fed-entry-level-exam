import axios from "axios";
import { FilterParams } from "./state/actions/index";
import { jsonObj } from "./state/action-type";

export type Ticket = {
  id: string;
  title: string;
  content: string;
  creationTime: number;
  userEmail: string;
  labels?: string[];
};

export type ApiClient = {
  getTickets: (FilterParams: FilterParams) => Promise<jsonObj>;
};

export const createApiClient = (): ApiClient => {
  return {
    getTickets: (FilterParams: FilterParams) => {
      return axios
        .get(`http://localhost:3232/api/tickets`, { params: FilterParams })
        .then((res) => res.data);
    },
  };
};
