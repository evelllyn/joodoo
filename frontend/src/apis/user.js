import { request } from "../utils/request";
import { getUser, saveUser } from "./auth"

export async function changeUser(user) {
  const response = await request("/api/users/me", {
    method: "PUT",
    body: user
  })
  saveUser(response)
  return response
}