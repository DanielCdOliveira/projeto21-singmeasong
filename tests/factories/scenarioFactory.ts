import {prisma} from "../../src/database.js"
import { faker } from "@faker-js/faker"

import {agent} from "../post.test.js"
import { recommendationBody } from "./recommendationFactory.js"

export async function createScenarioOneRecommendation(){
    const recommendation = recommendationBody()
    await agent.post("/recommendations").send(recommendation)
    const recommendationCreated = await prisma.recommendation.findFirst({ where: { name: recommendation.name } })
    return recommendationCreated
}
export async function createScenarioOneRecommendationScoreMinusFive(){
    const recommendation = recommendationBody()
    await agent.post("/recommendations").send(recommendation)
    const recommendationCreated = await prisma.recommendation.findFirst({ where: { name: recommendation.name } })
    return recommendationCreated
}
