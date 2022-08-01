import { agent } from "../post.test";

export default async function deleteAllData() {
    await agent.delete("/recommendations")
}