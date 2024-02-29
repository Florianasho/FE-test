<template>
  <div class="modal">
    <div class="modal-overlay" @click="$emit('closeClick')"></div>
    <div class="modal-container" v-if="selectedData">
      <div class="modal-top">
        <p class="image-title">{{ selectedData.title }}</p>
        <span class="close-button" @click="$emit('closeClick')">x</span>
      </div>
      <div class="modal-body">
        <img :src="selectedData.image_url" :alt="selectedData.title" />
        <p class="image-rating">
          <star-rating 
            :value="selectedData.rating" 
            :disabled="isDisabled"
            :name="selectedData.title"
            :id="'modal'"
          ></star-rating>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import StarRating from '@/components/rating/StarRating.vue';
  export default {
    props: ['data'],
    components: { StarRating },
    emits: ['closeClick'],
    data: () => ({
      selectedData: {
        type: Array,
        default: {
          title: {
            type: Array,
            default: null
          },
          image_url: {
            type: Array,
            default: null
          },
          rating: {
            type: Array,
            default: null
          },
        }
      },
      isDisabled: true
    }),
    watch: {
      data: function(val) {
        this.selectedData = this.$store.state.data.find(item => item.title === val);
      },
    }
  }
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  background-color: rgba(0,0,0,.5);
  width: 100vw;
  height: 100vh;
  z-index: 8;
  left: 0;
  top: 0;
}
  .modal-container {
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 16px;
    box-shadow: 4px 4px 5px -2px rgba(0,0,0,0.75);
    -webkit-box-shadow: 4px 4px 5px -2px rgba(0,0,0,0.75);
    -moz-box-shadow: 4px 4px 5px -2px rgba(0,0,0,0.75);
    background-color: white;
    top: 50%;
    left: 50%;
    color: black;
    transform: translateX(-50%);
    z-index: 9;

    .modal-top {
      border-bottom: 1px solid #b3b3b3;
      padding: 10px 20px;
      position: relative;
      height: 60px;
      text-align: center;
      .image-title {
        font-size: 24px;
        margin: 15px 0 40px;
      }
      .close-button {
        width: 30px;
        height: 30px;
        font-size: 16px;
        line-height: 30px;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color:#f3f3f3;
        right: 20px;
        cursor: pointer;
        &:hover {
          background-color: darken(#f3f3f3, 10%);
        }
      }
    }
    .modal-body {
      overflow-y: auto;
      height: 490px;
      margin-bottom: 50px;
      padding: 0 20px;
      text-align: center;
      .image-rating {
        font-size: 13px;
      }
      img {
        margin-top: 20px;
        width: 100%;
      }
    }

    @media screen and (max-width: 480px) {
      width: calc(100% - 20px);

      .modal-top .image-title {
        font-size: 16px;
        text-align: left;
      }
      
    }
  }
</style>