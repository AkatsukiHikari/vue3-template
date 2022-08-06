<!--
 * @Author: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Date: 2022-08-06 09:51:50
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @LastEditTime: 2022-08-06 19:44:52
 * @FilePath: /vue3-template/src/components/common/TabsView/src/TabsView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    class="tabs-view"
    :class="{
      'tabs-view-fix': multiTabsSetting.fixed,
      'tabs-view-fixed-header': isMultiHeaderFixed,
      'tabs-view-default-background': getDarkTheme === false,
      'tabs-view-dark-background': getDarkTheme === true,
    }"
    :style="getChangeStyle"
  >
    <div class="tabs-view-main">
      <div ref="navWrap" class="tabs-card" :class="{ 'tabs-card-scrollable': scrollable }">
        <span
          class="tabs-card-prev"
          :class="{ 'tabs-card-prev-hide': !scrollable }"
          @click="scrollPrev"
        >
          <n-icon size="16" color="#515a6e">
            <LeftOutlined />
          </n-icon>
        </span>
        <span
          class="tabs-card-next"
          :class="{ 'tabs-card-next-hide': !scrollable }"
          @click="scrollNext"
        >
          <n-icon size="16" color="#515a6e">
            <RightOutlined />
          </n-icon>
        </span>
        <div ref="navScroll" class="tabs-card-scroll">
          <Draggable :list="tabsList" animation="300" item-key="fullPath" class="flex">
            <template #item="{ element }">
              <div
                :id="`tag${element.fullPath.split('/').join('\/')}`"
                class="tabs-card-scroll-item"
                :class="{ 'active-item': activeKey === element.path }"
                @click.stop="goPage(element)"
                @contextmenu="handleContextMenu($event, element)"
              >
                <span>{{ element.meta.title }}</span>
                <n-icon size="14" @click.stop="closeTabItem(element)" v-if="!element.meta.affix">
                  <CloseOutlined />
                </n-icon>
              </div>
            </template>
          </Draggable>
        </div>
      </div>
      <div class="tabs-close">
        <n-dropdown
          trigger="hover"
          @select="closeHandleSelect"
          placement="bottom-end"
          :options="TabsMenuOptions"
        >
          <div class="tabs-close-btn">
            <n-icon size="16" color="#515a6e">
              <DownOutlined />
            </n-icon>
          </div>
        </n-dropdown>
      </div>
      <n-dropdown
        :show="showDropdown"
        :x="dropdownX"
        :y="dropdownY"
        @clickoutside="onClickOutside"
        placement="bottom-start"
        @select="closeHandleSelect"
        :options="TabsMenuOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  provide,
  watch,
  onMounted,
  unref,
  nextTick,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storage } from '@/utils/Storage';
import { TABS_ROUTES } from '@/types/mutation-types';
import { useTabsViewStore ,RouteItem } from '@/stores/tabs';
import { useAsyncRouteStore } from '@/stores/router';
import { useProjectSetting } from '@/hooks/setting/useAppSetting';
import { useMessage ,useThemeVars , NIcon, NDropdown } from 'naive-ui';
import Draggable from 'vuedraggable';
import { PageEnum } from '@/enums/pageEnums';
import {
  DownOutlined,
  ReloadOutlined,
  CloseOutlined,
  ColumnWidthOutlined,
  MinusOutlined,
  LeftOutlined,
  RightOutlined,
} from '@vicons/antd';
import { renderIcon } from '@/utils';
import { useGo } from '@/hooks/web/usePage';
import { useThemeSetting } from '@/hooks/setting/useThemeSetting';
import { useAppStore } from '@/stores/app';

const message = useMessage();
const route = useRoute();
const router = useRouter();
const go = useGo();

const themeSetting = useThemeSetting();
const { getDarkTheme, getAppTheme } = themeSetting;

const { getNavMode, getHeaderSetting, getMenuSetting, getMultiTabsSetting, getIsMobile } = useProjectSetting();
const settingStore = useAppStore();

// refs
const tabsViewStore = useTabsViewStore();
const asyncRouteStore = useAsyncRouteStore();
const navScroll: any = ref(null);
const isCurrent = ref(false);

const multiTabsSetting = ref(getMultiTabsSetting);
const activeKey = ref<string>(route.fullPath);
const scrollable = ref<boolean>(false);
const dropdownX = ref<number>( 0 );
const dropdownY = ref<number>( 0 );
const showDropdown = ref<boolean>(false);
const isMultiHeaderFixed = ref<boolean>( false );


interface TabsProps {
  collapsed: boolean,
}
const props = withDefaults(defineProps<TabsProps>(), {
  collapsed: false,
});


const themeVars = useThemeVars();

const getCardColor = computed(() => {
  return themeVars.value.cardColor;
});

const getBaseColor = computed(() => {
  return themeVars.value.textColor1;
});


// 获取简易的路由对象
const getSimpleRoute = (route: any): RouteItem => {
  const { fullPath, hash, meta, name, params, path, query } = route;
  return { fullPath, hash, meta, name, params, path, query };
};

const isMixMenuNoneSub = computed(() => {
  const mixMenu = settingStore.menuSetting.mixMenu;
  const currentRoute = useRoute();
  const navMode = unref(getNavMode);
  if (unref(navMode) != 'horizontal-mix') return true;
  return !(unref(navMode) === 'horizontal-mix' && mixMenu && currentRoute.meta.isRoot);
});

//动态组装样式 菜单缩进
const getChangeStyle = computed(() => {
  const { collapsed } = props;
  const navMode = unref(getNavMode);
  const { minMenuWidth, menuWidth }: any = unref(getMenuSetting);
  const { fixed }: any = unref(getMultiTabsSetting);
  let lenNum =
    navMode === 'horizontal' || !isMixMenuNoneSub.value
      ? '0px'
      : collapsed
      ? `${minMenuWidth}px`
      : `${menuWidth}px`;

  if (getIsMobile.value) {
    return {
      left: '0px',
      width: '100%',
    };
  }
  return {
    left: lenNum,
    width: `calc(100% - ${!fixed ? '0px' : lenNum})`,
  };
});

//tags 右侧下拉菜单
const TabsMenuOptions = computed(() => {
  const isDisabled = unref(tabsList).length <= 1;
  return [
    {
      label: `关闭当前`,
      key: 'close-current',
      disabled: unref(isCurrent) || isDisabled,
      icon: renderIcon(CloseOutlined),
    },
    {
      label: '关闭其他',
      key: 'close-others',
      disabled: isDisabled,
      icon: renderIcon(ColumnWidthOutlined),
    },
    {
      label: '关闭全部',
      key: 'close-all',
      disabled: isDisabled,
      icon: renderIcon(MinusOutlined),
    },
  ];
});

let cacheRoutes: RouteItem[] = [];
const simpleRoute = getSimpleRoute(route);
try {
  const routesStr = storage.get(TABS_ROUTES) as string | null | undefined;
  cacheRoutes = routesStr ? JSON.parse(routesStr) : [simpleRoute];
} catch (e) {
  cacheRoutes = [simpleRoute];
}

// 将最新的路由信息同步到 localStorage 中
const routes = router.getRoutes();
cacheRoutes.forEach((cacheRoute) => {
  const route = routes.find((route) => route.path === cacheRoute.path);
  if (route) {
    cacheRoute.meta = route.meta || cacheRoute.meta;
    cacheRoute.name = (route.name || cacheRoute.name) as string;
  }
});

// 初始化标签页
tabsViewStore.initTabs(cacheRoutes);

//监听滚动条
function onScroll(e:any) {
  let scrollTop =
    e.target.scrollTop ||
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop; // 滚动条偏移量
    isMultiHeaderFixed.value = !!(
      !getHeaderSetting.value.fixed &&
      getMultiTabsSetting.value.fixed &&
      scrollTop >= 64
    );
}

window.addEventListener('scroll', onScroll, true);

// 移除缓存组件名称
const delKeepAliveCompName = () => {
  if (route.meta.keepAlive) {
    const name = router.currentRoute.value.matched.find((item) => item.name == route.name)
      ?.components?.default.name;
    if (name) {
      asyncRouteStore.keepAliveComponents = asyncRouteStore.keepAliveComponents.filter(
        (item) => item != name
      );
    }
  }
};

// 标签页列表
const tabsList: any = computed(() => tabsViewStore.tabsList);
const whiteList: string[] = [
  PageEnum.HOME_NAME,
  PageEnum.LOGIN_NAME,
];

watch(
  () => route.fullPath,
  (to) => {
    if (whiteList.includes(route.name as string)) return;
    activeKey.value = to;
    tabsViewStore.addTabs(getSimpleRoute(route));
    updateNavScroll(true);
  },
  { immediate: true }
);

// 在页面关闭或刷新之前，保存数据
window.addEventListener('beforeunload', () => {
  storage.set(TABS_ROUTES, JSON.stringify(tabsList.value));
});

// 关闭当前页面
const removeTab = (route:RouteItem) => {
  if (tabsList.value.length === 1) {
    return message.warning('这已经是最后一页，不能再关闭了！');
  }
  delKeepAliveCompName();
  tabsViewStore.closeCurrentTab(route);
  // 如果关闭的是当前页
  if (activeKey.value === route.fullPath) {
    const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)];
    activeKey.value = currentRoute.fullPath;
    router.push(currentRoute);
  }
  updateNavScroll();
};


// 注入刷新页面方法
// provide('reloadPage', reloadPage);

// 关闭左侧
const closeLeft = (route:RouteItem) => {
  tabsViewStore.closeLeftTabs(route);
  activeKey.value = route.fullPath;
  router.replace(route.fullPath);
  updateNavScroll();
};

// 关闭右侧
const closeRight = (route:RouteItem) => {
  tabsViewStore.closeRightTabs(route);
  activeKey.value = route.fullPath;
  router.replace(route.fullPath);
  updateNavScroll();
};

// 关闭其他
const closeOther = (route:RouteItem) => {
  tabsViewStore.closeOtherTabs(route);
  activeKey.value = route.fullPath;
  router.replace(route.fullPath);
  updateNavScroll();
};

// 关闭全部
const closeAll = () => {
  tabsViewStore.closeAllTabs();
  nextTick(()=>{
    router.replace(PageEnum.HOME_URL);
  })
  updateNavScroll();
};

//tab 操作
const closeHandleSelect = (key:string) => {
  switch (key) {
    // //刷新
    // case 'reload-current':
    //   reloadPage();
    //   break;
    //关闭
    case 'close-current':
      removeTab(route as RouteItem);
      break;
    //关闭其他
    case 'close-others':
      closeOther(route as RouteItem);
      break;
    //关闭所有
    case 'close-all':
      closeAll();
      break;
  }
  updateNavScroll();
  showDropdown.value = false;
};

/**
 * @param value 要滚动到的位置
 * @param amplitude 每次滚动的长度
 */
// @ts-ignore
function scrollTo(value: number, amplitude: number) {
  const currentScroll = navScroll.value.scrollLeft;
  const scrollWidth =
    (amplitude > 0 && currentScroll + amplitude >= value) ||
    (amplitude < 0 && currentScroll + amplitude <= value)
      ? value
      : currentScroll + amplitude;
  navScroll.value && navScroll.value.scrollTo(scrollWidth, 0);
  if (scrollWidth === value) return;
  return window.requestAnimationFrame(() => scrollTo(value, amplitude));
}

function scrollPrev() {
  const containerWidth = navScroll.value.offsetWidth;
  const currentScroll = navScroll.value.scrollLeft;

  if (!currentScroll) return;
  const scrollLeft = currentScroll > containerWidth ? currentScroll - containerWidth : 0;
  scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
}

function scrollNext() {
  const containerWidth = navScroll.value.offsetWidth;
  const navWidth = navScroll.value.scrollWidth;
  const currentScroll = navScroll.value.scrollLeft;

  if (navWidth - currentScroll <= containerWidth) return;
  const scrollLeft =
    navWidth - currentScroll > containerWidth * 2
      ? currentScroll + containerWidth
      : navWidth - containerWidth;
  scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
}

/**
 * @param autoScroll 是否开启自动滚动功能
 */
async function updateNavScroll(autoScroll?: boolean) {
  await nextTick();
  if (!navScroll.value) return;
  const containerWidth = navScroll.value.offsetWidth;
  const navWidth = navScroll.value.scrollWidth;

  if (containerWidth < navWidth) {
    scrollable.value = true;
    if (autoScroll) {
      let tagList = navScroll.value.querySelectorAll('.tabs-card-scroll-item') || [];
      [...tagList].forEach((tag: HTMLElement) => {
        // fix SyntaxError
        if (tag.id === `tag${activeKey.value.split('/').join('\/')}`) {
          tag.scrollIntoView && tag.scrollIntoView();
        }
      });
    }
  } else {
    scrollable.value = false;
  }
}

function handleResize() {
  updateNavScroll(true);
}

function handleContextMenu(e:any, item:RouteItem) {
  e.preventDefault();
  isCurrent.value = PageEnum.HOME_URL === item.path;
  showDropdown.value = false;
  nextTick().then(() => {
    showDropdown.value = true;
    dropdownX.value = e.clientX;
    dropdownY.value = e.clientY;
  });
}

function onClickOutside() {
  showDropdown.value = false;
}

//tags 跳转页面
function goPage(e:any) {
  const { fullPath } = e;
  if (fullPath === route.fullPath) return;
  activeKey.value = fullPath;
  go(e, true);
}

//删除tab
function closeTabItem(e:any) {
  const { fullPath } = e;
  const routeInfo = tabsList.value.find((item:RouteItem) => item.fullPath == fullPath);
  removeTab(routeInfo);
}

</script>

<style lang="less" scoped>
  .tabs-view {
    width: 100%;
    padding: 6px 0;
    display: flex;
    transition: all 0.2s ease-in-out;

    &-main {
      height: 32px;
      display: flex;
      max-width: 100%;
      min-width: 100%;

      .tabs-card {
        -webkit-box-flex: 1;
        flex-grow: 1;
        flex-shrink: 1;
        overflow: hidden;
        position: relative;

        .tabs-card-prev,
        .tabs-card-next {
          width: 32px;
          text-align: center;
          position: absolute;
          line-height: 32px;
          cursor: pointer;

          .n-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 32px;
            width: 32px;
          }
        }

        .tabs-card-prev {
          left: 0;
        }

        .tabs-card-next {
          right: 0;
        }

        .tabs-card-next-hide,
        .tabs-card-prev-hide {
          display: none;
        }

        &-scroll {
          white-space: nowrap;
          overflow: hidden;

          &-item {
            background: v-bind(getCardColor);
            color: v-bind(getBaseColor);
            height: 32px;
            padding: 6px 16px 4px;
            border-radius: 3px;
            margin-right: 6px;
            cursor: pointer;
            display: inline-block;
            position: relative;
            flex: 0 0 auto;

            span {
              float: left;
              vertical-align: middle;
            }

            &:hover {
              color: #515a6e;
            }

            .n-icon {
              height: 22px;
              width: 21px;
              margin-right: -6px;
              position: relative;
              vertical-align: middle;
              text-align: center;
              color: #808695;

              &:hover {
                color: #515a6e !important;
              }

              svg {
                height: 21px;
                display: inline-block;
              }
            }
          }

          .active-item {
            color: v-bind(getAppTheme);
          }
        }
      }

      .tabs-card-scrollable {
        padding: 0 32px;
        overflow: hidden;
      }
    }

    .tabs-close {
      min-width: 32px;
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: var(--color);
      border-radius: 2px;
      cursor: pointer;
      //margin-right: 10px;

      &-btn {
        color: var(--color);
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .tabs-view-default-background {
    background: #f5f7f9;
  }

  .tabs-view-dark-background {
    background: #101014;
  }

  .tabs-view-fix {
    position: fixed;
    z-index: 5;
    padding: 6px 19px 6px 10px;
    left: 200px;
  }

  .tabs-view-fixed-header {
    top: 0;
  }
</style>
