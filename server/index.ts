import express from 'express';
import {Ticket} from './temp-data';

import bodyParser = require('body-parser');
import { tempData } from './temp-data';

const app = express();

const PORT = 3232;

const PAGE_SIZE = 20;

app.use(bodyParser.json());

app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();
});



app.get('/api/tickets', (req, res) => {

	
	let searchVal = req.query.searchVal || ''
	const pageNum = req.query.pageNum || 1;
	// const before_after = req.query.before_after || false;
	// const date = req.query.pageNum || 0;
	// const from = req.query.pageNum || '';

	let regexBeforeAfter = /(before|after)\:(\s+)?(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}/gi
	let matchesArrBeforeAfter = searchVal.match(regexBeforeAfter)
	let beforeOrAfter = ''
	let dateFromRegex = ''
	let after = false
	let date = 0
	let matchStringBeforeAfterDate = ''
	if (matchesArrBeforeAfter){
		beforeOrAfter = matchesArrBeforeAfter[0].split(':')[0].trim()
		if(beforeOrAfter === 'after')
			after = true
		else if (beforeOrAfter === 'before')
			after = false
		dateFromRegex = matchesArrBeforeAfter[0].split(':')[1].trim()
		let parts_of_date = dateFromRegex.split("/"); // 01/09/2018
		let output = new Date(Number(parts_of_date[2]), Number(parts_of_date[1])-1, Number(parts_of_date[0])+1);
		// res.send({ parts_of_date ,output})
		date = new Date(output).getTime()
		matchStringBeforeAfterDate = matchesArrBeforeAfter.join(' ') 
	}
	

	let fromEmailRegex = /(from)\:(\s+)?[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/gi
	let matchesArrEmail = searchVal.match(fromEmailRegex)
	let emailFromRegex = ''
	let matchStringFromEmail = ''
	if (matchesArrEmail){
		emailFromRegex = matchesArrEmail[0].split(':')[1].trim()
		matchStringFromEmail = matchesArrEmail.join(' ')
	}
	
	if(matchStringBeforeAfterDate !== ''){
		searchVal = searchVal.substring(matchStringBeforeAfterDate.length)
	}
	if(matchStringFromEmail !== ''){
		searchVal = searchVal.substring(0,searchVal.length - matchStringFromEmail.length)
	}
	let searchingText = searchVal.trim()


	let filteredByEmail : Ticket[] =  []
	if(emailFromRegex !== ''){
		filteredByEmail = tempData.filter((t)=> t.userEmail === emailFromRegex)
	}

	let filteredByDate : Ticket[] =  []
	if(date !== 0){
		filteredByDate = tempData.filter(function(t){
			if(after){
				return t.creationTime > date //after
			}else{
				return t.creationTime < date //before
			}
		})
	}

	let filteredBySearch = tempData.filter(function(t){
		return (t.title.toLowerCase() + t.content.toLowerCase()).includes(searchingText.toLowerCase())
	})


	// Generic helper function that can be used for the three operations:        
	const operation = (list1:Ticket[], list2:Ticket[], isUnion = false) =>
		list1.filter(
		(set => (a: Ticket) => isUnion === set.has(a.id))(new Set(list2.map(b => b.id)))
	);
	// Following functions are to be used:
	const inBoth = (list1:Ticket[], list2:Ticket[]) => operation(list1, list2, true)

	let results : Ticket[] = []
	
	
	if(filteredByDate.length>0 && filteredByEmail.length>0){ // exist Date and Email
		results = inBoth(filteredByDate,filteredByEmail)
		results = inBoth(results, filteredBySearch)
		const paginatedData = results.slice((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE);
		res.send({ 
			paginatedData:paginatedData,
			 totalPages:Math.ceil(results.length/PAGE_SIZE),
			 searchVal: searchingText,
			 pageNum: pageNum,
			});
	}
	else if(filteredByDate.length>0 && filteredByEmail.length===0){ // exist Date and Email doesn't
		results = inBoth(filteredByDate,filteredBySearch)
		const paginatedData = results.slice((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE);
		res.send({ 
			paginatedData:paginatedData,
			 totalPages:Math.ceil(results.length/PAGE_SIZE),
			 searchVal: searchingText,
			 pageNum: pageNum,
			});
	}
	else if(filteredByDate.length>0 && filteredByEmail.length===0){ // Date doesn't exist and Email does
		results = inBoth(filteredByDate,filteredBySearch)
		const paginatedData = results.slice((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE);
		res.send({ 
			paginatedData:paginatedData,
			 totalPages:Math.ceil(results.length/PAGE_SIZE),
			 searchVal: searchingText,
			 pageNum: pageNum,
			});
	}
	else if(filteredByDate.length===0 && filteredByEmail.length===0){ // neither exist
		results = filteredBySearch
		const paginatedData = results.slice((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE);
		res.send({ 
			paginatedData:paginatedData,
			 totalPages:Math.ceil(results.length/PAGE_SIZE),
			 searchVal: searchingText,
			 pageNum: pageNum,
			});
	}

	// const paginatedData = filteredBySearch.slice((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE);
	
	// res.send({ 
	// 	paginatedData:paginatedData,
	// 	 totalPages:Math.ceil(filteredBySearch.length/PAGE_SIZE),
	// 	 searchVal: searchVal,
	// 	 pageNum: pageNum,
	// 	//  before_after : before_after,
	// 	//  date : date,
	// 	//  from : from 
	// 	});
});



app.listen(PORT);
console.log('server running', PORT)

