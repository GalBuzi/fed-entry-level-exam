import express from 'express';
import {Ticket} from './temp-data';
import {filteredResults, filterTickets} from './BL/TicketsBL'
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

	const regexBeforeAfter = /(before|after)\:(\s+)?(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}/gi
	const fromEmailRegex = /(from)\:(\s+)?[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/gi

	let matchesArrBeforeAfter = searchVal.match(regexBeforeAfter)
	let matchesArrEmail = searchVal.match(fromEmailRegex)

	let filtered : filteredResults = filterTickets(searchVal, pageNum, tempData,matchesArrBeforeAfter,matchesArrEmail)
	let finalResult: Ticket[] = filtered.finalResult
	let searchingText: string = filtered.searchingText
	
	const paginatedData = finalResult.slice((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE);

	res.send({ 
		paginatedData:paginatedData,
		 totalPages:Math.ceil(finalResult.length/PAGE_SIZE),
		 searchVal: searchingText,
		 pageNum: pageNum,
		});
});



app.listen(PORT);
console.log('server running', PORT)

