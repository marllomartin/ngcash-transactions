require('dotenv').config();
import app from './app';

const port = process.env.PORT;

app.get('/', (_, res) => {
  res.status(200).send({ message: 'Ok'})
});

app.listen(port, () => console.log('Ouvindo porta', port));
