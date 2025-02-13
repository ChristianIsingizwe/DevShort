import rateLimit from "express-rate-limit";

export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  message: "Too many uploads from this IP, please try again after 15 minutes",
});
