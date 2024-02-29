<template>
  <div class="carousel-indicators">
    <button
      class="carousel-indicator-item" 
      :class="currentIdx === idx ? 'active' : ''" 
      v-for="(item, idx) in total" 
      :key="idx"
      @click="$emit('switch', idx)"
    ></button>
  </div>
</template>

<script>
export default {
  emits: ['switch'],
  props: ['total', 'currentIdx'],
}
</script>

<style scoped>
.carousel-indicators {
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  bottom: 8px;
  z-index: 2;
}

.carousel-indicator-item {
  width: 10px;
  height: 10px;
  border: none;
  background-color: white;
  opacity: .5;
  margin: 2px;
  border-radius: 100%;
  padding: 0;
  cursor: pointer;
}

.active {
  opacity: 1;
}
</style>
