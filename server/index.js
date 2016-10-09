import express from 'express'
import cors from 'cors'
import { createTransactionxRouter } from 'transactionx-express'

var app = express()

app.use(cors())

app.use('/', createTransactionxRouter({connections: [{database: 'ontologyx'}]}))

app.listen(5000, () => {
  console.log('Example app listening on port 5000!')
})
