<template>
  <div class="star-rating">
    <label 
      class="star-rating__star" 
      v-for="(rating, index) in ratings"
      :class="{'is-selected': ((star_value >= rating) && star_value != null), 'is-disabled': disabled_btn}"
      @click="set(rating)" @mouseover="star_over(rating)" @mouseout="star_out"
      :key="index"
    >
      <input class="star-rating star-rating__checkbox" type="radio" :value="rating" :name="name" v-model="star_value" :disabled="disabled_btn">
    ★</label>
    <div v-show="id === 'modal'">
      <button class="btn btn-primary btn-rating" @click="onEdit" v-if="!edit_mode">
        Edit Rating
      </button>
      <button class="btn btn-primary btn-rating" @click="onSave" v-else>
        Simpan Rating
      </button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    'name': String,
    'value': null,
    'id': String,
    'disabled': Boolean,
    'required': Boolean
  },
  data() {
    return {
      temp_value: null,
      ratings: [1, 2, 3, 4, 5],
      star_value: this.value,
      edit_mode: false,
      disabled_btn: this.disabled
    };
  },
  watch: {
    value: function() {
      this.star_value = this.value;
    },
    edit_mode: function(val) {
      this.edit_mode = val;
    }
  },
  methods: {
    // Behaviour of the stars on mouseover
    star_over: function(index) {
      if (!this.disabled_btn) {
        this.temp_value = this.value;
        return this.star_value = index;
      }
    },

    // Behaviour of the stars on mouseout
    star_out: function() {
      if (!this.disabled_btn) {
        return this.star_value = this.temp_value;
      }
    },
    // Set the rating
    set: function(value) {
      if (!this.disabled_btn) {
        this.temp_value = value;
        return this.star_value = value;
      }
    },
    onEdit: function() {
      this.edit_mode = true;
      this.disabled_btn = false;
    },
    onSave: function() {
      let text = `Kamu yakin ingin mengubah rating dari ${this.value} ke ${this.star_value}?`

      if(confirm(text) === true ) {
        this.edit_mode = false;
        this.disabled_btn = true;

        const data = this.$store.state.data;

        let productIndex = data.findIndex(item => item.title === this.name);
        data[productIndex].rating = this.star_value;
        // set new rating to store
        this.$store.commit('setData', data);
        alert('Rating berhasil diubah!');
      }
    }
  }
}
</script>

<style lang=scss scoped>
  %visually-hidden {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px; width: 1px;
    margin: -1px; padding: 0; border: 0;
  }

  .star-rating {

    &__star {
      display: inline-block;
      padding: 3px;
      vertical-align: middle;
      line-height: 1;
      font-size: 1.5em;
      color: #ABABAB;
      transition: color .2s ease-out;

      &:hover {
        cursor: pointer;
      }
      
      &.is-selected {
        color: #FFD700;
      }
      
      &.is-disabled:hover {
        cursor: default;
      }
    }

    &__checkbox {
      @extend %visually-hidden;
    }

    .btn-rating {
      font-size: 12px;
      margin-top: 10px;
    }
  }
</style>
