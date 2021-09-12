<template>
	<main>
		<segments-list @input="log">
			<Segment v-for="segment of segments" :segmentDescriptor="segment" :key="segment.key"></Segment>
		</segments-list>

		<button @click="createSegment">Create segment</button>
	</main>
</template>

<script>
import Segment from "./components/Segment.vue";
import TimerSegment from "./TimerSegment.js";

export default {
	name: "root",

	data: () => ({
		segments: [],
		segmentIdNext: 0,
	}),

	methods: {
		createSegment() {
			this.segments.push({key: this.segmentIdNext, segment: new TimerSegment()});
			this.segmentIdNext++;
		},
	},

	computed: {
		durationTotal() {
			return this.segments.reduce((cumsum, segment) => cumsum + segment.segment.duration, 0);
		},
	},

	components: {
		Segment,
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