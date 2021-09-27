<template>
	<segment-display :style="{'--fade-position': fadePosition}">
		<input type="text" v-model="segment.label" class="label-input" placeholder="Unnamed segment" />
		<TimeEntry v-model="segment.duration"
				:artificialValue="artificialDisplayValue"
				:showArtificialValue="activeSegmentData.timerActive" />
		<input type="number" v-model="segment.duration" class="time-input" />

		<close-button
				v-if="!activeSegmentData.timerActive"
				@click="remove">×</close-button>
	</segment-display>
</template>

<script>
import {TimerSegment} from "../timing.js";
import TimeEntry from "./TimeEntry.vue";

export default {
	name: "segmentdisplay",

	emits: ["remove"],

	props: {
		segmentDescriptor: {
			key: Number,
			segment: TimerSegment,
		},

		activeSegmentData: {
			timerActive: Boolean,
			segmentIndexes: Map,
			segmentIndex: Number,
			timeElapsedInSegment: Number,
		},
	},

	data: () => ({
		label: "Timer segment",
	}),

	computed: {
		segment() {
			return this.segmentDescriptor.segment;
		},

		isActive() {
			return this.activeSegmentData.segmentIndexes
					? this.activeSegmentData.segmentIndex === this.activeSegmentData.segmentIndexes.get(this.segmentDescriptor.key)
					: false;
		},

		hasPassed() {
			return this.activeSegmentData.segmentIndexes
					? this.activeSegmentData.segmentIndex > this.activeSegmentData.segmentIndexes.get(this.segmentDescriptor.key)
					: false;
		},

		artificialDisplayValue() {
			if (this.isActive) {
				return this.segment.duration - this.activeSegmentData.timeElapsedInSegment;
			} else if (this.hasPassed) {
				return 0;
			} else {
				return this.segment.duration;
			}
		},

		fadePosition() {
			if (this.isActive) {
				return this.segmentProgress;
			} else if (this.hasPassed) {
				return 1;
			} else {
				return 0;
			}
		},

		segmentProgress() {
			return this.activeSegmentData.timeElapsedInSegment / this.segment.duration;
		},
	},

	methods: {
		log: console.log,

		remove() {
			this.$emit("remove", this.segment);
		},
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