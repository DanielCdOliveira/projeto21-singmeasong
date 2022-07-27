import supertest from "supertest"
import { prisma } from "../src/database.js"
import app from "../src/app.js"

import { recommendationBody, recommendationBodyWrongLink, recommendationBodyWrongName } from "./factories/recommendationFactory.js";
import { createScenarioOneRecommendation } from "./factories/scenarioFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY;`
});
export const agent = supertest(app);

describe("POST /recommendations", () => {

  it("should create recommendation", async () => {
    const recommendation = recommendationBody()
    await agent.post("/recommendations").send(recommendation)
    //Side effects
    const recommendationCreated = await prisma.recommendation.findFirst({ where: { name: recommendation.name } })
    expect(recommendationCreated).not.toBeNull()
    expect(recommendationCreated.youtubeLink).toEqual(recommendation.youtubeLink)
  })
  it("should not create recommendation with same name", async () => {
    const recommendation =recommendationBody()
    await agent.post("/recommendations").send(recommendation)
    const recommendationCreated = await agent.post("/recommendations").send(recommendation)
    expect(recommendationCreated.status).toEqual(409)
  })
  it("should not create recommendation with invalid name and invalid link", async () => {
    //invalid name
    const recommendationWrongName = recommendationBodyWrongName()
    const resultName = await agent.post("/recommendations").send(recommendationWrongName)
    expect(resultName.status).toEqual(422)
    //invalid link
    const recommendationWrongLink = recommendationBodyWrongLink()
    const resultLink = await agent.post("/recommendations").send(recommendationWrongLink)
    expect(resultLink.status).toEqual(422)
  })
})
describe("POST /recommendations/:id/upvote", () => {

  it("should upvote recommendation", async () => {
    const {id , score} = await createScenarioOneRecommendation()
    await agent.post(`/recommendations/${id}/upvote`)
    const recommendationCreated = await prisma.recommendation.findFirst({ where: { id } })
    expect(recommendationCreated.score).toEqual(score + 1)
  })
  it("should downvote recommendation", async () => {
    const {id , score} = await createScenarioOneRecommendation()
    await agent.post(`/recommendations/${id}/downvote`)
    const recommendationCreated = await prisma.recommendation.findFirst({ where: { id } })
    expect(recommendationCreated.score).toEqual(score - 1)
  })
  it("should delete recommendation with score < -5", async () => {
    const {id} = await createScenarioOneRecommendation()
    await agent.post(`/recommendations/${id}/downvote`)
    await agent.post(`/recommendations/${id}/downvote`)
    await agent.post(`/recommendations/${id}/downvote`)
    await agent.post(`/recommendations/${id}/downvote`)
    await agent.post(`/recommendations/${id}/downvote`)
    await agent.post(`/recommendations/${id}/downvote`)
    const recommendationCreated = await prisma.recommendation.findFirst({ where: { id } })
    expect(recommendationCreated).toBeNull()
  })
  it("should return 404 for invalid id", async () => {
    const upvote = await agent.post(`/recommendations/${1}/upwnvote`)
    expect(upvote.status).toBe(404)
    const downvote = await agent.post(`/recommendations/${1}/downvote`)
    expect(downvote.status).toBe(404)
  })
})