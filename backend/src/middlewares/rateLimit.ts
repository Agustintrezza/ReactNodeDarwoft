import rateLimit from 'express-rate-limit'

const apiLimiter = rateLimit({
    windowMs:3 * 60 * 1000,
    max: 20,
    statusCode: 429,
    message: {
        status: 429,
        message: "Demasiadas peticiones desde esta IP, por favor dejá pasar 3 minutos y volvé a probar. Gracias!"
    }
   })

export { apiLimiter }