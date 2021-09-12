<template>
	<main>
		<segments-list>
			<Segment v-for="segment of segments" :key="segment.key"></Segment>
		</segments-list>

		<button @click="createSegment">Create segment</button>
	</main>
</template>

<script>
import Segment from "./components/Segment.vue";

export default {
	name: "root",

	data: () => ({
		durationTotal: 0,
		segments: [],
		segmentIdNext: 0,
	}),

	methods: {
		createSegment() {
			this.segments.push({key: this.segmentIdNext});
			this.segmentIdNext++;
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