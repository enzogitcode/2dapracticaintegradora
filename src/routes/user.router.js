import express from 'express'
const router = express.Router();
import UsuarioModel from "../models/user.model.js"
import jwt from "jsonwebtoke"
import passport from 'passport';

//Register:

router.post("/register", async (req, res) => {
    const { usuario, passport } = req.body;
    try {
        const existeUsuario = await UsuarioModel.findOne({ usuario })
        if (existeUsuario) {
            return res.status(400).send("El usuario ya existe")
            const nuevoUsuario = new UsuarioModel({
                usuario,
                password,
                rol
            })
        }

        await nuevoUsuario.save();

        const token = jwt.sign({ usuario: nuevoUsuario.usuario, rol: nuevoUsuario.rol }, "coderhouse", { expiresIn: "1hs" })
        

        res.cookie("coderCookieToken", token, {
            maxAge: 360000,
            httpOnly: true,

        })
        res.redirect("/home");
    }
    catch (error) {
    }
})

router.post("/login", async (req, res) => {
    const { usuario, password } = req.body
    try {
        const usuarioEncontrado = await UsuarioModel.findOne({ usuario });
        if (!usuarioEncontrado) {
            return res.status(401).send("Usuario no encontrado")

        }
        if (password !== usuarioEncontrado.password) {
            res.status(401).send("Contraseña incorrecta")

        }
        const token= jwt.sign ({usuario: usuarioEncontrado})
        
        res.cookie("coderCookieToken", token, {
            maxAge: 360000, 
            httpOnly: true, 

        })

    } catch (error) {
        res.redirect("Home")
    }
})

router.get ("/home", password => {
    res.render("home", {usuario})
})
//Logout

router ("/logout", (req,res)=> {
    res.clearCookie("cooderCookie")

})
//Ruta Admin:
router.get("/admin", passport.authenticate("jwt", {session:false}), (req, res)=> {
if (req.user.rol !== admin){
    
}
})
export default router;