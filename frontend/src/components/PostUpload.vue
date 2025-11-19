<template>
  <TheModal @close="store.commit('changeShowPostUpload', false)">
    <div class="postUpload">
      <label class="upload">
        <img v-if="imageUrl" :src="imageUrl" alt="image" class="preview">
        <i v-else class="bi bi-image"></i>
        <input
          type="file"
          accept="image/*"
          class="fileChoose"
          @change="imageUpload"
        >
      </label>
      <div class="postContent">
        <textarea
          placeholder="寫點什麼..."
          class="postContentInput"
          v-model="description"
        ></textarea>
        <TheButton class="postBtn" @click="publishPost">發布</TheButton>
      </div>
    </div>
  </TheModal>
</template>

<script setup>
import TheButton from './TheButton.vue';
import TheModal from './TheModal.vue';
import { useStore } from 'vuex';
import { ref } from 'vue'

const store = useStore()
const imageUrl = ref("")

const image = ref(null)
const description = ref("")

async function imageUpload(e) {
  const imageFile = e.target.files[0]
  if(imageFile) {
    imageUrl.value = URL.createObjectURL(imageFile)
    image.value = imageFile
  }
}

function publishPost() {
  store.dispatch("uploadPost", {
    image: image.value,
    description: description.value
  })
}

</script>

<style scoped>
.postUpload {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 3fr 1fr;
}
.preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 0;
}
.upload {
  display: grid;
  place-items: center;
  cursor: pointer;
  min-height: 0;
}
.upload i {
  font-size: 300px;
  color: #c0c0c0;
}
.fileChoose {
  opacity: 0;
  position: absolute;
}
.postContent {
  display: grid;
}
.postContentInput {
  resize: none;
  border: none;
  border-top: 3px solid #eaeaea;
  padding: 12px 24px;
}
.postContentInput::placeholder {
  color: #c0c0c0;
}
.postBtn {
  width: 7vw;
  justify-self: end;
  align-self: end;
  margin-right: 24px;
  margin-bottom: 18px;
}

</style>
