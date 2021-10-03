'use strict'

// supertests

//models
const data = require('../src/models/index');

//sqlite initialization
beforeAll(async () => {
  await data.db.sync();
})

//sqlite termination
afterAll(async () => {
  await data.db.drop();
})

// describe tests