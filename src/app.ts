import dotEnv from 'dotenv';
import { createServer } from './config/server';
import { databaseInit } from './data-source'



dotEnv.config();
databaseInit();
createServer();


