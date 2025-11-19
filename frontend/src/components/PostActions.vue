<template>
  <div class="postActions">
    <div class="postActionsBox">
      <i :class="likedByMe ? 'bi bi-heart-fill' : 'bi bi-heart'"
        @click="emit('likeClick')"
        :style="{ color: likedByMe ? '#FF3C3C' : '#000000' }"
      ></i>
      <span>{{ likes || "" }}</span>
    </div>
    <div class="postActionsBox">
      <i class="bi bi-chat-dots" @click="emit('commentsClick')"></i>
      <span>{{ comments || "" }}</span>
    </div>
    <div class="postActionsBox">
      <i :class="favoredByMe ? 'bi bi-star-fill' : 'bi bi-star'"
        @click="emit('favorClick')"
        :style="{ color: favoredByMe ? '#FFD12E' : '#000000' }"
      ></i>
      <span>{{ favors || "" }}</span>
    </div>
  </div>
</template>

<script setup>

const { likes, favors, comments, likedByMe, favoredByMe } = defineProps({
  likes: Number,
  favors: Number,
  comments: Number,
  likedByMe: Boolean,
  favoredByMe: Boolean
})

const emit = defineEmits([
  "likeClick",
  "favorClick",
  "commentsClick"
])

</script>

<style scoped>
  .postActions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    align-content: center;
    column-gap: 16px;
  }
  .postActionsBox {
    display: grid;
    grid-template-rows: auto auto;
    justify-items: center;
  }
  .postActions i {
    font-size: 28px;
    grid-row: 1/2;
  }
  .postActionsBox span {
    display: inline-block;
    min-height: 1em;
    font-size: 14px;
  }
</style>
