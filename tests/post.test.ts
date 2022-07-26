import { faker } from "@faker-js/faker"
import supertest from "supertest"
import { prisma } from "../src/database.js"
import app from "../src/app.js"
import { recommendationBody, recommendationBodyWrongLink, recommendationBodyWrongName } from "./factories/recommendationFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`
});
const agent = supertest(app);

describe("POST /recommendations", () => {

  it("should create recommendation", async () => {
    const recommendation = recommendationBody()
    await agent.post("/recommendations").send(recommendation)
    //Side effects
    const recommendationCreated = await prisma.recommendation.findFirst({ where: { name: recommendation.name } })
    expect(recommendationCreated).not.toBeNull()
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