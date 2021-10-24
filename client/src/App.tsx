import React from 'react';
import './App.scss';
import {createApiClient, Ticket} from './api';
import ReactPaginate from 'react-paginate';
import TicketsComp from './components/TicketsComp';
import SearchComp from './components/SearchComp';
import PaginationComp from './components/PaginationComp';

const api = createApiClient();

function App() { //} : React.FC<{}> = ({}) => {
	
    

	return (<div>
		<h1>Tickets List</h1>
		<SearchComp/>
		<TicketsComp/>
		<PaginationComp/>
		
	</div>)
	
}

export default App;