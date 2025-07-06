<template>
  <div class="pie-chart">
    <div
      v-for="(slice, index) in slices"
      :key="'slice-' + index"
      class="slice"
      :style="getSliceStyle(index, slice.angle, slice.color)"
    ></div>

    <div
      v-for="(slice, index) in slices"
      :key="'label-' + index"
      class="label"
      :style="getLabelStyle(index, slice.angle)"
    >
      <span>{{ slice.label }}</span>
      <span class="line"></span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Props
const props = defineProps({
  data: {
    type: Array,
    required: true,
    // Example: [{ label: 'A', value: 30, color: '#f00' }, ...]
  },
});

const total = computed(() =>
  props.data.reduce((acc, item) => acc + item.value, 0)
);

// Compute angle per slice
const slices = computed(() => {
  let startAngle = 0;
  return props.data.map((item) => {
    const angle = (item.value / total.value) * 360;
    const slice = {
      ...item,
      startAngle,
      angle,
    };
    startAngle += angle;
    return slice;
  });
});

const getSliceStyle = (index, angle, color) => {
  const rotation = slices.value[index].startAngle;
  return {
    backgroundColor: color,
    transform: `rotate(${rotation}deg)`,
    clipPath: "polygon(50% 50%, 100% 0, 100% 100%)", // simple triangle segment
  };
};

const getLabelStyle = (index, angle) => {
  const midAngle = slices.value[index].startAngle + angle / 2;
  const radius = 100;
  const rad = (midAngle * Math.PI) / 180;
  const x = 50 + Math.cos(rad) * radius;
  const y = 50 + Math.sin(rad) * radius;
  return {
    left: `${x}%`,
    top: `${y}%`,
    transform: `translate(-50%, -50%)`,
  };
};
</script>

<style scoped>
.pie-chart {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #eee;
  overflow: hidden;
}

.slice {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-origin: center center;
  border-radius: 50%;
}

.label {
  position: absolute;
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
}

.label .line {
  display: block;
  width: 1px;
  height: 30px;
  background-color: black;
  margin: 4px auto 0;
}
</style>
