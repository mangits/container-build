const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
// const bodyParser = require('bodyParser')
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(cors())
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/roster', async (req, res) => {
  let roster = await knex('roster')
  res.json({roster})
});

app.post('/roster', async (req, res) => {
  const postData = req.body;
  console.log('Post Data', postData)
  try {
    const newPerson = await knex('roster').insert(postData)
    } catch (err) {
    res.status(500).json({message: "Error creating name.", error: err})
    }
    res.end()
});


app.delete('/roster', async (req, res) => {
  const postData = req.body;
  console.log('Post Data', postData)
  try {
    const deletePerson = await knex('roster').where('first', req.body.first).delete()
    } catch (err) {
    res.status(500).json({message: "Error deleting name.", error: err})
    }
    res.end()

});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})