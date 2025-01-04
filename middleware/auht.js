import jwt from "jsonwebtoken";

export const Auth = (req, res, next) => {
  try {
    // Retrieve the token from the `Authorization` header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided or invalid token format",
        success: false,
        error: true,
      });
    }

    // Extract the token after "Bearer "
    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Add the decoded token data to the request object for future use
    req.userId = decoded;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid or expired token
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
      error: true,
    });
  }
};
