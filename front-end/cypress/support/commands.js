import { faker } from "@faker-js/faker";
const URL_API = "http://localhost:5000/recommendations/";
const URL_APP = "http://localhost:3000/";

Cypress.Commands.add("resetDatabase", () => {
  cy.request("DELETE", "http://localhost:5000/recommendations/").as(
    "resetDatabase"
  );
});
Cypress.Commands.add("createRecommendation", () => {
	const recommendation = {
		name: faker.name.findName(),
		link: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
	  };
	  cy.visit(URL_APP);
	  cy.get("#name").type(recommendation.name);
	  cy.get("#link").type(recommendation.link);
	  cy.get("#button").click();
});
