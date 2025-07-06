<template>
  <div
    class="chart-container"
     :style="{
    width: size + 'px',
    height: size + 'px',
    position: 'relative',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }"
  >
    <svg class="donut" :viewBox="`0 0 ${size} ${size}`">
      <!-- Background ring -->
      <circle
        class="donut-ring"
        :cx="center"
        :cy="center"
        :r="radius"
        fill="transparent"
        stroke="#eeee"
        :stroke-width="thickness"
      />

      <!-- Segments -->
      <template v-for="(segment, i) in segments" :key="'segment-' + i">
        <circle
          class="donut-segment"
          fill="transparent"
          :stroke="segment.color"
          :stroke-width="thickness"
          :stroke-dasharray="`${segment.animatedLength} ${circumference}`"
          :stroke-dashoffset="segment.offset"
          :transform="`rotate(-90 ${center} ${center})`"
          :cx="center"
          :cy="center"
          :r="radius"
        />
      </template>

      <!-- White separators -->
      <line
        v-for="(segment, i) in segments"
        :key="'separator-' + i"
        :x1="center + Math.cos(segment.startAngle) * (radius - thickness / 2)"
        :y1="center + Math.sin(segment.startAngle) * (radius - thickness / 2)"
        :x2="center + Math.cos(segment.startAngle) * (radius + thickness / 2)"
        :y2="center + Math.sin(segment.startAngle) * (radius + thickness / 2)"
        stroke="white"
        stroke-width="0.5"
        stroke-linecap="round"
      />

      <!-- Connecting lines for small segments -->
      <template v-for="(segment, i) in segments" :key="'line-' + i">
        <template v-if="segment.percent < 10">
          <line
            :x1="segment.lineStart.x"
            :y1="segment.lineStart.y"
            :x2="segment.lineBreak.x"
            :y2="segment.lineBreak.y"
            stroke="black"
            stroke-width="0.3"
          />
          <line
            :x1="segment.lineBreak.x"
            :y1="segment.lineBreak.y"
            :x2="segment.lineEnd.x"
            :y2="segment.lineEnd.y"
            stroke="black"
            stroke-width="0.3"
          />
        </template>
      </template>

      <!-- White center -->
      <circle :cx="center" :cy="center" :r="radius - thickness / 2" fill="white" />
    </svg>

    <!-- HTML Labels -->
    <template v-for="(segment, i) in segments" :key="'html-label-' + i">
      <div
        class="label"
        :class="{ small: segment.percent < 10, left: segment.isLeft }"
        :style="{
          position: 'absolute',
          left: `${segment.percent < 10 ? segment.lineEnd.x : segment.textCenter.x}px`,
          top: `${segment.percent < 10 ? segment.lineEnd.y : segment.textCenter.y}px`,
          transform: segment.percent < 10
            ? (segment.isLeft ? 'translate(-100%, -50%)' : 'translate(0, -50%)')
            : 'translate(-50%, -50%)'
        }"
      >
        <span class="label-text" v-if="segment.percent < 10">
          {{ segment.label }} ({{ segment.percent.toFixed(1) }}%)
        </span>
        <span class="label-text" v-else>
          {{ segment.label }}
        </span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  data: Array,
  size: { type: Number, default: 350 },
  thickness: { type: Number, default: 50 },
  radiusRatio: { type: Number, default: 0.18 }
})

const center = props.size / 2
const radius = props.size * props.radiusRatio
const circumference = 2 * Math.PI * radius

const filteredData = computed(() =>
  props.data.filter((d) => typeof d.value === 'number' && d.value > 0)
)

const baseTotal = 100
const segments = ref([])

onMounted(() => {
  let accumulated = 0
  let outlineIndex = 0
  const outlineItems = filteredData.value.filter(
    (d) => (d.value / baseTotal) * 100 < 10
  )
  const totalOutline = outlineItems.length

  segments.value = filteredData.value.map((d) => {
    const ratio = d.value / baseTotal
    const percent = ratio * 100
    const length = ratio * circumference
    const offset = -accumulated * circumference
    const angle = (accumulated + ratio / 2) * 2 * Math.PI - Math.PI / 2
    const startAngle = accumulated * 2 * Math.PI - Math.PI / 2
    const angleDeg = (angle * 180) / Math.PI
    const isLeft = angleDeg > 90 && angleDeg < 270

    const isOutline = percent < 10
    const outlinePosition = isOutline ? outlineIndex++ : -1

    const arcOuter = radius + props.thickness / 2
    const baseOffset = 10
    const maxExtraOffset = 20


const arcOuterOffset = isOutline
  ? arcOuter +
    baseOffset +
    ((outlinePosition === totalOutline - 1)
      ? 1.5 * maxExtraOffset 
      : (maxExtraOffset * outlinePosition) / Math.max(1, totalOutline - 1))
  : arcOuter + baseOffset

    const labelHalfWidth = 30
    const arcInner = radius - props.thickness / 2
    const arcMiddle = (arcOuter + arcInner) / 2

    const textCenter = {
      x: center + Math.cos(angle) * arcMiddle,
      y: center + Math.sin(angle) * arcMiddle
    }

    const lineStart = {
      x: center + Math.cos(angle) * arcOuter,
      y: center + Math.sin(angle) * arcOuter
    }

    const lineBreak = {
      x: center + Math.cos(angle) * arcOuterOffset,
      y: center + Math.sin(angle) * arcOuterOffset
    }

    const verticalSpacing = 0 // ← adjust spacing as needed

const lineEnd = {
  x: lineBreak.x + (isLeft ? -labelHalfWidth : labelHalfWidth),
  y: lineBreak.y + (isOutline ? outlinePosition * verticalSpacing : 0)
}


    accumulated += ratio

    return {
      label: d.label,
      color: d.color,
      percent,
      length,
      offset,
      isLeft,
      textCenter,
      lineStart,
      lineBreak,
      lineEnd,
      animatedLength: 0,
      startAngle,
      arcOuterOffset
    }
  })

  segments.value.forEach((seg, i) => {
    setTimeout(() => {
      seg.animatedLength = seg.length
    }, i * 150)
  })
})
</script>

<style scoped>
.donut {
  width: 100%;
  height: 100%;
}

.donut-segment {
  stroke-linecap: butt;
  transition: stroke-dasharray 1s ease;
}

.label {
  color: black;
  white-space: normal;
  pointer-events: none;
  font-weight: bold;
  font-size: 10px;
  background: rgba(255, 255, 255, 0.85);
  padding: 2px 4px;
  border-radius: 3px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  z-index: 0;
  max-width: 80px;
}

.label.left {
  text-align: right;
}

.label.small {
  font-size: 8px;
}

.label-text {
  display: inline-block;
  max-width: 80px;
  word-break: break-word;
  white-space: normal;
  line-height: 1.2;
}
</style>
