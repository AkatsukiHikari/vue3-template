<!--
 * @Author: hikari
 * @Date: 2022-04-05 20:35:33
 * @LastEditTime: 2022-04-05 20:40:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /cloud-desktop-plus/src/components/message-api.vue
-->
<template>
    <div>
    </div>
</template>

<script>
import { defineComponent , getCurrentInstance } from 'vue'
import { useMessage } from 'naive-ui';
export default defineComponent({
    setup(){
        window.$message = useMessage();
    }
})
</script>

<style lang="scss" scoped>

</style>