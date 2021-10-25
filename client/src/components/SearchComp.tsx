import React from 'react';
import '../App.scss'
import { useDispatch} from "react-redux"
import {getTicketsFromServer} from '../state/actions/index'


function SearchComp() { 
	const dispatch = useDispatch()

	const onSearch = (val: string) => {
		
		setTimeout(() => {
			dispatch(getTicketsFromServer(val,1))
		}, 300);
	}


	return (<div>
		<header>
 			<input className = "search" type="search" placeholder="Search..." onChange={(e) => onSearch(e.target.value)}/> 
		</header>
		
        </div>)
	
}

export default SearchComp;