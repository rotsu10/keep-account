<template>
	<view>
		<van-calendar  
			title="日期" 
			:poppable="false" 
			:min-date="minDate" 
			:max-date="maxDate" 
			:style="{ height: '528px' }" 
			:default-date ="defaultDate" 
			:show-title="false"
			:show-confirm="false"
		/>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const date = ref('');
	const show = ref(false);

	const defaultDate = new Date(2025, 10, 26);  
	const minDate = new Date(2025, 10, 1); 
	const maxDate = new Date(2025, 10, 30);
	const formatDate = (date) => `${date.getMonth()}/${date.getDate()}`;

</script>

<style>

</style>