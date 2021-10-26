import React from 'react';
import '../App.scss'
import ReactPaginate from 'react-paginate';
import { useDispatch , useSelector} from "react-redux"
import {State} from "../state/index"
import {getTicketsFromServer} from '../state/actions/index'


function PaginationComp(){ 
	const dispatch = useDispatch()
	const state = useSelector((state:State)=> state.tickets)


	const handlePageChange = (newPage:number) => {
		let FilterParams = {
			searchVal : state.search,
			pageNum : newPage+1,
			// before_after : false,
			// date: 0,
			// from: ''
		}
		dispatch(getTicketsFromServer(FilterParams))
	}

	return (<div>
				<ReactPaginate
				forcePage = {state.currentPage-1}
				previousLabel={'<<'}
				nextLabel={'>>'}
				breakLabel={'...'}
				breakClassName={'break-me'}
				pageCount={state.totalPages}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={(data)=>handlePageChange(data.selected)}
				containerClassName={'pagination'}
				activeClassName={'active'}
				breakLinkClassName={'page-link'}
				pageClassName={'page-item'}
				pageLinkClassName={'page-link'}
				previousClassName={'page-item'}
				previousLinkClassName={'page-link'}
				nextClassName={'page-item'}
				nextLinkClassName={'page-link'}
			/>
		
        </div>)
	
}

export default PaginationComp;