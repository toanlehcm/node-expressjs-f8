const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create);
// router.get('/create', function (req, res, next) {
//     console.log('middleware 1');
//     if (req.query.ve === 'vethuong') {
//         next();
//     } else {
//         res.status(403).json({
//             message: 'Forbidden'
//         });
//     }
// }, courseController.create);
router.post('/store', courseController.store);
router.get('/:slug', courseController.show);
router.get('/:id/edit', courseController.edit);
router.post('/handle-form-action', courseController.handleFormAction);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.destroy);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id/force', courseController.forceDestroy);

module.exports = router;
