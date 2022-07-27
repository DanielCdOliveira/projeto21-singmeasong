import { faker } from "@faker-js/faker"
import supertest from "supertest"
import { prisma } from "../src/database.js"

import { Recommendation } from "@prisma/client";
import app from "../src/app.js"
import { recommendationBody, recommendationBodyWrongLink, recommendationBodyWrongName } from "./factories/recommendationFactory.js";
import { createScenarioOneRecommendation, createScenarioRecommendationsRandom, createScenarioTwentyRecommendation, createScenarioTwoRecommendationsForRandomTest, createScenarioTwoRecommendationsScoreGreaterThanTen } from "./factories/scenarioFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY;`
});
export const agent = supertest(app);
describe("GET /recommendations", () => {

  it("should get last 10 recommendations at /recommendations", async () => {
    //number of recommendations created
    const numberRecommendations = await createScenarioRecommendationsRandom()
    const result = await agent.get("/recommendations")
    // receive the last 10
    expect(result.body.length).toBeLessThanOrEqual(10)
    result.body.forEach((element: Recommendation, index: number) => {
      expect(element.id).toEqual(numberRecommendations - index)
    });
  })
  it("get the recommendation by id at /recommendations/:id", async () => {
    //generating random number of recommendation
    const numberRecommendations = await createScenarioRecommendationsRandom()
    //generatin an random id
    const randomId = Math.floor(Math.random() * numberRecommendations);
    // getting the recommendation direct from database
    const recommendationFromDb = await prisma.recommendation.findFirst({where:{id:randomId}})
    // getting recommendation from route
    const recommendationCreated = await agent.get(`/recommendations/${randomId}`)
    expect(recommendationCreated.body.id).toEqual(recommendationFromDb.id)
    expect(recommendationCreated.body.youtubeLink).toEqual(recommendationFromDb.youtubeLink)
    expect(recommendationCreated.body.name).toEqual(recommendationFromDb.name)
  })
  it("invalid id at /recommendations/:id", async () => {
    const recommendationCreated = await agent.get(`/recommendations/1`)
    expect(recommendationCreated.status).toEqual(404)
  })
})

describe("GET /recommendations/random",()=>{

  it("get random link 70%/30%", async () => {
    const scoreGreaterThanTen = await createScenarioTwoRecommendationsForRandomTest()
    expect(scoreGreaterThanTen).toEqual(7)
  })
  it("get random only score>10 or <10", async () => {
    const scoreGreaterThanTen = await createScenarioTwoRecommendationsScoreGreaterThanTen()
    expect(scoreGreaterThanTen).toEqual(10)
    const scoreLessThanTen = await createScenarioTwoRecommendationsScoreGreaterThanTen()
    expect(scoreLessThanTen).toEqual(10)
  })
  it("If there is no song registered, status 404 must be returned ", async () => {
    const result = await agent.get(`/recommendations/random`)
    expect(result.status).toEqual(404)
  })
})

describe("GET /recommendations/top/:amount",()=>{

  it("should get the amount of recommendations and ordened by score descending ", async () => {
   await createScenarioTwentyRecommendation()
   // amount = 10
   const result = await agent.get(`/recommendations/top/${10}`)
  //  verifying if array length is equal to params amount=10
   expect(result.body.length).toEqual(10)
  // verifying if is oprdened by score descending
   result.body.forEach((item: Recommendation , index: number)=>{
    expect(item.score).toEqual(20 - (index+1))
   })
  })
  
})