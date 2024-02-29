<template>
  <div class="product-item">
    <div class="product-item__card">
      <div class="product-item__container">
        <img :src="product.image_url" :alt="product.title" />
        <p class="product-featured" v-show="product.is_featured">Featured</p>
        <p class="product-title">{{ product.title }}</p>
        <p class="product-rating">
          <star-rating disabled :value="product.rating"/>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from '../rating/StarRating.vue'
export default {
  components: { StarRating },
  props: ['product']  
}
</script>

<style lang="scss" scoped>
.product-item {
  padding: 10px;
  width: 33.333%;
  flex-shrink: 0;
  @media screen and (max-width: 468px) {
    width: 50%;
  }
  &__card {
    background: white;
    padding: 20px;
  
    .product-item__container {
      width: 100%;
      position: relative;
      p {margin: 0;}
      img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        transition: transform 1s;
        &:hover {
          transform: scale(1.05);
        }
        @media screen and (max-width: 768px) {
          height: 200px;
        }
        @media screen and (max-width: 480px) {
          height: 150px;
        }
      }
      .product-featured {
        position: absolute;
        right: 0;
        top: 10px;
        text-align: center;
        padding: 14px;
        background-color: rgba(0,0,0,.6);
        color: white;
        @media screen and (max-width: 480px) {
          font-size: 12px;
          padding: 8px;
        }
      }
      .product-title {
        font-size: 18px;
        margin: 10px 0;
        @media screen and (max-width: 480px) {
          font-size: 12px;
        }
      }
    
      .product-rating {
        font-size: 13px;
        @media screen and (max-width: 480px) {
          font-size: 10px;
        }
      }
    }
  }
}
</style>