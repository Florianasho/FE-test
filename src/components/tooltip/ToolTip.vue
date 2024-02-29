<template>
  <div 
    :class="`tooltip ${show ? 'show' : ''}`"
  >
    <div class="overlay"></div>
    <div class="tooltip-text">
      <p>
        {{ text }}
      </p>
      <div class="text-right">
        <button @click="onConfirm">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['text', 'id'],
  data: () => ({
    show: false
  }),
  created() {
    if(!localStorage.getItem(`${this.id}-tooltip`)) {
      this.show = true;
    }
  },
  watch: {
    show: function(val) {
      this.show = val;
    }
  },
  methods: {
    onConfirm() {
      localStorage.setItem(`${this.id}-tooltip`, true);
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
  visibility: hidden;
  .overlay {
    position: absolute;
    top: 0px;
    right: 23px;
    width: 180px;
    height: 45px;
    box-shadow: 0 0 0 9999px rgba(0,0,0,.2);
  }
  /* Tooltip text */
  .tooltip-text {
    font-size: 14px;
    width: 200px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 10px;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    right: -30px;
    transform: translateX(-50%);
    top: 58px;
    &::after {
      content: " ";
      position: absolute;
      left: 50%;
      bottom: 100%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent black transparent;
    }
    button {
      background: white;
      color: black;
      outline: hidden;
      border: none;
      border-radius: 4px;
      padding: 5px 10px;
      cursor: pointer;
    }
  }
  &.show {
    visibility: visible;
  }
}
</style>