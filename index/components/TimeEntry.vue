<template>
	<time-entry	@input="onInput">
		<numeral- class="min"
				:contentEditable="!showArtificialValue">00</numeral->
		<numeral- class="s"
				:contentEditable="!showArtificialValue">00</numeral->
		<numeral- class="ms"
				:contentEditable="!showArtificialValue">00</numeral->
	</time-entry>
</template>

<script>
export default {
	name: "timeentry",

	props: {
		modelValue: {
			type: Number,
			default: 0,
		},

		artificialValue: {
			type: Number,
			defualt: 0,
		},

		showArtificialValue: {
			type: Boolean,
			defualt: false,
		},
	},

	watch: {
		modelValue() {
			if (this.showArtificialValue) return;
			this.updateDisplay(this.modelValue);
		},

		artificialValue() {
			if (!this.showArtificialValue) return;
			this.updateDisplay(this.artificialValue);
		},

		showArtificialValue() {
			if (this.showArtificialValue) {
				this.updateDisplay(this.artificialValue);
			} else {
				this.updateDisplay(this.modelValue);
			}
		},
	},

	methods: {
		updateDisplay(value=this.modelValue) {
			const nMinutes = Math.floor(value / 1000 / 60);
			const nSeconds = Math.floor(value / 1000 % 60);
			const nMilliseconds = Math.floor(value % 1000);

			this.$el.querySelector(".min").textContent = nMinutes.toString().padStart(2, "0");
			this.$el.querySelector(".s").textContent = nSeconds.toString().padStart(2, "0");
			this.$el.querySelector(".ms").textContent = nMilliseconds.toString().padStart(3, "0");
		},

		convertOut() {
			return Number(this.$el.querySelector(".min").textContent) * 1000 * 60
					+ Number(this.$el.querySelector(".s").textContent) * 1000
					+ Number(this.$el.querySelector(".ms").textContent);
		},

		onInput() {
			console.log("eh");
			this.$emit("update:modelValue", this.convertOut());
		},

/* 		onFocus() {
			const secondsNumeral = this.$el.querySelector(".s");
			const minutesNumeral = this.$el.querySelector(".min");

			const selection = getSelection();
			selection.removeAllRanges();
			selection.collapse(secondsNumeral, 1);

			const onInput = event => {
				const secondsExcess = secondsNumeral.textContent.slice(-Infinity, -3);
				const seconds = secondsNumeral.textContent.slice(-3, -1);

				minutesNumeral.textContent += secondsExcess;
				secondsNumeral.textContent = seconds;
			};

			this.$el.addEventListener("input", onInput);
		}, */
	},

	mounted() {
		this.updateDisplay();
	},
};
</script>

<style scoped>
.ms {
	font-size: .5em;
}

.s::before {
	content: ":";
	opacity: .5;
}

.ms::before {
	content: ".";
	opacity: .5;
}
</style>