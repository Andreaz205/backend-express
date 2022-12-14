const Router = require ( "express").Router;
const PostController = require ( "./controllers/PostController.js");
const HelpController = require ( "./controllers/HelpController.js");
const FriendsController = require ("./controllers/FriendsController.js")
const UserController = require ( "./controllers/UserController.js");
const authMiddleware = require ( "./middlewares/auth-middleware.js");
const ProfileController = require ("./controllers/ProfileController.js")
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

router.delete('/users/:email', UserController.deleteUser)
router.get('/allusers', UserController.getUsers)


// здесь я пытался сделать отдельный контроллер  чтобы отправлять через node
// письма на почту но у меня ни**я не получавлось ошибка ssl
router.post('/send', HelpController.send)

router.get('/users', FriendsController.getUsers)

router.get('/profile/:id', ProfileController.getStatus)
router.post('/profile', ProfileController.addStatus)


module.exports = router;