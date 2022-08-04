<template>
  <n-config-provider 
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="themeOverrides">
    <router-view />
  </n-config-provider>

</template>

<script  setup lang="ts">
import { zhCN, dateZhCN , NMessageProvider , NConfigProvider , darkTheme } from 'naive-ui'
import MessageApi from '@/components/message-api.vue'
import { ref , computed , onMounted } from 'vue'
import { lighten } from '@/utils/index'


const lightenStr = lighten("#4098fc", 6);

const themeOverrides = {
    common: {
      primaryColor: '#4098fc',
      primaryColorHover: lightenStr,
      primaryColorPressed: lightenStr,
    },

    Button: {
      backgroundColor: '#4098fc',
    }
}

</script>

<style lang="less">
@import "@/assets/css/index.less";

html{
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}


::-webkit-scrollbar {
  width: 6px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}
.main{
  height: 100vh;
  padding:0px;
  margin:0px;
  overflow: hidden;
}

.n-button{
  background-color: var(--n-color) !important;
}
</style>