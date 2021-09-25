<template>
	<segment-display :style="{'--fade-position': timer.active && currentSegment === segment ? segmentProgress : 0}">
		<input type="text" v-model="segment.label" class="label-input" placeholder="Unnamed segment" />
		<TimeEntry v-model="segment.duration" />
		<input type="number" v-model="segment.duration" class="time-input" />

		<close-button>×</close-button>
	</segment-display>
</template>

<script>
import {TimerSegment, Timer} from "../timing.js";
import TimeEntry from "./TimeEntry.vue";

export default {
	name: "segmentdisplay",

	emits: ["remove"],

	props: {
		segmentDescriptor: {
			key: Number,
			segment: TimerSegment,
		},

		timer: Timer,

		currentSegment: TimerSegment,
		segmentProgress: Number,
	},

	data: () => ({
		label: "Timer segment",
	}),

	computed: {
		segment() {
			return this.segmentDescriptor.segment;
		},
	},

	methods: {
		log: console.log,
	},

	components: {
		TimeEntry,
	},
};
</script>

<style scoped>
segment-display {
	padding: 1em;
	display: grid;
	grid-template-rows: repeat(3, auto);
	grid-template-columns: 1fr auto;

	background: linear-gradient(#77b var(--fade-pct), #448 var(--fade-pct));
	color: #fff;

	--fade-position: 0;

	--fade-pct: calc(var(--fade-position) * 100%);
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

close-button {
	display: flex;

	user-select: none;
}

segment-display > close-button {
	grid-area: 1 / 2;
	width: 100%;

	font-size: 3em;
	line-height: 0.5;
}

segment-display > :is(time-entry, .time-input) {
	grid-column: span 2;
}

.label-input {
	font-size: 1.5em;
}

time-entry {
	font-size: 4em;
	font-weight: 700;
}
</style>