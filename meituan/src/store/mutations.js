const IG_BOL = "IG_BOL";
const CITY = "CITY";
const NUM = "NUM";

export default {
	[IG_BOL] (state,data) {
		state.igbol=data;
	},
	[CITY] (state,data) {
		state.city=data;
	},
	[NUM] (state,data) {
		console.log(data)
		state.num=data;
	}
}; 