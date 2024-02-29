<template>
  <header>
    <p class="logo">Holywing</p>
    <auto-complete :source="titles"/>
    <tool-tip :text="tooltip_text" id="search" />
  </header>
</template>

<script>
import AutoComplete from '@/components/autocomplete/AutoComplete.vue';
import ToolTip from '@/components/tooltip/ToolTip.vue';

export default {
  data: () => ({
    titles: [],
    tooltip_text: 'Anda bisa mencari foto dan mengubah rating foto disini '
  }),
  components: { AutoComplete, ToolTip },
  beforeMount() {
    this.titles = this.$store.state.data.map((item) => {
      return item['title']
    });
  },
  watch: {
    titles: function(val) {
      this.titles = val;
    }
  }
}
</script>


<style lang="scss" scoped>
header {
  display: flex;
  position: sticky;
  top: 0;
  background-color: red;
  color: white;
  height: 60px;
  padding: 8px 20px;
  z-index: 9;
  text-align: center;

  @media screen and (max-width: 768px) {
    text-align: left;
    padding: 4px 20px;
  }

  .logo {
    width: 100%;
    margin: 0;
    line-height: 52px;
  }
}
</style>