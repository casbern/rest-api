const express = require('express')
const routes = express.Router()
const Courses = require('./courses')

routes.get('/', Courses.all)
routes.post('/courses/create', Courses.create)
routes.put('/courses/:id', Courses.update)
routes.delete('/courses/:id', Courses.delete)

module.exports = routes