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

	const filteredBySearch = tempData.filter((t) => (t.title.toLowerCase() + t.content.toLowerCase()).includes(searchVal.toLowerCase()));

	const page = req.query.pageNum || 1;

	const paginatedData = filteredBySearch.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
	
	res.send({paginatedData:paginatedData, totalPages:Math.ceil(filteredBySearch.length/PAGE_SIZE)});
});

app.listen(PORT);
console.log('server running', PORT)

