const mongoose = require('mongoose');
const router = express.Router();
const Registration = mongoose.model('Registration');
const Arrivee = mongoose.model('Arrivees');
const auth = /middleware/auth;
router.get("/me", auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });