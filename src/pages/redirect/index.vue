<!--
 * @Author: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Date: 2022-08-06 17:26:44
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @LastEditTime: 2022-08-06 17:52:31
 * @FilePath: /vue3-template/src/pages/redirect/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
    import { defineComponent, onBeforeMount } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { NEmpty } from 'naive-ui';

    const route = useRoute();
    const router = useRouter();
    onBeforeMount(() => {
        const { params, query } = route;
        const { path } = params;
        router.replace({
            path: '/' + (Array.isArray(path) ? path.join('/') : path),
            query,
        });
    });
</script>


<route lang="yaml">
meta:
  hidden: true
</route>