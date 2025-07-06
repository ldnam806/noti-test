<template>
  <div tyle="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <!-- <DonutChart :data="chartData" /> -->

    <a href="https://drive.google.com/file/d/1T1T2yiaSdPqGp0J6iTdDAKXQ0h_sgMgo/view?usp=sharing" target="_blank" rel="noopener noreferrer">Click me</a>
  </div>
</template>

<script setup lang="ts">


import DonutChart from "@/components/DonutChart.vue";
const chartData = [

  { label: '4.0M 1.5M 1.5M 1.5M 1.5M 1.5M 1.5M', value: 45, color: '#1f77b4' },
  { label: '2.8M 1.5M 1.5M 1.5M 1.5M 1.5M 1.5M', value: 20, color: '#ff7f0e' },
  { label: '120k 1.5M 1.5M 1.5M 1.5M 1.5M 1.5M', value: 5, color: '#8c564b' },
  { label: '120k 1.5M 1.5M 1.5M 1.5M 1.5M 1.5M', value: 5, color: '#8c564b' },
  { label: '120k 1.5M 1.5M 1.5M 1.5M 1.5M 1.5M', value: 5, color: '#8c564b' },
  { label: '1.5M 1.5M 1.5M 1.5M 1.5M 1.5M', value: 5, color: '#2ca02c' },
  { label: '120k 1.5M 1.5M 1.5M 1.5M 1.5M 1.5M', value: 5, color: '#8c564b' },
  { label: '120k 1.5M 1.5M 1.5M 1.5M 1.5M 1.5M', value: 5, color: '#8c3642' },
  { label: '120k 1.5M 1.5M 1.5M 1.5M 1.5M 1.5M', value: 3, color: '#8c3642' },
  { label: '120k 1.5M 1.5M 1.5M 1.5M 1.5M 1.5M', value: 2, color: '#8c3642' },




]
</script>