import { jest } from "@jest/globals";
import {faker} from "@faker-js/faker"
import { prisma } from "../src/database.js"
import { recommendationService } from "../src/services/recommendationsService.js";
import { recommendationRepository } from "../src/repositories/recommendationRepository.js";

import dotenv from "dotenv"
import { recommendationBody } from "./factories/recommendationFactory.js";
dotenv.config()
beforeEach(async ()=> {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`
})

describe("create recommendations", () => {
  it("should create recommendation", async () => {
    const recommendation = recommendationBody()
    jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((): any => {null})
    jest.spyOn(recommendationRepository, "create").mockImplementationOnce((): any => {null})
    await recommendationService.insert(recommendation)
    expect(recommendationRepository.create).toBeCalled()
  });

  it("should not create recommendations with same name", async () => {
    const recommendation = recommendationBody()
    jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((): any => {return true})
    const promisse = recommendationService.insert(recommendation)
    expect(promisse).rejects.toEqual({type: "conflict", message: "Recommendations names must be unique"})
  });
});

describe("upvote recommendation", () => {
  it("should upvote recommendation", async ()=> {
    jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {return true})
    jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => {return null})
    await recommendationService.upvote(1)
    expect(recommendationRepository.updateScore).toBeCalled()
  })

  it("should fail to upvote for invalid recommendation", async ()=> {
    jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {return false})
    const promisse = recommendationService.upvote(1)
    expect(promisse).rejects.toEqual({type: "not_found", message: ""})
  })

})

describe("downvote on recommendation", () => {
  
  it("should downvote and keep recommendation", async ()=> {
    const recommendation = {
      id: 1,
      name: faker.name.findName(),
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
      score: 4
    }
    jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {return true})
    jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => {return recommendation})
    jest.spyOn(recommendationRepository, "remove").mockImplementationOnce((): any => {return null})
    await recommendationService.downvote(recommendation.id)
    expect(recommendationRepository.updateScore).toBeCalled()
    expect(recommendationRepository.remove).not.toBeCalled()
  })
  it("should downvote and remove recommendation", async ()=> {
    const recommendation = {
      id: 1,
      name: faker.name.findName(),
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
      score: -6
    }
    jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {return true})
    jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => {return recommendation})
    jest.spyOn(recommendationRepository, "remove").mockImplementationOnce((): any => {return null})
    await recommendationService.downvote(recommendation.id)
    expect(recommendationRepository.updateScore).toBeCalled()
    expect(recommendationRepository.remove).toBeCalled()
  })
  
  it("should fail to upvote invalid recommendation", async ()=> {
    jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {return false})
    const promisse = recommendationService.downvote(1)
    expect(promisse).rejects.toEqual({type: "not_found", message: ""})
  })
})

describe("show last recommendations", ()=>{
  it("should return last recomendations", async() => {
    jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce(():any => {return null})
    await recommendationService.get()
    expect(recommendationRepository.findAll).toBeCalled()
  })
})

describe("randon recomendation", ()=>{
  it("should return recommendation score for score > 0.7", async() => {
    const recommendation = [{
      id: 1,
      name: faker.name.findName(),
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
      score: 4
    }]
    jest.spyOn(Math, "random").mockReturnValueOnce(0.8)
    jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => {return recommendation})
    const response = await recommendationService.getRandom()
    expect(response.name).toEqual(recommendation[0].name)
  })
  it("should return recommendation score for score < 0.7", async() => {
    const recommendation = [{
      id: 1,
      name: faker.name.findName(),
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
      score: 4
    }]
    jest.spyOn(Math, "random").mockReturnValueOnce(0.6)
    jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => {return recommendation})
    const response = await recommendationService.getRandom()
    expect(response.name).toEqual(recommendation[0].name)
  })
  it("should fail if there are no recommendations", async() => {
    const recommendations = []
    jest.spyOn(Math, "random").mockReturnValueOnce(0.6)
    jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => {return recommendations})
    const response = recommendationService.getRandom()
    expect(response).rejects.toEqual({type: "not_found", message: ""})
  })
})
describe("list recommendations by top score", ()=>{
  const recommendation = {
    id: 1,
    name: faker.name.findName(),
    youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
    score: 4
  }
  it("should return list recommendations", async() => {
    jest.spyOn(recommendationRepository, "getAmountByScore").mockImplementationOnce((): any => {return recommendation})
    const response = await recommendationService.getTop(1)
    expect(response).toEqual(recommendation)
  })
})

describe("delete all data",()=>{
    it("should delete all data", async()=>{
        jest.spyOn(recommendationRepository, "deleteAllData").mockImplementationOnce((): any=>{return null})
        const response = await recommendationService.deleteAllData()
        expect(response).toEqual(null)
    })
})