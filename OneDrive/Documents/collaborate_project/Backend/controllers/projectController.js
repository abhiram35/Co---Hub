// Projects Controller
const Project = require('../models/Project');
const Idea = require('../models/Idea');
const User = require('../models/User');

// Join a project (create project from idea or join existing)
exports.joinProject = async (req, res) => {
  try {
    const { ideaId } = req.params;
    const userId = req.userId; // From auth middleware

    // Validate idea exists
    const idea = await Idea.findById(ideaId);
    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    // Check if project already exists for this idea
    let project = await Project.findOne({ ideaId });

    if (!project) {
      // Create new project if it doesn't exist
      project = new Project({
        ideaId,
        members: [userId], // Add current user as first member
        status: 'Open',
      });
    } else {
      // Check if user is already a member
      if (project.members.includes(userId)) {
        return res.status(400).json({ error: 'You are already a member of this project' });
      }
      // Add user to existing project
      project.members.push(userId);
    }

    // Save project
    await project.save();

    // Update user's joined projects
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { joinedProjects: project._id } }, // $addToSet prevents duplicates
      { new: true }
    );

    // Populate and return project details
    await project.populate('ideaId').populate('members', 'name email domain');

    res.status(201).json({
      message: 'Successfully joined project',
      project,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's projects (both joined and created)
exports.getMyProjects = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware

    // Find user and populate project details
    const user = await User.findById(userId)
      .populate({
        path: 'joinedProjects',
        populate: { path: 'ideaId' },
      })
      .populate({
        path: 'createdProjects',
        populate: { path: 'ideaId' },
      });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'Projects fetched successfully',
      joinedProjects: user.joinedProjects,
      createdProjects: user.createdProjects,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
