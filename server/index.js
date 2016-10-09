import express from 'express'
import cors from 'cors'
import { getAppWithTransactionxRouter } from 'transactionx-express'

// init
let app = express()

// the data server is on a different localhost domain, so we need to use cors
app.use(cors())

// the transactionxRouter needs the boy-parser middlewares to work
// so that's why we need to use this function that does the job for us
app = getAppWithTransactionxRouter(app, {connections: [{database: 'ontologyx'}]})

// listen
app.listen(5000, () => {
  console.log('Example app listening on port 5000!')
})
