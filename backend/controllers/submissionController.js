const Submission = require('../models/Submission');
const sendEmail = require('../utils/sendEmail');
const cloudinary = require('../config/cloudinary');

// Helper to stream upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'children_of_capital_submissions' },
      (error, result) => {
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(error);
        }
      }
    );
    stream.end(fileBuffer);
  });
};

// @desc    Submit contributor article
// @route   POST /submit-article
// @access  Public
const submitArticle = async (req, res) => {
  try {
    const {
      name,
      email,
      title,
      category,
      description,
      readingTime,
      coverImage: coverImageUrl,
      content,
      bio,
      linkedin,
      website
    } = req.body;

    if (!name || !email || !title || !category || !content) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, title, category, and content are required fields'
      });
    }

    let finalCoverImage = coverImageUrl || '';

    // If an image file was attached via multipart form-data, upload to Cloudinary
    if (req.file) {
      try {
        finalCoverImage = await uploadToCloudinary(req.file.buffer);
      } catch (uploadError) {
        console.warn('Cloudinary upload warning:', uploadError.message);
        // Keep string coverImageUrl if Cloudinary config isn't set up yet
      }
    }

    // 1. Store in MongoDB with status = 'pending'
    const submission = await Submission.create({
      name,
      email,
      title,
      category,
      description: description || '',
      readingTime: readingTime || '',
      coverImage: finalCoverImage,
      content,
      bio: bio || '',
      linkedin: linkedin || '',
      website: website || '',
      status: 'pending',
      submittedAt: new Date()
    });

    // 2. Send email notification to OWNER_EMAIL
    const ownerEmail = process.env.OWNER_EMAIL || 'ksiddhant705@gmail.com';
    const emailSubject = `[Submission Request] - "${title}" by ${name}`;
    
    const emailText = `
New Article Submission Received on Children of Capital:

Submission ID: ${submission._id}
Title: ${title}
Author: ${name} (${email})
Category: ${category}
Est. Reading Time: ${readingTime || 'N/A'}
Cover Image: ${finalCoverImage || 'None'}

Author Bio:
${bio || 'N/A'}

LinkedIn / Website:
${linkedin || website || 'N/A'}

Manuscript Excerpt/Content Preview:
${content.substring(0, 500)}...
    `;

    const emailHtml = `
      <h2>New Contributor Submission Pending Review</h2>
      <p><strong>Title:</strong> ${title}</p>
      <p><strong>Author:</strong> ${name} (&lt;${email}&gt;)</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Est. Reading Time:</strong> ${readingTime || 'N/A'}</p>
      ${finalCoverImage ? `<p><strong>Cover Image:</strong> <a href="${finalCoverImage}" target="_blank">${finalCoverImage}</a></p>` : ''}
      <hr />
      <h3>Author Bio</h3>
      <p>${bio || 'N/A'}</p>
      <hr />
      <h3>Content</h3>
      <div style="white-space: pre-wrap; background: #f4f4f4; padding: 15px; border-radius: 4px;">${content}</div>
    `;

    const mailResult = await sendEmail({
      to: ownerEmail,
      subject: emailSubject,
      text: emailText,
      html: emailHtml
    });

    if (!mailResult.success) {
      console.warn('Submission notification email warning:', mailResult.error);
    }

    // 3. Return success response
    return res.status(201).json({
      success: true,
      message: 'Article submission received successfully and set to pending review.',
      data: submission
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error processing contributor article submission',
      error: error.message
    });
  }
};

module.exports = {
  submitArticle
};
