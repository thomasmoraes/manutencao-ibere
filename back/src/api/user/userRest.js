const express = require('express');
const router = express.Router();
const userService = require('../../business/user/userService');


/**
 * @swagger
 *
 * /api/v1/user:
 *   post:
 *    tags: [user]
 *    description: Add user and send email
 *    requestBody:
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/definitions/User'
 *    responses:
 *     201:
 *       description: Created
 *       content:
 *        application/json:
 *          schema:
 *           $ref: '#/definitions/User'
 *
 */
router.post('/', async function (req, res) {
  userService.salvarUsuario(req.body)
    .then(user => {
      res.status(201);
      res.json(user);
    }).catch(err => {
      const status = err.statusCode || 500;
      res.status(status);
      res.json(err);
    });
});

module.exports = router;