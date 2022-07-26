import {faker} from "@faker-js/faker"
import supertest from "supertest"
import {prisma} from "../src/database.js"
import app from "../src/app.js"

beforeEach(async() => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`
});
const agent = supertest(app);

describe("POST /recommendations",()=>{

it("should create recommendation",async()=>{
const recommendation = {
  name: faker.name.findName(),
  youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
}
await agent.post("/recommendations").send(recommendation)
//Side effects
const recommendationCreated = await prisma.recommendation.findFirst({where:{name:recommendation.name}})

expect(recommendationCreated).not.toBeNull()

})









    
})