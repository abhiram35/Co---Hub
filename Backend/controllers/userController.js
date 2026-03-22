// User Profile Controller
const User = require('../models/User');

// GET /api/users/me - Get current user's full profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/users/me - Update bio and social links
exports.updateProfile = async (req, res) => {
  try {
    const { bio, socials } = req.body;

    const allowedSocials = ['github', 'linkedin', 'twitter', 'portfolio'];
    const socialUpdate = {};
    if (socials && typeof socials === 'object') {
      allowedSocials.forEach((key) => {
        if (socials[key] !== undefined) {
          socialUpdate[`socials.${key}`] = socials[key].trim();
        }
      });
    }

    const updateData = { ...socialUpdate };
    if (bio !== undefined) updateData.bio = bio.trim().slice(0, 300);

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/users/:id - Get any user's public profile
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -joinedProjects -createdProjects');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
