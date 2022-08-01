///  <reference types="cypress"/>
import {faker} from "@faker-js/faker"
const URL_API = "http://localhost:5000/recommendations/";
const URL_APP = "http://localhost:3000/";

beforeEach( () => {
  cy.resetDatabase();
});
describe("create recommendations", () => {
  it("should create recommentation", () => {
    const recommendation = {
      name: faker.name.findName(),
      link: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
    };
    cy.visit(URL_APP);
    cy.get("#name").type(recommendation.name);
    cy.get("#link").type(recommendation.link);
    cy.get("#button").click();
    cy.url().should("equal", `${URL_APP}`);
    cy.contains(recommendation.name).should("be.visible");
  });
  it("should throw error when creating recommendation name already existing", () => {
    const recommendation = {
      name: faker.name.findName(),
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
      };
    cy.request("POST", "http://localhost:5000/recommendations/",recommendation).as("createRecommendation");
    cy.visit(URL_APP)
    cy.get("#name").type(recommendation.name)
    cy.get("#link").type(recommendation.youtubeLink)
    cy.get("button").click()
    cy.on("window:alert", (str) => {
        expect(str).to.equal(`Error creating recommendation!`)
    })
})
});
describe("redirect page tests", () => {
  it("should go to /top", () => {
    cy.visit(URL_APP);
    cy.get("#top").click()
    cy.url().should("equal", `${URL_APP}top`);
  });
  it("should go to /random", () => {
    cy.visit(URL_APP);
    cy.get("#random").click()
    cy.url().should("equal", `${URL_APP}random`);
  });
  it("should go to homepage", () => {
    cy.visit(URL_APP);
    cy.get("#home").click()
    cy.url().should("equal", `${URL_APP}`);
  });
});
describe("score tests",()=>{
it("should increase score",()=>{
  
})
})
