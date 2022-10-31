#!/usr/bin/env node
import clear from 'clear';
import { ReadInputs } from './src/applicationServices/readInputs'

clear();

async function start() {
  const readInputs = new ReadInputs();
  readInputs.init();
}

start();
