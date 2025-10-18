<template>
	<view>
		<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<van-cell v-for="item in list" :key="item" :title="item" />
		</van-list>
	</view>
</template>

<script setup>
	import {ref} from 'vue';

	// 直接在 <script setup> 中定义变量和方法，自动暴露给模板
	const list = ref([]);
	const loading = ref(false);
	const finished = ref(false);

	const onLoad = () => {
		setTimeout(() => {
			for (let i = 0; i < 10; i++) {
				list.value.push(list.value.length + 1);
			}
			loading.value = false;
			if (list.value.length >= 40) {
				finished.value = true;
			}
		}, 1000);
	};
</script>

<style>
</style>