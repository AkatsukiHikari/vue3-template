<!--
 * @Author: Hikari 66936871+Hikari@users.noreply.github.com
 * @Date: 2022-07-21 17:43:41
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @LastEditTime: 2022-08-06 18:06:09
 * @FilePath: /vue3-template/src/components/common/Menu/src/Menu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <NMenu
        :options="menus"
        :inverted="inverted"
        :mode="mode"
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="20"
        :value="getSelectedKeys"
        :indent="24"
        default-expand-all
        @update:value="clickMenuItem"
    />
</template>

<script lang="ts" setup>
import { NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { defineComponent, ref, onMounted, reactive, computed, watch, toRefs, unref, toRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { generatorMenu, generatorMenuMix } from '@/utils';
import { useAppStore } from '@/stores/app';
import { useAsyncRouteStore } from '@/stores/router'

interface MenuProps {
    mode?: 'vertical' | 'horizontal',
    // 侧边栏菜单是否收起
    collapsed: boolean,
    // 位置 
    location: string,
}

const props =  withDefaults(defineProps<MenuProps>(),{
    mode: 'vertical',
    collapsed: false,
    location: 'left'
})


const emit = defineEmits(['update:collapsed','clickMenuItem'])

const settingStore = useAppStore();
const inverted = computed(() => {
    return ['dark', 'header-dark'].includes(settingStore.navTheme);
});


const getSelectedKeys = computed(() => {
    let location = props.location;
    return location === 'left' || (location === 'header' && unref(navMode) === 'horizontal')
        ? unref(selectedKeys)
        : unref(headerMenuSelectKey);
});

const { getNavMode } = settingStore;

const navMode = getNavMode;


// 当前路由
const currentRoute = useRoute();
const router = useRouter();

// 获取当前打开的子菜单
const matched = currentRoute.matched;
const asyncRouteStore = useAsyncRouteStore();

const menus = ref<any []>([]);
const selectedKeys = ref<string>(currentRoute.name as string);
const headerMenuSelectKey = ref<string>('');



// 监听分割菜单
watch(
    () => settingStore.menuSetting.mixMenu,
    () => {
        updateMenu();
        if (props.collapsed) {
            emit('update:collapsed', !props.collapsed);
        }
    }
);

// 跟随页面路由变化，切换菜单选中状态
watch(
    () => currentRoute.fullPath,
    () => {
        updateMenu();
    }
);

function updateMenu() {
    if (!settingStore.menuSetting.mixMenu) {
        menus.value = generatorMenu(asyncRouteStore.getMenus);
    } else {
        //混合菜单
        const firstRouteName: string = (currentRoute.matched[0].name as string) || '';
        menus.value = generatorMenuMix(asyncRouteStore.getMenus, firstRouteName, props.location);
        const activeMenu: string = currentRoute?.matched[0].meta?.activeMenu as string;
        headerMenuSelectKey.value = (activeMenu ? activeMenu : firstRouteName) || '';
    }
    updateSelectedKeys();
}


function updateSelectedKeys() {
    const matched = currentRoute.matched;
    const activeMenu: string = (currentRoute.meta?.activeMenu as string) || '';
    selectedKeys.value = activeMenu ? (activeMenu as string) : (currentRoute.name as string);
}

// 点击菜单
function clickMenuItem(key: string) {
    if (/http(s)?:/.test(key)) {
        window.open(key);
    } else {
        router.push({ name: key });
    }
    emit('clickMenuItem' as any, key);
}



onMounted(() => {
    updateMenu();
});

</script>
