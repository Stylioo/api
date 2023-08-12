import express from 'express';
import bodyParser from 'body-parser';
import homeRoutes from './routes/home';
import customerRoutes from './routes/customers';

const app = express();

app.use(express.static('./build'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
    res.status(200).send('I am alive and healthy');
})

app.use('/', homeRoutes);
app.use('/customers', customerRoutes);


app.listen(5400, () => {
    console.log('Server is running on port 5400.');
})