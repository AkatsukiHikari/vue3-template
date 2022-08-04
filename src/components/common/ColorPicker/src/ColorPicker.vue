<!--
 * @Author: hikari
 * @Date: 2022-04-09 17:42:38
 * @LastEditTime: 2022-04-14 17:58:37
 * @LastEditors: Please set LastEditors
 * @Description: 颜色选择器
 * @FilePath: /cloud-desktop-plus/src/components/common/ColorPicker/src/ColorPicker.vue
-->
<template>
    <n-popover
    :placement="placement"
    :trigger="trigger"
    >
        <div>
            <ColorPicker
            theme="light"
            :color="color"
            :sucker-hide="false"
            :sucker-canvas="null"
            :sucker-area="[]"
            @changeColor="changeColor"
         />
        </div>
         
        <template #trigger>
            <slot name="trigger"></slot>
        </template>
    </n-popover>
</template>

<script setup lang="ts">
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'
import { NPopover , NColorPicker} from 'naive-ui'
import { ref , defineEmits , defineProps , computed } from 'vue'

interface ColorProps {
    placement?: 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-start' | 'bottom' | 'bottom-end' | 'left-start' | 'left' | 'left-end',
    trigger?: 'hover' | 'click' | 'focus' | 'manual',
    color?: string,
}

const props =  withDefaults(defineProps<ColorProps>(),{
    placement: 'right-end',
    trigger: 'click',
    color: '#000000'
})

const emit = defineEmits(['changeColor'])

const changeColor = ( color: any ) => {
    const { r, g, b, a } = color.rgba;
    emit("changeColor", `rgba(${r}, ${g}, ${b}, ${a})`);
}

</script>

<style lang="scss" scoped>
.color {
    
}
</style>