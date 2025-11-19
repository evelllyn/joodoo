<template>
  <teleport to='body'>
    <div class="modal">
      <div class="backDrop"></div>
      <div class="modalContent">
        <button @click="$emit('close')" type="button" class="closeBtn"><i class="bi bi-x-lg"></i></button>
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script setup>
defineEmits(["close"])
</script>

<style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
  }
  .backDrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modalContent {
    position: relative;
    background-color: white;
    width: 65vw;
    height: 80vh;
    border-radius: 52px;
    overflow: hidden;
  }
  .closeBtn {
    cursor: pointer;
    position: absolute;
    background: none;
    border: none;
    top: 16px;
    right: 16px;
    font-size: 24px;
  }
</style>
