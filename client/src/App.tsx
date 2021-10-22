import React from 'react';
import './App.scss';
import {createApiClient, Ticket} from './api';
import ShowMoreText from "react-show-more-text";
// import Pagination from 'react-responsive-pagination';
import ReactPaginate from 'react-paginate';
// import 'bootstrap/dist/css/bootstrap.min.css';

export type AppState = {
	tickets?: Ticket[],
	hiddenTickets: Ticket[],
	currentPage: number,
	totalPages:number,
	search: string;
}

const api = createApiClient();

export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
		hiddenTickets: [],
		search: '',
		currentPage: 1,
		totalPages: 0,
	}

	searchDebounce: any = null;

	async componentDidMount() {
		let response = (await api.getTickets(this.state.search, this.state.currentPage))
		console.log(response.totalPages)
		this.setState({
			tickets: response.paginatedData.sort((a, b) => a.id.localeCompare(b.id)),
			totalPages : response.totalPages
		});
	}

	renderTickets = (tickets: Ticket[]) => {
		
		// const filteredTickets = tickets
		// 	.filter((t) => (t.title.toLowerCase() + t.content.toLowerCase()).includes(this.state.search.toLowerCase()));

		// const relevantFiltered = tickets.slice((this.state.currentPage - 1) * this.state.itemsPerPage, this.state.currentPage * this.state.itemsPerPage)

		const addToHidden = (val: string) => {
			let index = tickets.findIndex(function(o){
				return o.id === val;
		   })

			let ticketToHide = tickets.splice(index, 1)[0];
		   
			this.setState({
				hiddenTickets : [...this.state.hiddenTickets,ticketToHide].sort((a, b) => a.id.localeCompare(b.id)),
				tickets : [...tickets].sort((a, b) => a.id.localeCompare(b.id))
			})
		   
		}

		return (<ul className='tickets'>
			{tickets.map((ticket) => (<li key={ticket.id} className='ticket'>
				<div className='hide' onClick={()=> addToHidden(ticket.id)}> Hide</div>
				<h5 className='title'>{ticket.title}</h5>
				
				<ShowMoreText
                /* Default options */
                lines={3}
                more="Show more"
                less="Show less"
                expanded={false}
                width={0}
                truncatedEndingComponent={"... "}
            >
				<p className='content'>{ticket.content}</p>
			</ShowMoreText>
				
				{ticket.labels ? <ul className='labels'>{ticket.labels.map(l => <li key={l} className='label'>{l}</li>)}</ul> : null}
				<footer>
					<div className='meta-data'>By {ticket.userEmail} | { new Date(ticket.creationTime).toLocaleString()}</div>
				</footer>
			</li>))}
		</ul>);
	}

	onSearch = async (val: string, newPage?: number) => {
		
		clearTimeout(this.searchDebounce);

		this.searchDebounce = setTimeout(async () => {
			let response = (await api.getTickets(val,1))
			this.setState({
				currentPage: 1,
				search: val,
				tickets: response.paginatedData.sort((a, b) => a.id.localeCompare(b.id)),
				hiddenTickets : [],
				totalPages: response.totalPages
			});
		}, 300);

	}

	restoreTickets = ()=> {
		let t = this.state.tickets ? [...this.state.tickets , ...this.state.hiddenTickets].sort((a, b) => a.id.localeCompare(b.id)) : []
		this.setState({
			tickets:  t,
			hiddenTickets : []
		})
	}

	handlePageChange = async (pageNumber: number) => {
		let response = (await api.getTickets(this.state.search,pageNumber+1))
		console.log("handle Page Change");
		console.log(pageNumber+1);
		this.setState({
			currentPage: pageNumber+1,
			tickets: response.paginatedData.sort((a, b) => a.id.localeCompare(b.id)),
			totalPages: response.totalPages,
			hiddenTickets : []
		});
	}

	render() {	
		const {tickets} = this.state;
		const {hiddenTickets} = this.state
		const {search} = this.state
		const {currentPage} = this.state
		const {totalPages} = this.state




		return (<main>
			<h1>Tickets List</h1>
			<header>
				<input type="search" placeholder="Search..." onChange={(e) => this.onSearch(e.target.value,1)}/>
			</header>
			{tickets ? <div className='results'>Showing {tickets.length} results ({hiddenTickets.length} hidden tickets - <span id='restoreTickets' onClick={()=> this.restoreTickets()}>restore</span>)</div> : null }
			{tickets ? this.renderTickets(tickets) : <h2>Loading..</h2>}
			<div className='center'>
			<ReactPaginate
				forcePage = {currentPage-1}
				previousLabel={'previous'}
				nextLabel={'next'}
				breakLabel={'...'}
				breakClassName={'break-me'}
				pageCount={totalPages}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={(data)=>this.handlePageChange(data.selected)}
				containerClassName={'pagination'}
				activeClassName={'active'}
				breakLinkClassName={'page-link'}
				pageClassName={'page-item'}
				pageLinkClassName={'page-link'}
				previousClassName={'page-item'}
				previousLinkClassName={'page-link'}
				nextClassName={'page-item'}
				nextLinkClassName={'page-link'}
			/>	</div>		
			
		</main>)
	}
}

export default App;