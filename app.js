const {Validator, ValidationError} = require("express-json-validator-middleware");
const express = require('express')
const app = express()
app.use(express.json());
const port = 3001
const { validate } = new Validator();

// estructuras

const pocket = {
  type: "object",
  required: ["nombre","permite_retiros"],
  properties: {
    nombre: {
      type: "string"
    },
    permite_retiros: {
      type: "boolean"
    },
    meta: {
      type: "integer"
    }
  }
}

// add money to balance

// get return the current balance

// get all expenses

// add an expense

// put an expense

// delete an expense

const pockets = [];

// get all pockets
app.get('/pockets', (req, res) => {
    res.send(pockets)
})

// add a pocket
app.post('/pockets', validate({body: pocket}), (req, res) => {
  console.log('agregando el bolsillo : ', req.body) 
  pockets.push(req.body)
  res.status(201).send(req.body)
})

// get a pocket
app.get('/pockets/:id', (req, res) => {
    const id = req.params.id
    res.status(200).send(pockets[id-1])
})

// put a pocket
app.put('/pockets/:id', (req, res) => {
  const id = req.params.id
  const {data} = req.body
  pockets[id-1] = {...pockets[id-1], ...data}
  res.status(200).send(pockets[id-1])
})

// delete a pockets
app.delete('/pockets/:id', (req, res) => {
  const id = req.params.id
  pockets.splice((parseInt(id)-1), 1)
  res.status(200).send({message: 'deleted'})
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

/**
 * Error handler middleware for validation errors.
 */
 app.use((error, request, response, next) => {
  // Check the error is a validation error
  if (error instanceof ValidationError) {
    // Handle the error
    response.status(400).send(error.validationErrors);
    next();
  } else {
    // Pass error on if not a validation error
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})