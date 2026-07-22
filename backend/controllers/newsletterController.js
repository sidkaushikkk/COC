const Subscriber = require('../models/Subscriber');

// @desc    Subscribe to newsletter
// @route   POST /newsletter
// @access  Public
const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Check if duplicate subscription
    const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existingSubscriber) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed to our newsletter.'
      });
    }

    const subscriber = await Subscriber.create({
      email: email.toLowerCase()
    });

    return res.status(201).json({
      success: true,
      message: 'Successfully subscribed to the newsletter!',
      data: subscriber
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Server error processing newsletter subscription',
      error: error.message
    });
  }
};

module.exports = {
  subscribeNewsletter
};
