import express from "express";
import {registerController, loginController, testController, forgotPasswordController, updateProfileController} from "../controllers/authController.js";
import { requireSignIn, isAdmin, authenticateUser } from "../middlewares/authMiddleware.js";

//route project
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post('/register', registerController);

//LOGIN || METHOD POST
router.post('/login', loginController);

//FORGOT PASSWORD || POST
router.post('/forgot-password', forgotPasswordController); 

//test routes
router.get('/test', requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    return res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    return res.status(200).send({ ok: true });
});
  
//update profile
router.put("/profile", requireSignIn, authenticateUser, updateProfileController);


export default router;