export function filterObject(obj: any) {
	const filteredObj: any = {};

	for (const [key, value] of Object.entries(obj)) {
		if (typeof value === 'object') {
			filteredObj[key] = filterObject(value);
		} else {
			if (value !== false) {
				filteredObj[key] = value;
			}
		}
	}

	return filteredObj;
}
