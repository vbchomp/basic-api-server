"use strict";

// supertests
const { server } = require("../src/server.js");
const supertest = require("supertest");
const mockRequest = supertest(server);

//models
const { db } = require("../src/models/index.js");
const { expect } = require("@jest/globals");

//sqlite initialization
beforeAll(async () => {
  await db.sync();
});

//sqlite termination
afterAll(async () => {
  await db.drop();
});

// describe tests

describe("web server routes", () => {
  // this is your 404 not found route
  xit("should respond with a 404 invalid route", () => {
    return mockRequest.get("/foolish").then((results) => {
      // console.log(results);
      expect(results.status).toBe(404);
    });
  });

  // this turned it into a 500 error on lab 2, not sure how to fix for this lab, since I really do have a post route.
  // this is your 404 for a bad method
  xit("should respond with a 404 on a bad method", () => {
    // try {
    // the anonymous functiona was expecting the .potato to fail, since it was contained within the expect it prevented the entire node from failing. It throws and error with the .toThrow.
    expect(() => {
      return mockRequest.potato("/clothes").then((results) => {
        console.log("results:", results.req.method);
      });
    }).toThrow();
    // }
    // catch(error) {
    //   console.log('error:', error);
    // };
  });

  // this is the 200 valid name and output object is correct
  xit("should respond with a 200 if the RESTful routes are correct", async () => {
    // put in fake data here
    // check what params I used, I can't remember now.
    const data = {
      type: "shirt",
      hangUp: "YES",
      mainColor: "blue",
      size: "12",
    };

    const response = await mockRequest.post("/clothes").send(data);
    // the 200 will be triggered with test variable
    expect(response.status).toBe(200);
    // test variable is called
    //did we get an id?
    // expect(response.body.id).toBeDefined();
    // expect(response.body).toEqual(data);
    Object.keys(data).forEach((key) => {
      expect(data[key]).toEqual(response.body[key]);
    });
  });

  xit("should respond with a 200 if the GET route is correct", async () => {
    // put in fake data here
    // check what params I used, I can't remember now.
    const data = {
      type: "shirt",
      hangUp: "YES",
      mainColor: "blue",
      size: 12,
    };

    const response = await mockRequest.post("/clothes").send(data);
    console.log("response:", response.body);
    // the 200 will be triggered with test variable
    const response2 = await mockRequest.get(`/clothes/${response.body.id}`);
    expect(response2.status).toBe(200);

    Object.keys(data).forEach((key) => {
      expect(data[key]).toEqual(response2.body[key]);
    });
  });

  xit("should respond with a 200 if the UPDATE route is correct", async () => {
    // put in fake data here
    // check what params I used, I can't remember now.
    const data = {
      type: "shirt",
      hangUp: "YES",
      mainColor: "blue",
      size: 12,
    };

    const response = await mockRequest.post("/clothes").send(data);
    console.log("response:", response.body);
    // the 200 will be triggered with test variable
    const updatedShirt = {
      mainColor: "red",
    };
    const response2 = await mockRequest
      .put(`/clothes/${response.body.id}`)
      .send(updatedShirt);
    expect(response2.status).toBe(200);

    Object.keys(data).forEach((key) => {
      if (key === "mainColor") {
        // loop would go through original data object. Updated mainColor, so need to loop through the updatedShirt data object.
        expect(updatedShirt[key]).toEqual(response2.body[key]);
      } else {
        expect(data[key]).toEqual(response2.body[key]);
      }
    });
  });

  xit("should respond with a 200 if the DELETE route is correct", async () => {
    // put in fake data here
    // check what params I used, I can't remember now.
    const data = {
      type: "shirt",
      hangUp: "YES",
      mainColor: "blue",
      size: 12,
    };

    const response = await mockRequest.post("/clothes").send(data);
    console.log("response:", response.body);
    // the 200 will be triggered with test variable
    const response2 = await mockRequest.delete(`/clothes/${response.body.id}`);
    expect(response2.status).toBe(200);
    const response3 = await mockRequest.get(`/clothes/${response.body.id}`);
    expect(response3.status).toBe(400);
    console.log("response3:", response3.body);
  });

  it("should respond with a 200 if the list of records is correct", async () => {
    // put in fake data here
    // check what params I used, I can't remember now.
    const data1 = {
      type: "shirt",
      hangUp: "YES",
      mainColor: "blue",
      size: 12,
    };

    const data2 = {
      type: "tshirt",
      hangUp: "YES",
      mainColor: "red-blue",
      size: 11,
    };

    const response = await mockRequest.post("/clothes").send(data1);
    const response3 = await mockRequest.post("/clothes").send(data2);
    console.log("response:", response.body);
    // the 200 will be triggered with test variable
    const response2 = await mockRequest.get('/clothes');
    expect(response2.status).toBe(200);

    console.log('response2:', response2.body);

    response2.body.forEach((clothing) => {
      if (clothing.type === 'shirt') {
        Object.keys(data1).forEach((key) => {
          expect(data1[key]).toEqual(clothing[key]);
          
        })
      } else {
        Object.keys(data2).forEach((key) => {
          expect(data2[key]).toEqual(clothing[key]);
          
        })
      }
    });
  });



});
