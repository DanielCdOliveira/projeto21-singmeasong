import { faker } from "@faker-js/faker"

const youtubeLink = "https://www.youtube.com/watch?v=chwyjJbcs1Y"

const invalidLink = "https://www.google.com"

export function recommendationBody() {
    return {
        name:faker.name.findName(),
        youtubeLink
    }
}
export function recommendationBodyWrongName() {
    return {
        name:"",
        youtubeLink
    }
}
export function recommendationBodyWrongLink() {
    return {
        name:faker.name.findName(),
        youtubeLink:invalidLink
    }
}
export function recommendationWithScore11() {
    return{
        name:faker.name.findName(),
        youtubeLink:invalidLink,
        score:11
    }
}
export function recommendationWithScore5() {
    return{
        name:faker.name.findName(),
        youtubeLink:invalidLink,
        score:5
    }
}