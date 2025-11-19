import { getJwtToken } from "./auth"
import { request } from "../utils/request"

export async function createPost(image, description) {
  const token = getJwtToken()
  let uploadedImageId = null

  // 先上傳圖片
  if (image) {
    const formData = new FormData()
    formData.append("files", image)

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (!uploadRes.ok) throw new Error("圖片上傳失敗")

    const uploadedFiles = await uploadRes.json()
    uploadedImageId = uploadedFiles[0].id
  }

  // 再建立貼文（不用傳 user，後端會自動綁定）
  return request("/api/posts", {
    method: "POST",
    body: {
      description,
      ...(uploadedImageId && { image: uploadedImageId }),
    },
    auth: true,
  })
}

export async function loadPosts(filters = "") {
  const STRAPI_URL = "http://localhost:1337";
  const query = filters ? `&${filters}` : "";
  const response = await request(`/api/posts?populate=*${query}`);

  return response.data.map((post) => {
    const user = post.user || {};
    const imageUrl = post.image?.url ? `${STRAPI_URL}${post.image.url}` : null;

    return {
      id: post.id,
      description: post.description || "",
      publishedAt: post.publishedAt || null,
      image: imageUrl,
      user: post.user
        ? {
            id: user.id,
            name: user.name || user.username || "Anonymous",
            avatar: user.avatar
              ? `${STRAPI_URL}${user.avatar}`
              : "/default-avatar.png",
          }
        : null,
      likes: post.likes || 0,
      favors: post.favors || 0,
      comments:
        typeof post.comments === "number"
          ? post.comments
          : Array.isArray(post.comments)
          ? post.comments.length
          : 0,
      likedByMe: post.likedByMe,
      favoredByMe: post.favoredByMe,
    };
  });
}

export async function loadPostsByMe() {
  const STRAPI_URL = "http://localhost:1337";
  const response = await request("/api/users/me-with-posts", { auth: true });
  const posts = response.posts || [];

  return posts.map((post) => {
    const user = post.user || {};
    const imageUrl = post.image?.url
      ? `${STRAPI_URL}${post.image.url}`
      : null;

    return {
      id: post.id,
      description: post.description || "",
      publishedAt: post.publishedAt,
      image: imageUrl,
      user: post.user
        ? {
            id: user.id,
            name: user.name || user.username || "Anonymous",
            avatar: user.avatar
              ? user.avatar.startsWith("http")
                ? user.avatar
                : `${STRAPI_URL}${user.avatar}`
              : "/default-avatar.png",
          }
        : null,
      likes: post.likes || 0,
      favors: post.favors || 0,
      comments:
        typeof post.comments === "number"
          ? post.comments
          : Array.isArray(post.comments)
          ? post.comments.length
          : 0,
      likedByMe: post.likedByMe,
      favoredByMe: post.favoredByMe,
    };
  });
}

export async function loadPostsLikedOrFavoredByMe(type = "likes") {
  const STRAPI_URL = "http://localhost:1337";
  const response = await request("/api/users/me-with-posts", { auth: true });

  const posts = response[type] || [];

  return posts.map((post) => ({
    id: post.id,
    description: post.description || "",
    publishedAt: post.publishedAt,
    image: post.image?.url ? `${STRAPI_URL}${post.image.url}` : null,
    user: post.user
      ? {
          id: post.user.id,
          name: post.user.name || post.user.username,
          avatar: post.user.avatar
            ? post.user.avatar.startsWith("http")
              ? post.user.avatar
              : `${STRAPI_URL}${post.user.avatar}`
            : "/default-avatar.png",
        }
      : null,
    likes: post.liked_bies?.length || 0,
    favors: post.favored_bies?.length || 0,
    comments: post.comments?.length || 0,
  }));
}

export async function likePost(id) {
  const reponese = await request(`/api/posts/${id}/like`, {
    method: "PUT",
    auth: true,
  })
  return reponese
}

export async function favorPost(id) {
  const reponese = await request(`/api/posts/${id}/favor`, {
    method: "PUT",
    auth: true,
  })
  return reponese
}
