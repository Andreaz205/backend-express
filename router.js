const Router = require ( "express").Router;
const PostController = require ( "./controllers/PostController.js");
const HelpController = require ( "./controllers/HelpController.js");

const UserController = require ( "./controllers/UserController.js");
const authMiddleware = require ( "./middlewares/auth-middleware.js");
const router = new Router()

router.post('/posts', PostController.create)
router.get('/posts', PostController.getAll)
router.get('/posts/:id', PostController.getOne)
router.put('/posts', PostController.update)
router.delete('/posts/:id', PostController.delete)
router.delete('/posts', PostController.deleteAll)

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
// router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/users', authMiddleware, UserController.getUsers)
router.delete('/users/:email', UserController.deleteUser)


// здесь я пытался сделать отдельный контроллер  чтобы отправлять через node
// письма на почту но у меня ни**я не получавлось ошибка ssl
router.post('/send', HelpController.send)


module.exports = router;