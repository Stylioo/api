import express from 'express';
import bodyParser from 'body-parser';
import homeRoutes from './routes/home';
import usersRoutes from './routes/users';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/users', usersRoutes);


app.listen(5400, () => {
    console.log('Server is running on port 5400.');
})