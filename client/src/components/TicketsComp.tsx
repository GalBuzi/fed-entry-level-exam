import React, {useEffect} from 'react';
import { useDispatch , useSelector} from "react-redux"
import {State} from "../state/index"
import '../App.scss'
import {getTicketsFromServer, restoreTickets} from '../state/actions/index'
import TicketComp from './TicketComp';



function TicketsComp() { 
	const dispatch = useDispatch()
	const state = useSelector((state:State)=> state.tickets)

	useEffect(()=>{ 
		let FilterParams = {
			searchVal : '',
			pageNum : 1,
			// before_after : false,
			// date: 0,
			// from: ''
		}
		dispatch(getTicketsFromServer(FilterParams))
	}, [dispatch])

	const restoreAllHidden = () => {
		dispatch(restoreTickets())
	}

	return (<div>
		{state.tickets ? <div className='results'>Showing {state.tickets.length} results ({state.hiddenCurrentPageTickets.length} hidden tickets - <span id='restoreTickets' onClick={()=> restoreAllHidden()}>restore</span>)</div> : null }

		{state.tickets.map((ticket)=> (<ul key={ticket.id} className='tickets'>
			<li  className='ticket'>
			<TicketComp id = {ticket.id} title={ticket.title} content = {ticket.content}
				creationTime={ticket.creationTime} labels={ticket.labels} userEmail={ticket.userEmail} />
			</li>
		</ul>))}
		
	</div>)
	
}

export default TicketsComp;