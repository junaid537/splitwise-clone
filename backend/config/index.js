//const bucketName = 'junaid-project';
const Cloud = require('@google-cloud/storage')
const path = require('path')
const serviceKey = path.join(__dirname, './config/mykey.json')

const { Storage } = Cloud
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'bc-prod-303705',
})

module.exports = storage