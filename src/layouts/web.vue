<!--
 * @Author: hikari
 * @Date: 2022-04-02 13:57:16
 * @LastEditTime: 2022-08-02 15:18:58
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /cloud-desktop-plus/src/layouts/index.vue

-->
<template>
  <main class="screen w-screen h-screen relative">
    <!-- left menu -->
    <div>
      
    </div>
    <!-- 右侧窗口主体 -->
    <div>
      <!-- 导航 -->
      <header>

      </header>

      <router-view />
    </div>

  </main>
</template>

<script setup lang="ts">
import { ref, unref, computed, onMounted } from 'vue';
import { useAppStore } from '@/stores/app'

</script>

<style lang="scss" scoped>
.desktop{
    writing-mode: horizontal-tb;
}
</style>