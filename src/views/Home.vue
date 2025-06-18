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
import { ref, onMounted } from "vue";

const token = ref("");
const copied = ref(false);

onMounted(() => {
  token.value = sessionStorage.getItem("fcm_token") || "";
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
</style>