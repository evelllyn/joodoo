<template>
  <button type="button" class="btn" :class="{ primary: color === 'primary', reverse }">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: "primary"
  },
  reverse: Boolean
})
</script>

<style scoped>
.btn {
  padding: 10px 32px;
  border: none;
  border-radius: 8px;
  color: rgb(163, 20, 20);
  font-size: 16px;
  font-weight: 500;
}

.btn.primary {
  background-color: #eae6dd;
}

.btn.reverse {
  background: none;
  border: 1px solid #eae6dd;
  color: initial;
}
</style>