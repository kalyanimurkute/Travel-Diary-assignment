import dotenv from "dotenv";

dotenv.config();

const getHome = (req, res) => {
  res.json({
    message: 'Welcome to the Tiny Tours API',
  });
};

const getHealth = (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is healthy',
  });
}
export { getHome, getHealth };