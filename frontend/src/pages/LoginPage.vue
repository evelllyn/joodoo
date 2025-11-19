<template>
  <div class="loginPage">
    <div class="loginForm">
      <img src="../assets/logo.png" alt="logo">
      <form @submit.prevent>
        <input type="email" placeholder="e-mail" v-model="email">
        <input v-if="!isLogin" type="text" placeholder="用戶名稱" v-model="username">
        <input type="password" placeholder="密碼" v-model="password">
        <div v-if="!isLogin" class="agreement">
          <input type="checkbox" v-model="agreementCheck">同意隱私協議和規範
        </div>
        <button
          type="submit"
          class="loginBtn"
          @click="isLogin ? login() : register()"
        >
          {{ isLogin ? "登入" : "註冊"  }}
        </button>
        <p @click="isLogin = !isLogin" class="info">
          {{ isLogin ? "還沒有帳號嗎? 立即註冊" : "已有帳號 立即登入" }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { ref } from "vue"

const isLogin = ref(true)

const email = ref("")
const username = ref("")
const password = ref("")
const agreementCheck = ref(false)

const store =  useStore()
const router = useRouter()

async function register() {
  if (!agreementCheck.value) {
    alert("請勾選同意隱私協議和規範");
    return
  }
  await store.dispatch("registerUser", {
    email: email.value,
    username: username.value,
    password: password.value
  })
  router.replace("/")
}

async function login() {
  await store.dispatch("loginUser", {
    email: email.value,
    password: password.value
  })
  router.replace("/")
}

</script>

<style scoped>
.loginPage {
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  display: grid;
  place-items: center;
}
.loginForm {
  box-shadow: 0 4px 48px rgba(0, 0, 0, 0.08);
  border-radius: 32px;
  padding: 74px 60px;
  display: grid;
  row-gap: 52px;
  place-items: center;
}
.loginForm > img {
  width: 50%;
}
.loginForm > form {
  display: grid;
  row-gap: 24px;
  width: 100%;
}
input {
  background-color: #fafafa;
  border: none;
  border-radius: 4px;
  padding: 16px 0 16px 16px;
  font-size: 18px;
}
input::placeholder {
  color: #9e9e9e;
}
.loginBtn {
  background: linear-gradient(89.89deg, #00c2ff 0.06%, #0047ff 105.68%);
  color: white;
  padding: 16px 0;
  border: none;
  font-size: 18px;
}
.info {
  color: #1da0ff;
  text-align: center;
  cursor: pointer;
}
.agreement {
  color: #a1a1a1;
  display: flex;
  align-items: center;
}
</style>
