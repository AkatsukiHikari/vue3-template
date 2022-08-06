<!--
 * @Author: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Date: 2022-08-06 15:14:46
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @LastEditTime: 2022-08-06 19:54:36
 * @FilePath: /vue3-template/src/components/common/SettingDrawer/src/SettingDrawer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <n-drawer v-model:show="isOpen" :width="width" :placement="placement">
    <n-drawer-content :title="title" :native-scrollbar="false">
      <div class="drawer">
        <n-divider title-placement="center">主题</n-divider>

        <div class="justify-center drawer-setting-item dark-switch">
          <n-tooltip placement="bottom">
            <template #trigger>
              <n-switch v-model:value="themeStore.isDarkTheme" class="dark-theme-switch">
                <template #checked>
                  <n-icon size="14" color="#ffd93b">
                    <SunnySharp />
                  </n-icon>
                </template>
                <template #unchecked>
                  <n-icon size="14" color="#ffd93b">
                    <Moon />
                  </n-icon>
                </template>
              </n-switch>
            </template>
            <span>{{ themeStore.isDarkTheme ? '深' : '浅' }}色主题</span>
          </n-tooltip>
        </div>

        <n-divider title-placement="center">系统主题</n-divider>

        <div class="drawer-setting-item align-items-top">
          <span
            class="theme-item"
            v-for="(item, index) in appThemeList"
            :key="index"
            :style="{ 'background-color': item }"
            @click="togTheme(item)"
          >
            <n-icon size="12" v-if="item === themeStore.appTheme">
              <CheckOutlined />
            </n-icon>
          </span>
        </div>

        <n-divider title-placement="center">导航栏模式</n-divider>

        <div class="drawer-setting-item align-items-top">
          <div class="drawer-setting-item-style align-items-top">
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="~@/assets/images/nav-theme-dark.svg"
                  @click="togNavMode('vertical')"
                  alt="左侧菜单模式"
                />
              </template>
              <span>左侧菜单模式</span>
            </n-tooltip>
            <n-badge dot color="#19be6b" v-show="appStore.navMode === 'vertical'" />
          </div>

          <div class="drawer-setting-item-style">
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="~@/assets/images/nav-horizontal.svg"
                  alt="顶部菜单模式"
                  @click="togNavMode('horizontal')"
                />
              </template>
              <span>顶部菜单模式</span>
            </n-tooltip>
            <n-badge dot color="#19be6b" v-show="appStore.navMode === 'horizontal'" />
          </div>

          <div class="drawer-setting-item-style">
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="~@/assets/images/nav-horizontal-mix.svg"
                  @click="togNavMode('horizontal-mix')"
                  alt="顶部菜单混合模式"
                />
              </template>
              <span>顶部菜单混合模式</span>
            </n-tooltip>
            <n-badge dot color="#19be6b" v-show="appStore.navMode === 'horizontal-mix'" />
          </div>
        </div>

        <n-divider title-placement="center">导航栏风格</n-divider>

        <div class="drawer-setting-item align-items-top">
          <div class="drawer-setting-item-style align-items-top">
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="~@/assets/images/nav-theme-dark.svg"
                  alt="暗色侧边栏"
                  @click="togNavTheme('dark')"
                />
              </template>
              <span>暗色侧边栏</span>
            </n-tooltip>
            <n-badge dot color="#19be6b" v-if="appStore.navTheme === 'dark'" />
          </div>

          <div class="drawer-setting-item-style">
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="~@/assets/images/nav-theme-light.svg"
                  alt="白色侧边栏"
                  @click="togNavTheme('light')"
                />
              </template>
              <span>白色侧边栏</span>
            </n-tooltip>
            <n-badge dot color="#19be6b" v-if="appStore.navTheme === 'light'" />
          </div>

          <div class="drawer-setting-item-style">
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="~@/assets/images/header-theme-dark.svg"
                  @click="togNavTheme('header-dark')"
                  alt="暗色顶栏"
                />
              </template>
              <span>暗色顶栏</span>
            </n-tooltip>
            <n-badge dot color="#19be6b" v-if="appStore.navTheme === 'header-dark'" />
          </div>
        </div>
        <n-divider title-placement="center">界面功能</n-divider>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 固定顶栏 </div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="appStore.headerSetting.fixed" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 固定多页签 </div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="appStore.multiTabsSetting.fixed" />
          </div>
        </div>

        <n-divider title-placement="center">界面显示</n-divider>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 显示重载页面按钮 </div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="appStore.headerSetting.isReload" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 显示面包屑导航 </div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="appStore.crumbsSetting.show" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 显示面包屑显示图标 </div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="appStore.crumbsSetting.showIcon" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 显示多页签 </div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="appStore.multiTabsSetting.show" />
          </div>
        </div>

        <n-divider title-placement="center">动画</n-divider>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 禁用动画 </div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="appStore.isPageAnimate" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 动画类型 </div>
          <div class="drawer-setting-item-select">
            <n-select v-model:value="appStore.pageAnimateType" :options="animateOptions" />
          </div>
        </div>
      </div>
      
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref, defineExpose, toRefs, unref, watch, computed } from 'vue';
import { useAppStore } from '@/stores/app';
import { useThemeStore } from '@/stores/theme';
import { CheckOutlined } from '@vicons/antd';
import { Moon, SunnySharp } from '@vicons/ionicons5';
import { 
    darkTheme, 
    NDrawer , 
    NDivider , 
    NIcon, 
    NSwitch,
    NTooltip , 
    NBadge, 
    NSelect ,
    NDrawerContent
} from 'naive-ui';
import { animates as animateOptions } from '@/settings/animateSetting';

interface ISettingProps{
    title?: string,
    width?: number,
    placement?: "right" | "left",
}

const props = withDefaults( defineProps<ISettingProps>() , {
    title: "项目设置",
    width: 280,
    placement: "right"
})

const appStore = useAppStore();
const themeStore = useThemeStore();

const appThemeList = ref<any>( themeStore.appThemeList );
const isOpen = ref<boolean>(false);

watch(
    () => themeStore.isDarkTheme,
    (to) => {
        appStore.navTheme = to ? 'header-dark' : 'dark';
    }
);

function openDrawer() {
    isOpen.value = true;
}

function closeDrawer () {
    isOpen.value = false;
}

const togNavTheme = (theme:any) => {
    appStore.navTheme = theme;
    if (appStore.navMode === 'horizontal' && ['light'].includes(theme)) {
        appStore.navTheme = 'dark';
    }
}

const togTheme = (color:any) => {
    themeStore.appTheme = color;
}

const togNavMode = (mode: any) => {
    appStore.navMode = mode;
    appStore.menuSetting.mixMenu = false;
}

defineExpose({
    openDrawer
})
</script>

<style lang="less" scoped>
.drawer {
    .n-divider:not(.n-divider--vertical) {
      margin: 10px 0;
    }

    &-setting-item {
      display: flex;
      align-items: center;
      padding: 12px 0;
      flex-wrap: wrap;

      &-style {
        display: inline-block;
        position: relative;
        margin-right: 16px;
        cursor: pointer;
        text-align: center;
      }

      &-title {
        flex: 1 1;
        font-size: 14px;
      }

      &-action {
        flex: 0 0 auto;
      }

      &-select {
        flex: 1;
      }

      .theme-item {
        width: 20px;
        min-width: 20px;
        height: 20px;
        cursor: pointer;
        border: 1px solid #eee;
        border-radius: 2px;
        margin: 0 5px 5px 0;
        text-align: center;
        line-height: 14px;

        .n-icon {
          color: #fff;
        }
      }
    }

    .align-items-top {
      align-items: flex-start;
      padding: 2px 0;
    }

    .justify-center {
      justify-content: center;
    }

    .dark-switch .n-switch {
      ::v-deep(.n-switch__rail) {
        background-color: #000e1c;
      }
    }
}
</style>
