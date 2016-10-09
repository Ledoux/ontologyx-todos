import express from 'express'
import { createTransactionxRouter } from 'transactionx-express'

var app = express()

app.use('/', createTransactionxRouter({connections: [{database: 'ontologyx'}]}))

app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
})
