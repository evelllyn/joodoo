import { request } from "../utils/request";

export async function createComment(content, postId) {
  await request("/api/comments", {
    method: "POST",
    body: {
      data: {
        content,
        post: postId
      }
    }
  })
}

export async function loadComments(postId) {
  if (!postId) return []
  const response = await request(
    "/api/comments?populate=*&filters[post][id][$eq]=" + postId
  )

  return response.data.map((comment) => {
    const user = comment.user || {}
    let avatarUrl = null

    // ✅ 自動判斷是否已包含 http
    if (typeof user.avatar === "string") {
      avatarUrl = user.avatar.startsWith("http")
        ? user.avatar
        : `http://localhost:1337${user.avatar}`
    } else if (user.avatar?.url) {
      avatarUrl = user.avatar.url.startsWith("http")
        ? user.avatar.url
        : `http://localhost:1337${user.avatar.url}`
    }

    return {
      id: comment.id,
      content: comment.content || "",
      publishedAt: comment.publishedAt || comment.createdAt, // ✅ 統一名稱
      user: {
        id: user.id,
        name: user.name || user.username || "Anonymous",
        avatar: avatarUrl,
      },
    }
  })
}
