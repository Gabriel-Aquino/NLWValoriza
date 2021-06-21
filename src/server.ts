import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.send('GET Olá NLW');
});

app.post('/', (request, response) => {
  return response.send('POST Olá NLW');
})

app.listen(3000, () => {
  console.log('Server is running');
});