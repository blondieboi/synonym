export const existsInList = (input, list) => {
	if (list.filter(item => item.value === input.toLowerCase()).length > 0) {
		return true;
	} else {
		return false;
	}
};
