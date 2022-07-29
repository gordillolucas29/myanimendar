export function filter(functionName) {
	// Variables
	const allData = functionName.data.data;
	// ALL DATA
	for (const data of allData) {
		const anime = data.node;
		// IF ANIME BROADCAST IS NOT DEFINED DONT WORK FOR CALENDAR
		if (anime.broadcast !== undefined) {
			// if has broadcast go next

		}
	}
}

// --------------
export function seasonDate() {
	// TAKE ACTUAL MONTH AND YEAR (NUMBER)
	const date = new Date();
	const month = date.getMonth();
	const year = date.getFullYear();

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
		year: year,
	};
}

export function onlyEmition(anime) {
	const season = seasonDate().season;
	const year = seasonDate().year;
	// ONLY TV AIR ANIMES
	const animeActualSeason = [];

	if (anime.start_season.year == year
		&& anime.start_season.season == season) {

		animeActualSeason.push(anime);
	}
	return animeActualSeason;
}

export function tvContinung(anime) {
	const season = seasonDate().season;
	const year = seasonDate().year;

	// TV CONTINUING ON EMITION
	const animeTvContinuing = [];
	// 'year' or 'season' not to be equal to actual, but 'status' yes.
	if ((anime.start_season.year < year
		|| anime.start_season.season !== season)
		&& anime.status == 'currently_airing'
	) {
		animeTvContinuing.push(anime);
	}

	return animeTvContinuing;
}


// --------------
export function unpopular(anime) {
	// IF THE ANIME IS NOT POPULAR OR OLDER THAN LAST YEARS
	if (anime.num_list_users > 6800 || anime.start_season.year > 2010) {
		// do something
	}

}

// --------------
export function excpetionsFilter(anime) {
	const exception = anime.title;
	const excpetions = [
		'One Piece',
		'Detective Conan',
	];

	for (const key of excpetions) {
		if (exception == key) {
			// do something
			return;
		}
	}
}

// -----------
export function mediaFilter(media) {
	// FILTER MEDIA TYPE FOR ANIME
	const mediaTypeArray = [
		'all', 'tv', 'ona', 'ova', 'movie', 'special', 'unknow',
	];

	for (const key of mediaTypeArray) {
		if (media == key) {
			// do something
			return;
		}
	}
	// use: anime.media_type
}


// --------------
export function genreFilter(anime, genre) {
	// GENRES OF EACH ANIME
	let genres;
	// need into 'for' of all data
	anime.genres.forEach(dataGenres => {
		genres = dataGenres.name;
		return genres;
	});
	if (genres !== genre) {
		// do something
	}
}
