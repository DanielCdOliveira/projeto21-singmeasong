import { faker } from "@faker-js/faker"

const name = faker.name.findName()
const youtubeLink = "https://www.youtube.com/watch?v=chwyjJbcs1Y"
const invalidName = ""
const invalidLink = "https://www.google.com"

export function recommendationBody() {
    return {
        name,
        youtubeLink
    }
}
export function recommendationBodyWrongName() {
    return {
        invalidName,
        youtubeLink
    }
}
export function recommendationBodyWrongLink() {
    return {
        name,
        invalidLink
    }
}