import React from 'react';
import './App.scss';
import {createApiClient, Ticket} from './api';
import ShowMoreText from "react-show-more-text";

export type AppState = {
	tickets?: Ticket[],
	hiddenTickets: Ticket[],
	search: string;
}

const api = createApiClient();

export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
		hiddenTickets: [],
		search: ''
	}

	searchDebounce: any = null;

	async componentDidMount() {
		this.setState({
			tickets: await (await api.getTickets()).sort((a, b) => a.id.localeCompare(b.id))
		});
	}

	renderTickets = (tickets: Ticket[]) => {

		const filteredTickets = tickets
			.filter((t) => (t.title.toLowerCase() + t.content.toLowerCase()).includes(this.state.search.toLowerCase()));

		const addToHidden = (val: string) => {
			let index = filteredTickets.findIndex(function(o){
				return o.id === val;
		   })

			let ticketToHide = filteredTickets.splice(index, 1)[0];
		   
			this.setState({
				hiddenTickets : [...this.state.hiddenTickets,ticketToHide].sort((a, b) => a.id.localeCompare(b.id)),
				tickets : [...filteredTickets].sort((a, b) => a.id.localeCompare(b.id))
			})
		   
		}

		return (<ul className='tickets'>
			{filteredTickets.map((ticket) => (<li key={ticket.id} className='ticket'>
				<div className='hide' onClick={()=> addToHidden(ticket.id)}> Hide</div>
				<h5 className='title'>{ticket.title}</h5>
				<ShowMoreText
                /* Default options */
                lines={3}
                more="Show more"
                less="Show less"
                className="content-css"
                anchorClass="my-anchor-css-class"
                expanded={false}
                width={0}
                truncatedEndingComponent={"... "}
            >
				<p className='content'>{ticket.content}</p>
			</ShowMoreText>
				
				{ticket.labels ? <ul className='labels'>{ticket.labels.map(l => <li className='label'>{l}</li>)}</ul> : null}
				<footer>
					<div className='meta-data'>By {ticket.userEmail} | { new Date(ticket.creationTime).toLocaleString()}</div>
				</footer>
			</li>))}
		</ul>);
	}

	onSearch = async (val: string, newPage?: number) => {
		
		clearTimeout(this.searchDebounce);

		this.searchDebounce = setTimeout(async () => {
			this.setState({
				search: val
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

	render() {	
		const {tickets} = this.state;
		const {hiddenTickets} = this.state

		return (<main>
			<h1>Tickets List</h1>
			<header>
				<input type="search" placeholder="Search..." onChange={(e) => this.onSearch(e.target.value)}/>
			</header>
			{tickets ? <div className='results'>Showing {tickets.length} results ({hiddenTickets.length} hidden tickets - <span id='restoreTickets' onClick={()=> this.restoreTickets()}>restore</span>)</div> : null }
			{tickets ? this.renderTickets(tickets) : <h2>Loading..</h2>}
		</main>)
	}
}

export default App;