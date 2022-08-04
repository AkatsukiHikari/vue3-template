<!--
 * @Author: hikari
 * @Date: 2022-04-02 13:57:16
 * @LastEditTime: 2022-08-04 21:12:23
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /cloud-desktop-plus/src/layouts/index.vue
-->
<template>
  <n-layout class="flex" :position="fixedMenu" has-sider>
    <n-layout-sider
        v-if="
          !isMobile && isMixMenuNoneSub && (navMode === 'vertical' || navMode === 'horizontal-mix')
        "
        show-trigger="bar"
        @collapse="collapsed = true"
        :position="fixedMenu"
        @expand="collapsed = false"
        :collapsed="collapsed"
        collapse-mode="width"
        :collapsed-width="64"
        :width="leftMenuWidth"
        :native-scrollbar="false"
        :inverted="inverted"
        class="layout-sider"
      >
        <!-- <Logo :collapsed="collapsed" /> -->
        <AsideMenu v-model:collapsed="collapsed" v-model:location="getMenuLocation" />
      </n-layout-sider>

      <n-layout-content
        class="layout-content"
        :class="{ 'layout-default-background': getDarkTheme === false }"
      >
        <div
          class="layout-content-main"
          :class="{
            'layout-content-main-fix': fixedMulti,
            'fluid-header': fixedHeader === 'static',
          }"
        >
          <TabsView v-if="isMultiTabs" v-model:collapsed="collapsed" />
          <div
            class="main-view"
            :class="{
              'main-view-fix': fixedMulti,
              noMultiTabs: !isMultiTabs,
              'mt-3': !isMultiTabs,
            }"
          >
            <router-view />
          </div>
        </div>
      </n-layout-content>
      <n-back-top :right="100" />
      
  </n-layout>
</template>

<script setup lang="ts">
import { ref, unref, computed, onMounted } from 'vue';
import { AsideMenu } from '@/components/common/Menu'
import { useAppStore } from '@/stores/app'
import { useThemeSetting } from '@/hooks/setting/useThemeSetting'
import { useLoadingBar, NLayout, NLayoutSider , NLayoutContent ,NBackTop } from 'naive-ui';
import { useRoute } from 'vue-router';

const appStore = useAppStore();
const themeSetting = useThemeSetting()

const {
  // getShowFooter,
  getNavMode,
  getNavTheme,
  getHeaderSetting,
  getMenuSetting,
  getMultiTabsSetting,
} = appStore;

const navMode = getNavMode;

const { getDarkTheme } = themeSetting;


const collapsed = ref<boolean>(false);

const fixedMenu = computed(() => {
  // @ts-ignore
  const { fixed } = unref(getHeaderSetting);
  return fixed ? 'absolute' : 'static';
});

const getMenuLocation = computed(() => {
  return 'left';
});


const isMobile = computed<boolean>({
  get: () => appStore.getIsMobile,
  set: (val) => appStore.setIsMobile(val),
});


// @ts-ignore
const { mobileWidth, menuWidth } = unref(getMenuSetting);

const leftMenuWidth = computed(() => {
  // @ts-ignore
  const { minMenuWidth, menuWidth } = unref(getMenuSetting);
  return collapsed.value ? minMenuWidth : menuWidth;
});


const isMixMenuNoneSub = computed(() => {
  const mixMenu = appStore.menuSetting.mixMenu;
  const currentRoute = useRoute();
  if (unref(navMode) != 'horizontal-mix') return true;
  if (unref(navMode) === 'horizontal-mix' && mixMenu && currentRoute.meta.isRoot) {
    return false;
  }
  return true;
});

const inverted = computed(() => {
  return ['dark', 'header-dark'].includes(unref(getNavTheme));
});



const isMultiTabs = computed(() => {
  // @ts-ignore
  return unref(getMultiTabsSetting).show;
});

const fixedMulti = computed(() => {
  // @ts-ignore
  return unref(getMultiTabsSetting).fixed;
});


const fixedHeader = computed(() => {
  // @ts-ignore
  const { fixed } = unref(getHeaderSetting);
  return fixed ? 'absolute' : 'static';
});


</script>

<style lang="scss" scoped>
.desktop{
    writing-mode: horizontal-tb;
}
</style>