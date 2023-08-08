import express from 'express';
import bodyParser from 'body-parser';
import homeRoutes from './routes/home';
import customerRoutes from './routes/customers';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/customers', customerRoutes);


app.listen(5400, () => {
    console.log('Server is running on port 5400.');
})