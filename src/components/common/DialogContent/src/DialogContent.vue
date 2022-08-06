<!--
 * @Author: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Date: 2022-08-06 13:12:19
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @LastEditTime: 2022-08-06 14:26:54
 * @FilePath: /vue3-template/src/components/common/DialogContent/src/DialogContent.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template></template>
<script lang="ts">
  import { useDialog } from 'naive-ui';

  export default {
    name: 'DialogContent',
    setup() {
      //挂载在 window 方便与在js中使用
      window['$dialog'] = useDialog();
    },
  };
</script>
