import {prisma} from "../../src/database.js"
import { faker } from "@faker-js/faker"

import {agent} from "../post.test.js"
import { recommendationBody, recommendationWithScore11, recommendationWithScore5, recommendationWithScoreByParams } from "./recommendationFactory.js"

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
export async function createScenarioTwoRecommendationsScoreGreaterThanTen() {
    const recommendation1 = recommendationWithScore11()
    const recommendation2 = recommendationWithScore11()
    await prisma.recommendation.create({data:recommendation1})
    await prisma.recommendation.create({data:recommendation2})
// performing 10 requests
    let count = 0
    for(let i = 0; i<10; i++){
        const {body} = await agent.get(`/recommendations/random`)
        if(body.score >10) count++
    }
    return count
}
export async function createScenarioTwoRecommendationsScoreLessThanTen() {
    const recommendation1 = recommendationWithScore5()
    const recommendation2 = recommendationWithScore5()
    await prisma.recommendation.create({data:recommendation1})
    await prisma.recommendation.create({data:recommendation2})
// performing 10 requests
    let count = 0
    for(let i = 0; i<10; i++){
        const {body} = await agent.get(`/recommendations/random`)
        if(body.score >10) count++
    }
    return count
}
export async function createScenarioTwentyRecommendation() {
// creating 20 recommendations with ordened score starting with score=1
    for(let i = 1; i<=20; i++){
        const recommendation = recommendationWithScoreByParams(i)
        await prisma.recommendation.create({data:recommendation})
    }
}