<template>
  <div :style="{'backgroundColor': products.backgroundColor}">
    <h1 class="product-list-title">{{ products.title }}</h1>
    <div class="product-list">
      <product-item 
        v-for="(product, idx) in productData"
        :product="product"
        :key="idx"
      />
    </div>  
    <div class="text-center padding-bottom" v-show="products.product && productData && productData.length !== products.product.length">
      <button class="btn btn-primary" @click="loadData">Load More</button>
    </div>
  </div>
</template>

<script>
import ProductItem from '@/components/products/ProductItem.vue';

export default {
  props: ['products'],
  data: () => ({
    productData: [],
    page: 1
  }),
  components: { ProductItem, },
  watch: {
    products: function(val) {
      this.productData = val.product;
    }
  },
  methods: {
    loadData() {
      this.page++;
      this.productData = this.productData.concat(this.products.product.slice(this.productData.length, this.page * this.products.pageSize));
    }
  }
}
</script>

<style lang="scss" scoped>
.product-list-title {
  text-align: center;
  font-size: 40px;
  padding-top: 80px;
  margin: 0;

  @media screen and (max-width: 480px) {
    font-size: 30px;
    padding-top: 40px;
  }
}

.product-list {
  display: flex;
  padding: 50px 30px;
  flex-wrap: wrap;
  text-align: center;

  @media screen and (max-width: 480px) {
    padding: 10px;
  }
}

.padding-bottom {padding-bottom: 50px;}

</style>