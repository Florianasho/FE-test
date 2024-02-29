<template>
  <div id="home">
    <carousel-image 
      :slides={sliderData} 
      controls
      indicators
      :interval="3000"
    />
    <product-list :products={...featuredData} />
    <product-list :products={...productData} />
  </div>
</template>

<script>
  import CarouselImage from '@/components/slider/CarouselImage.vue';
  import ProductList from '@/components/products/ProductList.vue';

  export default {
    data() {
      return {
        data: null,
        sliderData: null,
        featuredData: {
          title: 'Featured Photo Gallery',
          product: [],
          pageSize: 10,
          backgroundColor: '#f3f3f3'
        },
        productData: {
          title: 'Product Gallery',
          product: [],
          pageSize: 5,
          backgroundColor: 'white'
        },
      };
    },
    components: { CarouselImage, ProductList },
    beforeMount() {
      this.data = this.$store.state.data;
      this.sliderData = this.data.slice(0,5);
      this.featuredData = {
        ...this.featuredData,
        product: this.data.filter(item => item.is_featured)
      };
      this.productData = {
        ...this.productData,
        product: this.data.filter(item => !item.is_featured)
      };
    },
    watch: {
      data: function(val) {
        this.data = val;
        this.sliderData = val.slice(0,5);
      },
      '$store.state.data': function(val) {
        this.featuredData = {
          ...this.featuredData,
          product: val.filter(item => item.is_featured)
        };
        this.productData = {
          ...this.productData,
          product: val.filter(item => !item.is_featured)
        };
      }
    }
  };
</script>

<style scoped>
#home {margin-top: 80px;}
</style>
