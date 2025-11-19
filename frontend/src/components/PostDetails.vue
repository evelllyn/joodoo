<template>
  <TheModal @close="$store.dispatch('hidePostDetails')">
    <div class="postDetails">
      <img :src="post.image" alt="postImage" class="postImage">
      <div class="postMeta">
        <div class="autor">
          <TheAvatar :src="post.user?.avatar"/>
          <span>{{ post.user?.name }}</span>
        </div>
        <pre class="postDescription"
          >{{ post.description }}
        </pre>
        <div class="comments">
          <div class="comment" v-for="comment in comments" :key="comment.id">
            <TheAvatar :src="comment.user?.avatar"/>
            <span class="user">{{ comment.user?.name }}</span>
            <span class="commentDate">{{ dateToRelative(comment.publishedAt) }}</span>
            <p class="commentContent">{{ comment.content }}</p>
          </div>
        </div>
        <div class="actions">
          <PostActions
            :likes="post.likes"
            :comments="post.comments"
            :favors="post.favors"
            :likedByMe="post.likedByMe"
            :favoredByMe="post.favoredByMe"
            @likeClick="$store.dispatch('toggleLike', post.id)"
            @favorClick="$store.dispatch('toggleFavor', post.id)"
          />
          <span class="postDate">{{ dateToRelative(post.publishedAt) }}</span>
          <input
            type="text"
            name="comment"
            v-model="content"
            id=""
            class="commentInput"
            placeholder="說點什麼..."
          >
          <button
            @click="store.dispatch('addComment', { content, postId: post.id })"
            type="button"
            class="commentBtn"
          >發布</button>
        </div>
      </div>
    </div>
  </TheModal>
</template>

<script setup>
import PostActions from './PostActions.vue';
import TheAvatar from './TheAvatar.vue';
import TheModal from './TheModal.vue';
import { useStore } from 'vuex';
import { computed, ref} from 'vue';
import { dateToRelative } from '../utils/date';


const content = ref("")

const store = useStore()
const post = computed(() => store.getters.postDetails)
const comments = computed(() => store.state.comment.list)

</script>

<style scoped>
.postDetails {
  display: grid;
  grid-template-columns: 1fr minmax(auto, 440px);
  grid-template-rows: 1fr;
  width: 100%;
  height: 100%;
}

.postImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.postMeta {
  padding: 36px 24px 24px 24px;
  display: grid;
  grid-template-rows: max-content max-content 1fr max-content;
  max-height: 100%;
}

.autor {
  display: flex;
  align-items: center;
  gap: 12px;
}

.postDescription {
  white-space: pre-wrap;
  width: 100%;
  margin-top: 28px;
  font-size: 16px;
}

.comments {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  grid-gap: 22px;
  overflow-y: auto;
  padding-right: 12px;
  max-height: 34.5vh;
}

.comment {
  display: grid;
  grid-template-areas:
    "avatar name commentDate"
    "comment comment comment";
  grid-template-columns: 34px 1fr 1fr;
  align-items: center;
  column-gap: 10px;
}

.commentDate {
  grid-area: commentDate;
  justify-self: end;
  color: #767676;
}

.commentContent {
  grid-area: comment;
}

.actions {
  border-top: 1.5px solid #eaeaea;
  margin: 20px -24px 0 -24px;
  padding: 24px 24px 0 24px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  row-gap: 24px;
}

.postActions :deep(i) {
  font-size: 22px;
}

.postDate {
  color: #767676;
  grid-column: 2 / 6;
  justify-self: end;
  font-size: 14px;
}

.commentInput {
  border: none;
  background-color: #f6f6f6;
  padding: 10px;
  border-radius: 16px;
  grid-column: 1 / 5;
}

.commentInput::placeholder {
  color: #c0c0c0;
}

.commentBtn {
  color: #a03939;
  border: none;
  background-color: white;
  margin-left: 20px;
  font-size: 16px;
  font-weight: 500;
  grid-column: 5 / 6;
}
</style>