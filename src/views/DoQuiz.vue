<template>
 <div class="custom-selectable">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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

['copy', 'cut', 'paste', 'contextmenu'].forEach(evt => {
  document.addEventListener(evt, e => e.preventDefault());
});

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
.custom-selectable {
  user-select: text;
  -webkit-user-select: text;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}
</style>
