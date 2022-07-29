import express from 'express';
import morgan from 'morgan';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import indexRoutes from './routes/index.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

// Settings
app.set('port', '3000');
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// Global Variables

// Imports
app.use(indexRoutes);

// Static
app.use(express.static(join(__dirname, 'public')));

// 404
app.use(function (req, res) {
	res.status(404).render('404', { urlId: req.url });
});

app.listen(app.get(process.env.PORT || 'port'), () => {
	console.log('server on port', app.get(process.env.PORT || 'port'));
});
