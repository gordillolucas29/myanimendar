export function seasonDate() {
	// TAKE ACTUAL MONTH AND YEAR (NUMBER)
	const date = new Date();
	const month = date.getMonth();
	const actualYear = date.getFullYear();

	// DAYS
	const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

	// SEASONS OF JAPAN
	let actualSeason;
	const seasons = {
		winter: [0, 1, 2],
		spring: [3, 4, 5],
		summer: [6, 7, 8],
		fall: [9, 10, 11],
	};

	// Detect actual season
	for (const key in seasons) {
		seasons[key].forEach(element => {
			if (month == element) {
				actualSeason = key;
			}
		});
	}

	return {
		season: actualSeason,
		year: actualYear,
		days: days,
	};
}
