<template>
  <div class="wrapper" @click="hideMenu">
    <div
      ref="textRef"
      class="selectable-text"
      @mouseup="handleSelection"
      @touchend="handleSelection"
      @contextmenu.prevent
      @touchstart.prevent
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel turpis ut libero sollicitudin viverra.
    </div>

    <div
      v-if="menuVisible"
      class="menu"
      :style="{ top: `${menuY}px`, left: `${menuX}px` }"
    >
      <button @click="copyText">Copy</button>
      <button @click="shareText">Share</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const textRef = ref(null);
const menuVisible = ref(false);
const menuX = ref(0);
const menuY = ref(0);

const hideMenu = () => {
  menuVisible.value = false;
  window.getSelection()?.removeAllRanges(); // clear selection
};

const handleSelection = () => {
  const selection = window.getSelection();
  const selectedText = selection?.toString().trim();
  if (!selectedText) return;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  menuX.value = rect.left + window.scrollX;
  menuY.value = rect.top + window.scrollY - 50;
  menuVisible.value = true;
};

const copyText = async () => {
  const text = window.getSelection().toString();
  await navigator.clipboard.writeText(text);
  alert('Copied!');
  hideMenu();
};

const shareText = async () => {
  const text = window.getSelection().toString();
  if (navigator.share) {
    try {
      await navigator.share({ text });
    } catch (e) {
      console.warn('Sharing canceled or failed:', e);
    }
  } else {
    alert('Web Share API not supported');
  }
  hideMenu();
};

onMounted(() => {
  document.addEventListener('selectionchange', () => {
    const text = window.getSelection().toString().trim();
    if (!text) hideMenu();
  });
});

onBeforeUnmount(() => {
  document.removeEventListener('selectionchange', hideMenu);
});
</script>

<style scoped>
.wrapper {
  padding: 20px;
  position: relative;
}

.selectable-text {
  user-select: text;
  -webkit-user-select: text;
  -webkit-touch-callout: none; /* iOS: block native copy menu */
  -webkit-tap-highlight-color: transparent; /* Android: remove tap flash */
  background: #f9f9d9;
  border-radius: 6px;
  padding: 12px;
  font-size: 16px;
  line-height: 1.6;
}

.menu {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  padding: 6px 10px;
  display: flex;
  gap: 8px;
  z-index: 999;
}

.menu button {
  font-size: 14px;
  padding: 4px 8px;
  cursor: pointer;
}
</style>
