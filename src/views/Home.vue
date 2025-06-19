<template>
  <div>
    <h1>Home</h1>
    <p>Welcome to the homepage.</p>

    <section v-if="token" class="token-section">
      <p><strong>Your FCM Token:</strong></p>
      <textarea readonly class="token-box" :value="token" />
      <button @click="copyToken" class="copy-btn">Copy Token</button>
      <p v-if="copied" class="copied-msg">✅ Token copied!</p>
    </section>

  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const token = ref("");
const copied = ref(false);


const menuVisible = ref(false);


function hideMenu() {
  menuVisible.value = false;
}



onMounted(() => {
  token.value = sessionStorage.getItem("fcm_token") || "";
   document.addEventListener('selectionchange', () => {
    const selection = window?.getSelection();
    if (!selection || !selection.toString().trim()) {
      hideMenu();
    }
  });
});

onBeforeUnmount(() => {
  document.removeEventListener('selectionchange', hideMenu);
});

function copyToken() {
  if (!token.value) return;
  navigator.clipboard.writeText(token.value).then(() => {
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  });
}
</script>

<style scoped>
.token-section {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  background: #f9f9f9;
  max-width: 100%;
  word-break: break-word;
}

.token-box {
  width: 100%;
  height: 120px;
  font-family: monospace;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.copy-btn {
  padding: 6px 12px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.copied-msg {
  color: green;
  margin-top: 0.5rem;
}


.highlight-text {
  user-select: none;
  -webkit-user-select: none;
  /* Safari/Chrome */
  -ms-user-select: none;
  /* IE/Edge */
  -webkit-touch-callout: none;
  /* iOS long-press menu */
  -webkit-tap-highlight-color: transparent;
  /* Removes grey highlight on tap */
  background-color: #ffffcc;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}
</style>