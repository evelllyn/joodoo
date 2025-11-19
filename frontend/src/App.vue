<template>
  <div>
    <template v-if="$route.name !== 'login'">
      <header class="header">
        <Navbar />
      </header>
      <TheLayout>
        <router-view />
      </TheLayout>
    </template>
    <template v-else>
      <router-view />
    </template>
    <footer class="footer" :class="{ inside: $route.name === 'login' }">
      &copy;JooDoo. All Rights Reserved.
    </footer>
  </div>
</template>

<script setup>
import "./assets/base.css"
import Navbar from "./components/NavBar.vue"
import TheLayout from "./components/TheLayout.vue"
</script>

<style scoped>
.header {
  height: 80px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06)
}
.footer {
  text-align: center;
  padding: 32px 0;
  color: #828282;
}
.footer.inside {
  width: 99%;
  position: absolute;
  bottom: 0;
}
</style>