<template>
	<div>
		<input type="text" v-model="segment.label" />
		<input type="number" v-model="segment.duration" />
	</div>
</template>

<script>
import {TimerSegment} from "../timing.js";

export default {
	name: "segmentdisplay",

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