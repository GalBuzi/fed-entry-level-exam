import express from 'express';

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

	
	const searchVal = req.query.searchVal || ''
	const pageNum = req.query.pageNum || 1;
	const before_after = req.query.before_after || false;
	const date = req.query.pageNum || 0;
	const from = req.query.pageNum || '';

	const filteredBySearch = tempData.filter((t) => (t.title.toLowerCase() + t.content.toLowerCase()).includes(searchVal.toLowerCase()));
	const paginatedData = filteredBySearch.slice((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE);
	
	res.send({ 
		paginatedData:paginatedData,
		 totalPages:Math.ceil(filteredBySearch.length/PAGE_SIZE),
		 searchVal: searchVal,
		 pageNum: pageNum,
		 before_after : before_after,
		 date : date,
		 from : from 
		});
});



app.listen(PORT);
console.log('server running', PORT)

