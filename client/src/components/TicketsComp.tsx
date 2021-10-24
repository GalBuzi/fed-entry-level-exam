import React, {useState, useEffect} from 'react';
// import {createApiClient, Ticket} from '../api';
import { useDispatch , useSelector} from "react-redux"
// import { bindActionCreators } from 'redux';
import {State} from "../state/index"
import ShowMoreText from "react-show-more-text";
import '../App.scss'
import {getTicketsFromServer, restoreTickets} from '../state/actions/index'
import TicketComp from './TicketComp';



function TicketsComp() { 
	const dispatch = useDispatch()
	const state = useSelector((state:State)=> state.tickets)

	console.log(state)

	useEffect(()=>{ 
		dispatch(getTicketsFromServer('',1))
	}, [])

	const restoreAllHidden = () => {
		dispatch(restoreTickets())
	}

	return (<div>
		{state.tickets ? <div className='results'>Showing {state.tickets.length} results ({state.hiddenCurrentPageTickets.length} hidden tickets - <span id='restoreTickets' onClick={()=> restoreAllHidden()}>restore</span>)</div> : null }

		{state.tickets.map((ticket)=> (<ul className='tickets'>
			<li className='ticket'>
			<TicketComp id = {ticket.id} title={ticket.title} content = {ticket.content}
				creationTime={ticket.creationTime} labels={ticket.labels} userEmail={ticket.userEmail} />
		</li>
		</ul>))}
		
	</div>)
	
}

export default TicketsComp;