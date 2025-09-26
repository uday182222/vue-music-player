<!-- Top tip component -->

<template>
  <transition name="drop">
    <div class="my-top-tip" v-show="showFlag" @click.stop="hide">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      showFlag: false
    }
  },
  props: {
    // delay close time
    delay: {
      type: Number,
      default: 2000
    }
  },
  watch: {},
  methods: {
    show() {
      this.showFlag = true

      clearTimeout(this.timer)

      // auto close after delay seconds
      this.timer = setTimeout(() => {
        this.showFlag = false
      }, this.delay)
    },
    hide() {
      this.showFlag = false
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

.my-top-tip {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 500;
  background: $color-dialog-background;
  &.drop-enter-active, &.drop-leave-active {
    transition: all 0.3s;
  }
  &.drop-enter, &.drop-leave-to {
    transform: translate3d(0, -100%, 0);
  }
}
</style>
