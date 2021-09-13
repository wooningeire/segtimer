<template>
	<main>
		<segments-list>
			<SegmentDisplay v-for="segment of segments" :segmentDescriptor="segment" :key="segment.key" />
		</segments-list>

		<div>
			<button @click="createSegment">Create segment</button>
			<button @click="startTimer">Start timer</button>
			<button @click="pauseTimer">Pause timer</button>
			
			<TimerDisplay :timer="timer" />
		</div>
	</main>
</template>

<script>
import SegmentDisplay from "./components/SegmentDisplay.vue";
import TimerDisplay from "./components/TimerDisplay.vue";
import {TimerSegment, Timer} from "./timing.js";

export default {
	name: "root",

	data: () => ({
		segments: [],
		segmentIdNext: 0,
		
		timer: new Timer(),
	}),

	methods: {
		createSegment() {
			this.segments.push({key: this.segmentIdNext, segment: new TimerSegment()});
			this.segmentIdNext++;
		},

		startTimer() {
			this.timer.duration = this.durationTotal;

			this.timer.start(console.log);
		},

		pauseTimer() {
			this.timer?.pause();
		},
	},

	computed: {
		durationTotal() {
			return this.segments.reduce((cumsum, segment) => cumsum + segment.segment.duration, 0);
		},
	},

	components: {
		SegmentDisplay,
		TimerDisplay,
	},
};
</script>

<style scoped>
main {
	display: grid;
	grid-template-columns: 1fr 16em;
}

segments-list {
	display: flex;
	flex-flow: column;
}
</style>