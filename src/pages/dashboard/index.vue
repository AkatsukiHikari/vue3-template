<template>
    <div class="w-full h-full overflow-hidden" >
       DashBoard
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.screen::after {
    content: '';
    background: rgba(255, 0, 0, 0.15);
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    transition: 2s;
}
.screen.night-light::after {
    opacity: 1;
}
</style>


<route lang="yaml">
meta:
  title: 工作台
  layout: index
</route>