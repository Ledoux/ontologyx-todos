//
// IMPORTS
//
import fs from 'fs'
import path from 'path'
import { getMongoDatabase } from 'transactionx-express'

//
// ENVIRONMENT
//
const jsonDataPath = path.join(__dirname, '../../data/json_data')
const jsonFileNames = fs.readdirSync(jsonDataPath)
                          .filter(dir => dir.split('.').slice(-1)[0] === 'json')

//
// FUNCTION
//
function consoleDatabase () {
  return new Promise((resolve, reject) => {
    getMongoDatabase().then(db => {
      db.listCollections()
        .toArray()
        .then(items => {
          // init the collections and insert inside of them the mock data
          jsonFileNames.forEach(jsonFileName => {
            // get the collection name
            const collectionName = jsonFileName.split('.').slice(0, -1).join('.')
            // check data
            db.collection(collectionName)
              .find({})
              .toArray()
              .then(elements => {
                console.log('elements', elements)
                // resolve
                resolve(db)
              })
          })
        })
    })
  })
}

//
// CONSOLE
//
consoleDatabase()
  .then(db => db.close())
  .catch(err => console.log(err))
