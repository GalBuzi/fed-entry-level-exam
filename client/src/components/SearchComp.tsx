import React, {} from 'react';
import '../App.scss'
import { useDispatch} from "react-redux"
import {getTicketsFromServer} from '../state/actions/index'



function SearchComp() { 
	const dispatch = useDispatch()

	
	
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


	return (<div>
		<header>
 			<input className = "search" type="search" placeholder="Search..." onChange={(e) => onSearch(e.target.value)}/> 
		</header>
		
        </div>)
	
}

export default SearchComp;