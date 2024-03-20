const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

const originalAssets = path.join(__dirname, '../Assets')
const finalAssets = path.join(__dirname, 'public/Assets')

fs.symlink(originalAssets, finalAssets, "dir", () => null)

app.use(express.static(__dirname + '/public'))
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/Assets/', express.static(path.join(__dirname, '../Assets')))
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))

app.listen(3000, () => console.log('Visit http://127.0.0.1:3000'))
