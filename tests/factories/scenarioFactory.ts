import {prisma} from "../../src/database.js"
import { faker } from "@faker-js/faker"

import {agent} from "../post.test.js"
import { recommendationBody, recommendationWithScore11, recommendationWithScore5 } from "./recommendationFactory.js"

export async function createScenarioOneRecommendation(){
    const recommendation = recommendationBody()
    await agent.post("/recommendations").send(recommendation)
    const recommendationCreated = await prisma.recommendation.findFirst({ where: { name: recommendation.name } })
    return recommendationCreated
}
export async function createScenarioRecommendationsRandom() {
    const qty = Math.floor(Math.random() * 50);
    for(let i = 0; i< qty;i++){
    const recommendation = recommendationBody()
    await prisma.recommendation.create({data:recommendation})
    }
    return qty
}
export async function createScenarioTwoRecommendationsForRandomTest() {
    const recommendation = recommendationWithScore11()
    const recommendation2 = recommendationWithScore5()
    await prisma.recommendation.create({data:recommendation})
    await prisma.recommendation.create({data:recommendation2})
    let count = 0
    for(let i = 0; i<10; i++){
        const {body} = await agent.get(`/recommendations/random`)
        if(body.score >10) count++
    }
    return count
}
