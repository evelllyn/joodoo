import HomePage from "./pages/HomePage.vue";
import LoginPage from "./pages/LoginPage.vue";
import ProfilePage from "./pages/ProfilePage.vue";
import ProfileEditPage from "./pages/ProfileEditPage.vue";
import SearchPage from "./pages/SearchPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import { getJwtToken } from "./apis/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage
  },
  {
    path: "/profile/edit",
    name: "profileEdit",
    component: ProfileEditPage
  },
  {
    path: "/search_result/:term?",
    name: "search_result",
    component: SearchPage,
    props: true
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach(to => {
  if(to.name !== "login" && !getJwtToken()) {
    return { name: "login" }
  }
  if(to.name === "login" && getJwtToken()) {
    return { name: "home" }
  }
})

export { router }