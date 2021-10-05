'use strict'

// supertests
const { server } = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

//models
const { db } = require('../src/models/index.js');
const { expect } = require('@jest/globals');

//sqlite initialization
beforeAll(async () => {
  await db.sync();
})

//sqlite termination
afterAll(async () => {
  await db.drop();
})

// describe tests

describe('web server routes', () => {
  
  // this is your 404 not found route
  it('should respond with a 404 invalid route', () => {

    return mockRequest
    .get('/foolish')
    .then(results => {
      // console.log(results);
      expect(results.status).toBe(404);
    });
  });

  // this turned it into a 500 error on lab 2, not sure how to fix for this lab, since I really do have a post route.
  // this is your 404 for a bad method
  it('should respond with a 404 on a bad method', () => {
    return mockRequest
    .put('/clothes')
    .then(results => {

      expect(results.status).toBe(404);
      expect(results.req.method).toBe('GET');
    });
  });

  // this is the 200 valid name and output object is correct
  it('should respond with a 200 if the RESTful routes are correct', async () => {
        // put in fake data here
    // check what params I used, I can't remember now.
    const data = {
      type: 'shirt',
      hangUp: YES,
      mainColor: 'blue',
      size: '12'
    };

    const response = await mockRequest.post('/clothes').send(data);
    // the 200 will be triggered with test variable
    expect(response.status).toBe(200);
    // test variable is called
    //did we get an id?
    // expect(response.body.id).toBeDefined();
    // expect(response.body).toEqual(data);
    Object.keys(data).forEach(key => {
      expect(data[key]).toEqual(response.body[key]);
    });
  });


});