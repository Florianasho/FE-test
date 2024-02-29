<template>
  <div>
    <div class="autocomplete">
      <div>
        <input type="text" placeholder="filter by name" v-model="search">
        <ul v-show="searchResults.length">
          <li 
            v-for="(result, idx) in searchResults" 
            :key="idx"
            @click="setSelected(result)"   
          >{{result}}</li>
        </ul>
      </div>
    </div>
    <modal :data="search" @closeClick="closeClick(false)" v-show="showModal"/>
  </div>
</template>

<script>
import { ref } from 'vue';
import Modal from '@/components/modal/ModalPopUp.vue';

export default {
  components: { Modal },
  props:{
    source: {
      type: Array,
      default: () => [],
      required: true
    },
  },
  data: () => ({
    search: ref(''),
    showModal: false
  }),
  computed: {
    searchResults() {
      if(this.search === '') {
        return [];
      }

      return this.source.filter(item => {
        if(item.toLowerCase().includes(this.search.toLowerCase())) {
          return item;
        }
      });
    }
  },
  watch: {
    showModal: function(val) {
      this.showModal = val
    }
  },
  methods: {
    setSelected(item) {
      this.search = item;
      this.closeClick(true);
    },
    closeClick(val) {
      this.showModal = val;
      this.search = val ? this.search : ref('');
      document.body.style.overflow = val ? "hidden" : "auto";
    },
  }
}
</script>
<style lang="scss" scoped>
  .autocomplete {
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    .mobile-icon {
      display: none;
      width: 40px;
      height: 40px;
      @media screen and (max-width: 480px) {
        display: block;
      }
    }
    input {
      height: 30px;
      max-width: 300px;
      width: 100%;
      margin: auto;
      padding: 0 10px;
    }
    ul {
      position: absolute;
      top: 18px;
      background: white;
      color: black;
      min-height: 50px;
      height: auto;
      max-height: 250px;
      overflow: auto;
      text-align: left;
      padding: 10px 10px 20px;
      width: 100%;
      cursor: pointer;
      li {
        display: block;
        list-style-type: none;
        border-bottom: 1px solid #f3f3f3;
        padding: 5px;
        font-size: 12px;
        &:hover {
          background-color: #f3f3f3;
        }
      }
    }
  }
</style>