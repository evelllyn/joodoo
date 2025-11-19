<template>
  <div class="postItem">
    <img
      :src="post.image"
      @click="$store.dispatch('showPostDetails', post.id)"
      alt="themeImage">
    <div class="postInfo">
      <div class="postMeta">
        <TheAvatar :src="post?.user?.avatar" :width="42" :height="42" />
        <span>{{ post?.user?.name }}</span>
        <span class="postDate">{{ dateToRelative(post.publishedAt) }}</span>
        <PostActions
          :likes="post.likes"
          :comments="post.comments"
          :favors="post.favors"
          :likedByMe="post.likedByMe"
          :favoredByMe="post.favoredByMe"
          @likeClick="$store.dispatch('toggleLike', post.id)"
          @favorClick="$store.dispatch('toggleFavor', post.id)"
          @commentsClick="$store.dispatch('showPostDetails', post.id)"
        />
      </div>
      <div class="postDescription">
        <p>{{ post.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import PostActions from '../components/PostActions.vue';
import TheAvatar from '../components/TheAvatar.vue';
import { dateToRelative } from '../utils/date';

const props = defineProps({
  post: {
    type: Object,
    default: {}
  }
})

</script>

<style scoped>
.postItem {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
}

.postItem>img {
  width: 100%;
  height: 400px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  cursor: pointer;
}

.postInfo {
  padding: 24px;
}

.postMeta {
  display: grid;
  grid-template-areas:
    "avatar name actions"
    "postDate postDate actions";
  grid-template-columns: 52px 1fr 3fr;
  align-items: center;
  row-gap: 10px;
}

.postMeta>.avatar {
  grid-area: avatar;
  cursor: pointer;
}

.postMeta .postDate {
  grid-area: postDate;
  color: #767676;
  font-size: 14px;
}

.postActions {
  grid-area: actions;
  justify-self: end;
}

.postDescription {
  margin-top: 28px;
  white-space: pre-line;
}
</style>