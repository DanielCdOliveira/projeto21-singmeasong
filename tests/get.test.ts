import { faker } from "@faker-js/faker"
import supertest from "supertest"
import { prisma } from "../src/database.js"
import app from "../src/app.js"
import { recommendationBody, recommendationBodyWrongLink, recommendationBodyWrongName } from "./factories/recommendationFactory.js";
import { createScenarioOneRecommendation, createScenarioRecommendationsRandom, createScenarioTwoRecommendationsForRandomTest } from "./factories/scenarioFactory.js";

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
    result.body.forEach((element, index: number) => {
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

    console.log(scoreGreaterThanTen);
    expect(scoreGreaterThanTen).toEqual(7)
  })










})