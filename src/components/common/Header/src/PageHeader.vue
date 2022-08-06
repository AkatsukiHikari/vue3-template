<!--
 * @Author: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Date: 2022-07-31 09:22:36
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @LastEditTime: 2022-08-06 18:08:55
 * @FilePath: /vue3-template/src/components/common/Header/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
   <div class="layout-header">
    <!--顶部菜单-->
    <div
      class="layout-header-left"
      v-if="navMode === 'horizontal' || (navMode === 'horizontal-mix' && mixMenu)"
    >
      <div class="logo" v-if="navMode === 'horizontal'">
        <img :src="webSiteConfig.logo" alt="" />
        <h2 v-show="!collapsed" class="title">{{ webSiteConfig.title }}</h2>
      </div>
      <AsideMenu
        v-model:collapsed="collapsed"
        v-model:location="getMenuLocation"
        :inverted="getInverted"
        mode="horizontal"
      />
    </div>
    <!--左侧菜单-->
    <div class="layout-header-left" v-else>
      <!-- 菜单收起 -->
      <div
        class="ml-1 layout-header-trigger layout-header-trigger-min"
        @click="() => $emit('update:collapsed', !collapsed)"
      >
        <n-icon size="18" v-if="collapsed">
          <MenuUnfoldOutlined />
        </n-icon>
        <n-icon size="18" v-else>
          <MenuFoldOutlined />
        </n-icon>
      </div>
      <!-- 刷新 -->
      <div
        class="mr-1 layout-header-trigger layout-header-trigger-min"
        v-if="headerSetting.isReload"
        @click="reloadPage"
      >
        <n-icon size="18">
          <ReloadOutlined />
        </n-icon>
      </div>
      <!-- 面包屑 -->
      <n-breadcrumb v-if="crumbsSetting.show">
        <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
          <n-breadcrumb-item>
            <n-dropdown
              v-if="routeItem.children.length"
              :options="routeItem.children"
              @select="dropdownSelect"
            >
              <span class="link-text">
                <component
                  v-if="crumbsSetting.showIcon && routeItem.meta.icon"
                  :is="routeItem.meta.icon"
                />
                {{ routeItem.meta.title }}
              </span>
            </n-dropdown>
            <span class="link-text" v-else>
              <component
                v-if="crumbsSetting.showIcon && routeItem.meta.icon"
                :is="routeItem.meta.icon"
              />
              {{ routeItem.meta.title }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>
    <div class="layout-header-right">
      <div
        class="layout-header-trigger layout-header-trigger-min"
        v-for="(item, index) in iconList"
        :key="index"
      >
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <component :is="item.iconName" v-on="item.event || {}" />
            </n-icon>
          </template>
          <span>{{ item.tips }}</span>
        </n-tooltip>
      </div>
      <!--切换全屏-->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <component :is="fullscreenIcon" @click="toggleFullScreen" />
            </n-icon>
          </template>
          <span>全屏</span>
        </n-tooltip>
      </div>
      <!-- 个人中心 -->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-dropdown trigger="hover" @select="avatarSelect" :options="avatarOptions">
          <div class="avatar">
            <n-avatar round >
              {{ userName }}
              <n-icon :size="42">
                <UserOutlined />
              </n-icon>
            </n-avatar>
          </div>
        </n-dropdown>
      </div>
      <!--设置-->
      <div class="layout-header-trigger layout-header-trigger-min" @click="openSetting">
        <n-tooltip placement="bottom-end">
          <template #trigger>
            <n-icon size="18" style="font-weight: bold">
              <SettingOutlined />
            </n-icon>
          </template>
          <span>项目配置</span>
        </n-tooltip>
      </div>
    </div>
  </div>
  <SettingDrawer ref="drawerSetting" />
</template>

<script setup lang="ts">
import {  reactive, toRefs, ref, computed, unref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { NDialogProvider, useDialog, useMessage } from 'naive-ui';
import {
    NIcon,
    NAvatar,
    NDropdown,
    NBreadcrumb,
    NBreadcrumbItem,
    NLayoutHeader,
    NTooltip,
} from 'naive-ui'
import {
    SettingOutlined,
    UserOutlined,
    ReloadOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@vicons/antd';
import { TABS_ROUTES } from '@/types/mutation-types';
import { AsideMenu } from '@/components/common/Menu';
import { useProjectSetting } from '@/hooks/setting/useAppSetting';
import { webSiteConfig } from '@/config/website.config';
import { useUserStore } from '@/stores/user'
import { AvatarOption , IconOption} from './types'
import { SettingDrawer } from '@/components/common/SettingDrawer'

interface IHeaderPorps{
    collapsed: boolean,
    inverted: boolean,
}

const props = withDefaults( defineProps<IHeaderPorps>(), {
    collapsed: false,
    inverted: false,
})

const message = useMessage();
const dialog = useDialog();
const { getNavMode, getNavTheme, getHeaderSetting, getMenuSetting, getCrumbsSetting } =
useProjectSetting();

// 个人信息
const userStore = useUserStore();
const { userName } = userStore?.getUserInfo || {};

const avatarOptions: AvatarOption[] = [
    {
        label: "个人设置",
        key: "profile",
    },{
        label: "退出登录",
        key: "logout",
    }
];

const iconList: IconOption[] = [
    {
        iconName: 'SearchOutlined',
        tips: '搜索'
    },
    {
        iconName: 'GithubOutlined',
        tips: 'github',
        event: {
            click: () => window.open('https://github.com/jekip/naive-ui-admin'),
        },
    },
];

// 主题样式
const getInverted = computed(() => {
    const navTheme = unref(getNavTheme);
    return ['light', 'header-dark'].includes(navTheme) ? props.inverted : !props.inverted;
});

const mixMenu = computed(() => {
    return unref(getMenuSetting).mixMenu;
});

const getChangeStyle = computed(() => {
    const { collapsed } = props;
    const { minMenuWidth, menuWidth }: any = unref(getMenuSetting);
    return {
        left: collapsed ? `${minMenuWidth}px` : `${menuWidth}px`,
        width: `calc(100% - ${collapsed ? `${minMenuWidth}px` : `${menuWidth}px`})`,
    };
});

const getMenuLocation = computed(() => {
    return 'header';
});


// refs
// 全屏图标
const fullscreenIcon = ref<string>("FullscreenOutlined");
const navMode = ref< any >(getNavMode);
const navTheme = ref<any> (getNavTheme);
// 关部设置
const headerSetting = ref<any>(getHeaderSetting);
// 面包屑设置
const crumbsSetting = ref< any>(getCrumbsSetting);
// 抽屉窗设置
const drawerSetting = ref();

const router = useRouter();
const route = useRoute();


const generator: any = (routerMap: any[]) => {
    return routerMap.map((item) => {
        const currentMenu = {
        ...item,
        label: item.meta.title,
        key: item.name,
        disabled: item.path === '/',
        };
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
            // Recursion
            currentMenu.children = generator(item.children, currentMenu);
        }
        return currentMenu;
    });
};
const breadcrumbList = computed(() => {
    return generator(route.matched);
});

// 退出登录
const doLogout = () => {
    dialog.info({
        title: '提示',
        content: '您确定要退出登录吗',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
        userStore.logout().then(() => {
            message.success('成功退出登录');
            // 移除标签页
            localStorage.removeItem(TABS_ROUTES);
            router
            .replace({
                name: 'login',
                query: {
                    redirect: route.fullPath,
                },
            })
            .finally(() => location.reload());
        });
        },
        onNegativeClick: () => {},
    });
};


 // 全屏切换
const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
        document.exitFullscreen();
        }
    }
};

// 刷新页面
const reloadPage = () => {
    router.push({
        path: '/redirect' + unref(route).fullPath,
    });
};

//头像下拉菜单
const avatarSelect = (key:string) => {
    switch (key) {
        case "profile":
            router.push({ name: 'profile' });
        break;
        case "logout":
            doLogout();
        break;
    }
};


const dropdownSelect = (key:string) => {
    router.push({ name: key });
};



const openSetting = () => {
    const { openDrawer } = drawerSetting.value;
    openDrawer();
}
</script>

<style lang="less" scoped>
.layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    height: @header-height;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    transition: all 0.2s ease-in-out;
    width: 100%;
    z-index: 11;

    &-left {
      display: flex;
      align-items: center;

      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 64px;
        line-height: 64px;
        overflow: hidden;
        white-space: nowrap;
        padding-left: 10px;

        img {
          width: auto;
          height: 32px;
          margin-right: 10px;
        }

        .title {
          margin-bottom: 0;
        }
      }

      ::v-deep(.ant-breadcrumb span:last-child .link-text) {
        color: #515a6e;
      }

      .n-breadcrumb {
        display: inline-block;
      }

      &-menu {
        color: var(--text-color);
      }
    }

    &-right {
      display: flex;
      align-items: center;
      margin-right: 20px;

      .avatar {
        display: flex;
        align-items: center;
        height: 64px;
      }

      > * {
        cursor: pointer;
      }
    }

    &-trigger {
      display: inline-block;
      width: 64px;
      height: 64px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      .n-icon {
        display: flex;
        align-items: center;
        height: 64px;
        line-height: 64px;
      }

      &:hover {
        background: hsla(0, 0%, 100%, 0.08);
      }

      .anticon {
        font-size: 16px;
        color: #515a6e;
      }
    }

    &-trigger-min {
      width: auto;
      padding: 0 12px;
    }
  }

  .layout-header-light {
    background: #fff;
    color: #515a6e;

    .n-icon {
      color: #515a6e;
    }

    .layout-header-left {
      ::v-deep(.n-breadcrumb .n-breadcrumb-item:last-child .n-breadcrumb-item__link) {
        color: #515a6e;
      }
    }

    .layout-header-trigger {
      &:hover {
        background: #f8f8f9;
      }
    }
  }

  .layout-header-fix {
    position: fixed;
    top: 0;
    right: 0;
    left: 200px;
    z-index: 11;
  }
</style>