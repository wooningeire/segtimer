<template>
	<segment->
		<input type="text" v-model="segment.label" />
		<input type="number" v-model="segment.duration" />
	</segment->
</template>

<script>
import TimerSegment from "../TimerSegment.js";

export default {
	name: "segment",

	props: {
		segmentDescriptor: {
			key: Number,
			segment: TimerSegment,
		},
	},

	data: () => ({
		label: "Timer segment",
	}),

	computed: {
		segment() {
			return this.segmentDescriptor.segment;
		},
	},
};
</script>

<style scoped>
</style>