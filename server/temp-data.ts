// import {Ticket} from '@ans-exam/client/src/api';

import * as fs from 'fs';
import Chance from 'chance';

export type Ticket = {
	id: string,
	title: string;
	content: string;
	creationTime: number;
	userEmail: string;
	labels?: string[];
}

const data = require('./data.json');

export const tempData = data as Ticket[];

