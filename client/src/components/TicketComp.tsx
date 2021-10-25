import React from 'react';
import '../App.scss'
import { useDispatch , } from "react-redux"
import {hideTicket} from '../state/actions/index'
import ShowMoreText from "react-show-more-text";


interface ITicketProps {
    id : string,
    title : string ,
    content : string ,
	creationTime : number ,
    labels : string[] | undefined ,
    userEmail : string
}

function TicketComp(props : React.PropsWithChildren<ITicketProps>) { //} : React.FC<{}> = ({}) => {
    const dispatch = useDispatch()

    const addToHidden = (id: string) =>{
		dispatch(hideTicket(id))
	}

	return (<div>
        <div className='hide' onClick={()=> addToHidden(props.id)}> Hide</div>
 		<h5 className='title'>{props.title}</h5>
				
        <ShowMoreText
            /* Default options */
            lines={3}
            more="Show more"
            less="Show less"
            expanded={false}
            width={0}
            truncatedEndingComponent={"... "}
            >
        <p className='content'>{props.content}</p>
        </ShowMoreText>
				
				{props.labels ? <ul className='labels'>{props.labels.map(l => <li key={l} className='label'>{l}</li>)}</ul> : null}
				<footer>
					<div className='meta-data'>By {props.userEmail} | { new Date(props.creationTime).toLocaleString()}</div>
				</footer>
		
        </div>)
	
}

export default TicketComp;