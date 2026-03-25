<template>
	<div>
		<van-dropdown-menu>
			<van-dropdown-item v-model="value1" :options="option1" />
			<van-dropdown-item v-model="value2" :options="option2" />
		</van-dropdown-menu>
	</div>
</template>
<script setup>
	import {
		onMounted,
		ref,
		watch
	} from 'vue';
	import {
		getAllLedgerUser
	} from '../../api/ledger';
	const value1 = ref(0);
	const value2 = ref(0);
	const option1 = ref([]);
	const option2 = ref([{
			text: '全部类型',
			value: 0
		},
		{
			text: '收入',
			value: 1
		},
		{
			text: '支出',
			value: 3
		},
	])

	//查询账本拥有者
	const getAllUser = async () => {
		try {
			const userList = await getAllLedgerUser();
			const userOptions = userList.map(user => ({
				text: user.username,
				value: user.id
			}));
			option1.value = [{
					text: '全部人',
					value: 0
				},
				...userOptions
			];
		} catch (error) {
			console.error("error", error)
		}

	}


	onMounted(() => {
		getAllUser();
	})
	watch([value1, value2], 
		([new1, new2]) => {
			console.log('value1 变了：', new1)
			console.log('value2 变了：', new2)
		}, 
		{immediate:true}
	)
</script>
<style scoped>

</style>