import { Router } from 'express';
import { seasonDate } from '../modules/season.js';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const router = Router();


// Axios create
const instance = axios.create({
	baseURL: 'https://api.myanimelist.net/v2/',
	timeout: 1000,
	headers: { 'X-MAL-CLIENT-ID': process.env.CLIENT_ID },
});

// Actual season values
const season = seasonDate().season;
const year = seasonDate().year;

// Variables Axios
let allTvSeason;
const animeActualSeason = [];
const animeTvContinuing = [];

instance({
	method: 'get',
	url: `/anime/season/${year}/${season}`,
	params: {
		limit: 200,
		fields: 'alternative_titles, synopsis, genres, broadcast, media_type, status, num_list_users, start_season'
	},
}).then(resAxios => {


	for (const data of resAxios.data.data) {
		const anime = data.node;

		if (anime.broadcast !== undefined) {
			const exception = anime.title;
			const excpetions = [
				'One Piece',
				'Detective Conan',
			];
			if (anime.num_list_users > 6800 && (anime.start_season.year > 2010 || excpetions.includes(exception))) {
				const genre = 'kids';
				let genres;
				const media = 'tv';
				const mediaTypeArray = [
					'all', 'tv', 'ona', 'ova', 'movie', 'special', 'unknow',
				];

				anime.genres.forEach(dataGenres => {
					genres = dataGenres.name;
					return genres;
				});
				if (genres !== genre && mediaTypeArray.includes(media)) {
					// ONLY TV AIR ANIMES

					if (anime.start_season.year == year
						&& anime.start_season.season == season && anime.status == 'currently_airing') {
						animeActualSeason.push(anime);
					}
					// TV CONTINUING ON EMITION
					// 'year' or 'season' not to be equal to actual, but 'status' yes.
					if ((anime.start_season.year < year
						|| anime.start_season.season !== season)
						&& anime.status == 'currently_airing'
					) {
						animeTvContinuing.push(anime);
					}
					// TV AIR AND TV CONTINUING
					allTvSeason = animeActualSeason.concat(animeTvContinuing);
				}
			}
		}
	}
})
	.catch(error => {
		console.error(error);
	});
// Route Home
router.get('/', (req, res) => {

	res.render('index', {
		title: 'First Website with Node',
		year: seasonDate().year,
		season: seasonDate().season,
		days: seasonDate().days,
		animeSeason: animeActualSeason,
		animeTvContinuing: animeTvContinuing,
		allTvSeason: allTvSeason,
	});
});

// others
router.get('/about', (req, res) => res.render('about', { title: 'About' }));
router.get('/contact', (req, res) =>
	res.render('contact', { title: 'Contact Me' }),
);


export default router;
