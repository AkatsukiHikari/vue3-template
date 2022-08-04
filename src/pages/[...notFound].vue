<!--
 * @Author: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Date: 2022-08-01 14:15:56
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @LastEditTime: 2022-08-01 14:24:50
 * @FilePath: /vue3-template/src/pages/[...notFound].vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="flex flex-wrap h-screen text-center justify-around items-center">
		<div class="font-blod desc">
			<div class="text-7xl code">404</div>
			<div ref="content" class="text-3xl content">The Page</div>
			<button
				active="scale-90 transform"
				class="rounded-lg transition btn"
				@click="back"
			>
				Go Home
			</button>
		</div>

        <SvgSprite class="cover" symbol="404"></SvgSprite>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const content = ref<null | Element>(null)

const router = useRouter()

const back = () => router.push('/')
</script>

<style>
.code {
	margin-bottom: 20px;
}

.content {
	height: 40px;
}

.cover {
	height: auto;
	width: 700px;
	margin: 0 5px;
	max-width: 100%;
	max-height: 100%;
}

.desc {
	flex: 1;
	width: 300px;
}

.btn {
	font-size: 20px;
	margin-top: 30px;
	padding: 12px 20px;
	--tw-shadow-color: 8, 145, 178;
	--tw-shadow: 0 4px 6px -1px rgba(var(--tw-shadow-color), 0.1),
		0 2px 4px -1px rgba(var(--tw-shadow-color), 0.06);
	box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000, var(--tw-shadow);
}
</style>

<route lang="yaml">
meta:
  layout: notFound
</route>