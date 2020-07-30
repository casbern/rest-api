const express = require('express')
const routes = express.Router()
const Courses = require('./courses')

routes.get('/', Courses.all)
routes.post('/', Courses.create)
routes.put('/', Courses.update)
routes.delete('/', Courses.delete)

module.exports = routes