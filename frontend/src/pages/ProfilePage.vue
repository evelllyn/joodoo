<template>
  <div>
    <div class="profileContainer">
      <TheAvatar :width="126" :height="126" :src="user.avatar"/>
      <div class="profile">
        <p class="name">
          <span>{{ user.name }}</span>
          <router-link to="/profile/edit">編輯個人資料</router-link>
        </p>
        <p class="handle">
          @{{ user.username }}
        </p>
        <div class="discription">
          <pre>
{{ user.intro }}
          </pre>
        </div>
        <p class="website">{{ user.website }}</p>
      </div>
    </div>
    <div class="tabs">
      <div
        v-for="(tab, index) in tabs"
        class="tab"
        :class="{active: index === currentTab}"
        :key="index"
        @click="currentTab = index"
      >
        <i :class="tab.icon"></i>
        <p>{{ tab.label }}</p>
      </div>
    </div>
    <div class="tabContent">
      <p>{{ myPosts[currentTab].length }}</p>
      <div class="posts">
        <img
          v-for="post in myPosts[currentTab]"
          :src="post.image"
          :key="post.id"
          alt="postImage"
          class="postImage">
      </div>
    </div>
  </div>
</template>

<script setup>
import TheAvatar from '../components/TheAvatar.vue';
import { loadPostsByMe, loadPostsLikedOrFavoredByMe } from '../apis/post';
import { useStore } from 'vuex';
import { computed, reactive, ref, watch } from 'vue'

const store = useStore()

const user = computed(() => store.state.user.user)

const tabs = ref([
  {
    label: "我的",
    icon: "bi bi-grid-3x3"
  },
  {
    label: "按讚",
    icon: "bi bi-heart"
  },
  {
    label: "收藏",
    icon: "bi bi-star"
  }
])

const currentTab = ref(0)

const myPosts = reactive({
  0: [],
  1: [],
  2: []
})

watch(currentTab, async () => {
  switch(currentTab.value) {
    case 0:
      if(myPosts[0].length === 0) {
        myPosts[0] = await loadPostsByMe()
      }
      break;
    case 1:
      if(myPosts[1].length === 0) {
        myPosts[1] = await loadPostsLikedOrFavoredByMe()
      }
      break;
    case 2:
      if(myPosts[2].length === 0) {
        myPosts[2] = await loadPostsLikedOrFavoredByMe("favors")
      }
      break;
    default:
      return
  }
}, { immediate: true })

</script>

<style scoped>
.profileContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10vw;
  align-items: center;
}
.avatar {
  justify-self: end;
}
.profile .name {
  display: flex;
  align-items: center;
}
.profile .name > span {
  font-size: 26px;
}
.profile .name > a {
  color: #1da0ff;
  text-decoration: none;
  margin-left: 26px;
}
.profile .handle {
  color: #989898;
}
.tabs {
  display: grid;
  grid-template-columns: repeat(3, 88px);
  column-gap: 4vw;
  justify-content: center;
  margin-top: 7vmin;
  margin-bottom: 20px;
}
.tab {
  display: grid;
  grid-template-rows: 1fr 1fr;
  place-items: center;
  cursor: pointer;
  padding-top: 1.5vh;
}
.tab i {
  font-size: 26px;
}
.tab > p {
  margin-top: 2px;
}
.tab.active {
  color: #1da0ff;
  background-color: #f7f7f7;
  border-radius: 18px;
}
.tabContent > p {
  text-align: center;
  font-weight: 500;
  margin-bottom: 32px;
}
.posts {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
}
.postImage {
  width: 100%;
  height: 321px;
  object-fit: cover;
}
</style>