const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { error, success } = require('../utilis/responseWrapper')

const signupController = async (req, res) => {
  try {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
      return res.send(error(404, 'All field are required'))
    }
    const olduser = await User.findOne({ email })
    if (olduser) {
      res.send(error(400, 'user already resistered'))
    }

    const hashedpassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      email,
      password: hashedpassword,
      name,
    })

    return res.json(success(201, { user }))
  } catch (err) {
    console.log(err)
  }
}

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.send(error(404, 'All fields are required'))
    }

    const user = await User.findOne({ email })

    if (!user) {
      res.send(error(404, 'user is not resistered'))
    }

    const matched = await bcrypt.compare(password, user.password)

    if (!matched) {
      res.send(error('password is incorrect'))
    }

    const accessToken = generateAccessTokens({
      _id: user._id,
      email: user.email,
    })
    const refreshToken = generateRefreshToken({
      _id: user._id,
      email: user.email,
    })

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
    })
    console.log(email)
    return res.json(success(201, { accessToken }))
  } catch (err) {
    console.log(err)
  }
}

const refreshTokenController = async (req, res) => {
  const cookie = req.cookies

  if (!cookie.jwt) {
    return res.send(error(401, 'refresh token is required'))
  }

  const refreshToken = cookie.jwt
  console.log('refresh ', refreshToken)

  try {
    const decode = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
    )
    req._id = decode._id

    const accessToken = generateAccessTokens({ _id: req._id })

    return res.send(success(201, { accessToken }))
  } catch (err) {
    console.log(err)
  }
}

const generateAccessTokens = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY)
    console.log(token)
    return token
  } catch (err) {
    console.log(err)
  }
}

const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY)
    console.log(token)
    return token
  } catch (err) {
    console.log(err)
  }
}

const logedout = async (req, res) => {
  try {
    res.clearCookie('jwt',{
      httpOnly:true,
      secure:true
    });

    return res.send("user logedOut");
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  signupController,
  loginController,
  refreshTokenController,
  logedout
}
