import { Request, Response } from "express"
import { userSchema } from "../validators/UserSchemaValidator"
import { HTTP_STATUS_CODES } from "../utils/statusCode"
import { User } from "../models/UserModel"
import bcryptjs from "bcryptjs"
import { generateToken } from "../utils/jwt"

const { OK, BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR } = HTTP_STATUS_CODES

const register = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body
  try {
    const validator = userSchema.safeParse({ email, password })
    if (!validator.success) {
      return res.status(BAD_REQUEST).json({ success: false, message: validator.error.issues })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(BAD_REQUEST).json({ success: false, message: "Email ya registrado" })
    }

    const hash = await bcryptjs.hash(password, 10)
    const newUser = new User({ email, password: hash })
    await newUser.save()

    const token = generateToken(newUser._id.toString())
    res.status(CREATED).json({ success: true, message: "Usuario registrado exitosamente", token })
  } catch (error) {
    const err = error as Error
    res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: err.message })
  }
}

const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  try {
    const validator = userSchema.safeParse({ email, password });
    if (!validator.success) {
      return res.status(BAD_REQUEST).json({ success: false, message: validator.error.issues });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(BAD_REQUEST).json({ success: false, message: "Credenciales invalidas" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(BAD_REQUEST).json({ success: false, message: "Credenciales invalidas" });
    }

    const token = generateToken(user._id.toString());

    // 🔥 Acá devolvés también el email
    res.status(OK).json({
      success: true,
      message: "Login exitoso",
      token,
      email: user.email,
    });
  } catch (error) {
    const err = error as Error;
    res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });
  }
};

export { register, login }