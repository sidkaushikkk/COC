const sendEmail = require('../utils/sendEmail');

// @desc    Submit contact message
// @route   POST /contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, subject, message) are required'
      });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    const ownerEmail = process.env.OWNER_EMAIL || 'anvikshasingh583@gmail.com';

    const emailContentText = `
New Contact Form Submission from Children of Capital:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `;

    const emailContentHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <h3>Message:</h3>
      <p style="white-space: pre-wrap;">${message}</p>
    `;

    const result = await sendEmail({
      to: ownerEmail,
      subject: `[Contact Form] ${subject} - from ${name}`,
      text: emailContentText,
      html: emailContentHtml
    });

    if (!result.success) {
      console.warn('Contact email dispatch warning:', result.error);
    }

    return res.status(200).json({
      success: true,
      message: 'Your message has been received. Thank you for reaching out!'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to process contact form submission',
      error: error.message
    });
  }
};

module.exports = {
  submitContact
};
