export const existsInList = (input, list) => {
	if (list.filter(item => item.item === input.toLowerCase()).length > 0) {
		return true;
	} else {
		return false;
	}
};
