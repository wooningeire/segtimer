<template>
	<seg-display>
		<input type="text" v-model="segment.label" class="label-input" placeholder="Unnamed segment" />
		<input type="number" v-model="segment.duration" class="time-input" />
	</seg-display>
</template>

<script>
import {TimerSegment, Timer} from "../timing.js";

export default {
	name: "segmentdisplay",

	props: {
		segmentDescriptor: {
			key: Number,
			segment: TimerSegment,
		},

		timer: Timer,
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
seg-display {
	padding: 1em;
	display: grid;
	grid-template-rows: repeat(2, auto);

	background: #448;
	color: #fff;
}

seg-display + seg-display {
	border-top: 2px solid;
}

input {
	/* Unset native styles */
	width: 100%;
	background: none;
	border: none;
	color: inherit;
	font: inherit;
}

.label-input {
	font-size: 1.5em;
}

.time-input {
	font-size: 4em;
	font-weight: 700;
}
</style>