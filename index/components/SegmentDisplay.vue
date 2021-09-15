<template>
	<segment-display>
		<input type="text" v-model="segment.label" class="label-input" placeholder="Unnamed segment" />
		<input type="number" v-model="segment.duration" class="time-input" />
		<TimeEditor />
	</segment-display>
</template>

<script>
import {TimerSegment, Timer} from "../timing.js";
import TimeEditor from "./TimeEditor.vue";

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

	components: {
		TimeEditor,
	},
};
</script>

<style scoped>
segment-display {
	padding: 1em;
	display: grid;
	grid-template-rows: repeat(2, auto);

	background: #448;
	color: #fff;
}

segment-display + segment-display {
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