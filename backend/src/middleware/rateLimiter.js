import ratelimit from "../config/upstash.js";

//middleware
const rateLimiter = async (req, res, next) => {
  //u real life aplikaciji zelimo da stavimo userId ili ipAddress kao key
  try {
    const { success } = await ratelimit.limit("my-rate-limit");

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }

    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
