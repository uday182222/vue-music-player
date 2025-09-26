<!--
Switch toggle component

<my-switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></my-switches>

// switch text
switches: [
  {name: 'Recent Plays'},
  {name: 'Search History'}
],
// current switch
currentIndex: 0

switchItem(index) {
  this.currentIndex = index
}
 -->

<template>
  <ul class="my-switches">
    <li class="switch-item" :class="{'active':currentIndex === index}"
        v-for="(item, index) in switches" @click="switchItem(index)">
      <span>{{ item.name }} </span>
    </li>
  </ul>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  props: {
    switches: {
      type: Array,
      default: []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  watch: {},
  methods: {
    // switch was toggled, notify parent component
    switchItem(index) {
      this.$emit('switch', index)
    }
  },
  // filters are designed for simple text transformation
  filters: {},
  // for more complex data transformation, you should use computed properties
  computed: {},
  created () {},
  mounted () {},
  destroyed () {}
}
</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';

.my-switches {
  display: flex;
  align-items: center;
  width: 240px;
  margin: 0 auto;
  border: 1px solid $color-highlight-background;
  border-radius: 5px;
  .switch-item {
    flex: 1;
    padding: 8px;
    text-align: center;
    font-size: $font-size-medium;
    color: $color-text-d;
    &.active {
      background: $color-highlight-background;
      color: $color-text;
    }
  }
}
</style>
