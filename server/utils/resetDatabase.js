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
function resetDatabase () {
  return new Promise((resolve, reject) => {
    getMongoDatabase({database: 'ontologyx'}).then(db => {
      db.listCollections()
        .toArray()
        .then(items => {
          const collectionNames = items.map(item => item.name)
          Promise.all(jsonFileNames.map(jsonFileName => {
            return new Promise((collectionResolve, collectionReset) => {
              // get the collection name
              const collectionName = jsonFileName.split('.').slice(0, -1).join('.')
              // get the data
              const mockDataPath = path.join(jsonDataPath, jsonFileName)
              const mockData = JSON.parse(fs.readFileSync(mockDataPath, 'utf-8'))
              // get the collection check maybe that the table is already there, so we have to drop it
              const collection = db.collection(collectionName)
              if (collectionNames.indexOf(collectionName) > -1) {
                collection.drop()
                          .then(r => {
                            collection.insertMany(mockData)
                                      .then(r => collectionResolve(r))
                          })
              } else {
                collection.insertMany(mockData)
                          .then(r => collectionResolve(r))
              }
            })
          }))
        })
        .then(rs => resolve(db))
    })
  })
}

//
// RESET
//
resetDatabase()
  // we jsut need here to be sure that the insert are done
  // even if we resolved...
  .then(db => setTimeout(() => db.close(), 1000))
  .catch(err => console.log(err))
