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
export async function createScenarioRecommendationsRandom() {
    const qty = Math.floor(Math.random() * 100);
    for(let i = 0; i< qty;i++){
    const recommendation = recommendationBody()
    await prisma.recommendation.create({data:recommendation})
    }
    return qty
}
