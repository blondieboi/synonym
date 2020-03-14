export const formatValidator = char => {
	var letters = /^[A-Za-z]+$/;
	if (char.match(letters) || char === "") return true;
};
