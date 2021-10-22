import axios from 'axios';

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
	 totalPages:number}

export type ApiClient = {
	getTickets: (searchVal:string, pageNum:number) => Promise<jsonObj>;
}

export const createApiClient = (): ApiClient => {
	return {
		getTickets: (searchVal:string, pageNum:number) => {
			return axios.get(`http://localhost:3232/api/tickets`, {params: {searchVal:searchVal, pageNum:pageNum}}).then((res) => res.data);
		}
	}
}



