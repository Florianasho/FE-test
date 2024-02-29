<template>
  <button class="carousel-control left" @click="$emit('prev')" title="previous">&lt;</button>
  <button class="carousel-control right" @click="$emit('next')" title="next">&gt;</button>
</template>

<script>
export default {
  emits: ['prev', 'next']
}
</script>

<style scoped>
  .carousel-control {
    background-color: rgba(0,0,0,.5);
    border: none;
    display: inline-block;
    position: absolute;
    height: 40px;
    width: 40px;
    top: calc(50% - 25px);
    color: #f3f3f3;
    cursor: pointer;
    font-size: 24px;
    border-radius: 100%;
  }

  .left { left: 10px; }
  .right { right: 10px; }
</style>