import React, { useEffect, useState } from 'react';
import '../App.scss'
import { useDispatch, useSelector} from "react-redux"
import {getTicketsFromServer} from '../state/actions/index'
import {State} from "../state/index"



function SearchComp() { 
	const dispatch = useDispatch()
	const state = useSelector((state:State)=> state.tickets)
	
	
	
	const onSearch = (val: string) => {


		setTimeout(() => {
			let FilterParams = {
				searchVal : val,
				pageNum : 1,
				before_after : false,
				date: 0,
				from: ''
			}
			dispatch(getTicketsFromServer(FilterParams))
		}, 500);
	}

	// const onSearch = (val:string) =>{
	// 	let FilterParams = {
	// 		searchVal : val,
	// 		pageNum : 1,
	// 		before_after : false,
	// 		date: 0,
	// 		from: ''
	// 	}
	// 	dispatch(getTicketsFromServer(FilterParams))
	// }

	return (<div>
		<header>
 			<input className = "search" type="search" placeholder="Search..." onChange={(e) => onSearch(e.target.value)}/> 
		</header>
		
        </div>)
	
}

export default SearchComp;