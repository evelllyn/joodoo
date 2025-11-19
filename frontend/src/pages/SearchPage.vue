<template>
  <div>
    <h2 class="title">搜尋結果: {{ term }}</h2>
    <PostList>
      <PostItem v-for="post in searchResult" :post="post" :key="post.id"/>
    </PostList>
    <PostDetails v-if="showPostDetails"/>
    <PostUpload v-if="showPostUpload"/>
  </div>
</template>

<script setup>
import PostList from '../components/PostList.vue';
import PostItem from '../components/PostItem.vue';
import PostDetails from '../components/PostDetails.vue';
import PostUpload from '../components/PostUpload.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRoute } from 'vue-router';


const store = useStore()
const searchResult = computed(() => store.state.post.searchResult)

const route = useRoute()
const term = computed(() => route.params.term)

const showPostUpload = computed(() => store.state.showPostUpload)
const showPostDetails = computed(() => store.state.showPostDetails)

</script>

<style scoped>
.title {
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 40px;
}
</style>
