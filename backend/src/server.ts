import app from './app';

const port = 3000

app.get('/', (_, res) => {
  res.status(200).send({ message: 'Ok'})
});

app.listen(port, () => console.log('Ouvindo porta', port));
