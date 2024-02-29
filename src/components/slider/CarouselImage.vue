<template>
  <div class="carousel" id="carousel">
    <div class="carousel-inner">
      <p class="counter">{{currentSlide + 1}} / {{slides ? slides.sliderData.length : ''}}</p>
      <carousel-item 
        v-for="(slide, index) in slides.sliderData" 
        :slide="slide" 
        :key="index"
        :idx="index"
        :currentSlide="currentSlide"
        :direction="direction"
        @mouseenter="stopSlideTimer"
        @mouseout="startSlideTimer"
      ></carousel-item>
      <carousel-control 
        @prev="prev" 
        @next="next"
        v-if="controls"
      ></carousel-control>
      <carousel-indicator 
        v-if="indicators"
        :total="maxLength" 
        :currentIdx="currentSlide"
        @switch="switchSlide($event)"
      ></carousel-indicator>
    </div>
  </div>
</template>

<script>
  import CarouselItem from "./CarouselItem.vue";
  import CarouselControl from "./CarouselControls.vue";
  import CarouselIndicator from "./CarouselIndicators.vue";

  export default {
    components: { CarouselItem, CarouselControl, CarouselIndicator },
    props: {
      slides: {
        type: Object,
        required: true,
      },
      controls: {
        type: Boolean,
        default: false,
      },
      indicators: {
        type: Boolean,
        default: false,
      },
      interval: {
        type: Number,
        default: 5000
      },
    },
    data: () => ({
      currentSlide: 0,
      slideInterval: null,
      direction: '',
      maxLength: 5,
    }),
    methods: {
      setCurrentSlide(index) {
        this.currentSlide = index
      },
      prev(step = -1) {
        const index = this.currentSlide > 0 ? this.currentSlide + step : this.slides.sliderData.length-1;
        this.setCurrentSlide(index);
        this.direction = 'left';
        this.startSlideTimer();
      },
      _next(step = 1) {
        const index = this.currentSlide < this.slides.sliderData.length -1 ? this.currentSlide + step : 0;
        this.setCurrentSlide(index);
        this.direction = 'right';
      },
      next(step = 1) {
        this._next(step);
        this.startSlideTimer();
      },
      startSlideTimer() {
        this.stopSlideTimer();
        this.slideInterval = setInterval(() => {
          this._next()
        }, this.interval)
      },
      stopSlideTimer() {
        clearInterval(this.slideInterval);
      },
      switchSlide(index) {
        const step = index - this.currentSlide;
        step > 0 ? this.next(step) : this.prev(step)
      }
    },
    mounted () {
      this.startSlideTimer();
    },
    beforeUnmount () {
      this.stopSlideTimer();
    }
  }
</script>

<style scoped>
  .carousel {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }

  .carousel-inner {
    position: relative;
    width: 600px;
    height: 400px;
    overflow: hidden;
  }

  .counter {
    font-size: 14px;
    position: absolute;
    z-index: 3;
    top: 20px;
    left: 20px;
    margin: 0;
    color: white;
  }

</style>
