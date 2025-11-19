<template>
  <nav class="navbar">
    <router-link to="/"><img src="../assets/logo.png" alt="logo" class="logoImage"></router-link>
    <div class="searchInput">
      <input type="text" @input="searchPosts">
      <i class="bi bi-search"></i>
    </div>
    <div class="navItems">
      <router-link to="/"><i class="bi bi-house-heart-fill"></i></router-link>
      <button @click="wrightPost()" type="button" class="btn"><i class="bi bi-pencil-square"></i></button>
      <div class="profileDropDown">
        <TheAvatar @click="showDropdown = !showDropdown" :src="user.avatar"/>
        <div
          class="dropDownMenu"
          v-show="showDropdown"
          @click="showDropdown = false"
        >
          <ul class="profileMenu">
            <li><router-link to="/profile">個人主頁</router-link></li>
            <li @click="logout">退出登入</li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import TheAvatar from './TheAvatar.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';

const showDropdown = ref(false)
const store = useStore()
const router = useRouter()

const user = computed(() => store.state.user.user)

function wrightPost() {
  store.commit("changeShowPostUpload", true)
}

async function searchPosts(e) {
  await store.dispatch("searchPosts", e.target.value)
  router.push({
    name: "search_result",
    params: {
      term: e.target.value
    }
  })
}

async function logout() {
  await store.dispatch("logoutUser")
  router.push("/login")
}

</script>

<style scoped>
  .navbar {
    width: 80vw;
    height: 80px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 0 auto;
    align-items: center;
  }
  .navbar .logoImage {
    height: 28px;
  }
  .searchInput {
    position: relative;
    display: flex;
  }
  .searchInput input {
    width: 100%;
    padding: 12px;
    padding-left: 36px;
    background-color: #f1f1f1;
    border-radius: 14px;
    border: none;
  }
  .searchInput i {
    position: absolute;
    top: 12px;
    left: 12px;
    color: #767676;
    cursor: pointer;
  }
  .navItems {
    justify-self: end;
    display: flex;
    gap: 28px;
    align-items: center;
  }
  .navItems > .btn {
    font-size: 32px;
    border: none;
    background: none;
    cursor: pointer;
  }
  .navItems > a {
    font-size: 34px;
  }
  .navItems a:visited {
    color: initial;
  }
  /* .dropDownMenu {
    position: relative;
  }
  .profileMenu {
    width: max-content;
    position: absolute;
    right: 0;
    padding: 24px 26px;
    list-style: none;
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.08);
    display: grid;
    row-gap: 18px;
    transform: translateY(18px);
  } */
  .profileDropDown {
    position: relative; /* 讓 dropdown 以這裡為定位基準 */
  }

  .dropDownMenu {
    position: absolute;
    right: 0;
    top: 50px; /* 讓選單往下顯示，可依需求調整 */
    z-index: 99999; /* 重點：拉到最上層 */
  }

  .profileMenu {
    width: max-content;
    background: white;
    border-radius: 10px;
    padding: 24px 26px;
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
    list-style: none;
    display: flex;
    flex-direction: row;
    gap: 24px;
  }
  .profileMenu ::before {
    content: "";
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    top: -16px;
    right: 10px;
    border-bottom: 12px solid white;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
  }
  .profileMenu a,
  .profileMenu li {
    text-decoration: none;
    cursor: pointer;
  }
</style>
