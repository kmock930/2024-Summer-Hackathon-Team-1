const express = require('express');
const apiRoutes = require('./routes/api');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json('Hello World');
});

app.get('/users', (req,res) => {
    res.status(200).json({user: 'abc'});
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/api', apiRoutes);
