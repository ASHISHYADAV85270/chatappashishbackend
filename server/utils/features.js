import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user?._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true, //it avoids using cookies from frontend
      maxAge: 60 * 60 * 1000,
      sameSite: "none", //koi bhi site excess kr skti hai
      secure: true, //necessary for sending cookie
    })
    .json({
      success: true,
      message: message,
    });
};

/*
lax and strict are almost same ->cookie ecxess broken hoga 
none is used jb hmmm app bnaa rhai hai 
agr kuch nhi dia to boo bydefault lax hoga ab according to web new policy
*/
