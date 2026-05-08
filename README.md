# 🎨 Biruk Maedot - Portfolio Website

## 🌟 Overview
This is a **personal portfolio website** for **Biruk Maedot**, a Software Engineering graduate specializing in Full-Stack Web Development and Machine Learning. The website showcases his skills, projects, experience, and services in a modern, responsive design.

## ✨ Features
- 📱 **Responsive Design**: Built with Bootstrap 5.3.3 for mobile-first, responsive layouts
- 🎭 **Interactive Elements**: Includes animations, typed text effects, and smooth scrolling
- 🖼️ **Portfolio Showcase**: Displays projects with filtering capabilities
-  **SEO Optimized**: Proper meta tags and semantic HTML structure

## 🛠️ Technologies Used
### 🎨 Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.3.3
- AOS (Animate On Scroll)
- Typed.js
- GLightbox
- Swiper
- Isotope Layout

### 🧰 Development Tools
- VS Code
- Git & GitHub
- Linux Environment

## 📁 Project Structure
```
portfolio/
├── index.html                 # Main portfolio page
├── assets/
│   ├── css/
│   │   └── main.css         # Custom styles
│   ├── js/
│   │   └── main.js          # Main JavaScript
│   ├── img/                 # Images and icons
│   └── vendor/              # Third-party libraries
└── README.md                 # This file
```

## 📋 Sections
1. 🏠 **Hero**: Introduction with animated typing effect
2. 👤 **About**: Personal background and professional summary
3. 🛠️ **Skills**: Technical skills with icon representations
4. ❤️ **Interests**: Areas of interest and passion
5. 📄 **Resume**: Education, certifications, and experience
6. 🖼️ **Portfolio**: Project showcase with filtering
7. 💼 **Services**: Professional services offered

## 🚀 Key Projects Featured
- 📱 Digital Attendance System (QR-based)
- 🛒 E-Commerce Platform
- 🧠 Sentiment Analysis Model
- 🏨 Hotel Management System

## 🎯 Skills Highlighted
- **Programming Languages**: Python, JavaScript, PHP
- **Frontend**: React.js, HTML5, CSS3, Bootstrap, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, MySQL
- **Machine Learning**: TensorFlow, scikit-learn, Pandas, NumPy
- **Tools**: Git, GitHub, VS Code, Linux

## 🏆 Certifications
- 🎓 Full-Stack Web Development (Evangadi Tech, 2025)
- 🤖 Machine Learning Specialization (Coursera - Stanford Online & DeepLearning.AI, 2024)

## � Deployment on GitHub Pages

This portfolio is optimized for **GitHub Pages** deployment:

### 📋 Deployment Checklist
- ✅ **index.html** in root directory
- ✅ All asset paths are relative (no absolute paths)
- ✅ No server-side dependencies

### 🔧 GitHub Pages Setup
1. Push your code to a GitHub repository
2. Go to **Settings** → **Pages**
3. Set **Source** to "Deploy from a branch"
4. Set **Branch** to `main` and **Folder** to `/root`
5. Click **Save**
6. Your site will be available at 'https://burukebmt.github.io/birukmaedot.github.io/'
## 📧 Contact Form - EmailJS Integration

The portfolio includes a modern, fully-functional contact form powered by **EmailJS**, enabling email delivery without backend servers.

### Features

✅ **Form Validation**
- Email format validation
- Name minimum length (2 characters)
- Message minimum length (10 characters)
- Real-time error display

✅ **Rate Limiting**
- Maximum 3 messages per hour (configurable)
- Displays cooldown timer to users
- Uses browser localStorage for tracking

✅ **User Experience**
- Loading spinner during submission
- Success/error toast notifications
- Auto-dismissing toasts (5-6 seconds)
- Form auto-reset after successful submission
- Detailed error messages with validation hints

✅ **Production Ready**
- Error handling and logging
- Try-catch blocks for reliability
- Responsive design
- Accessible form elements

### Email Template Setup

1. Log in to [EmailJS Dashboard](https://dashboard.emailjs.com)
2. Create or edit template `template_s3v2e08`
3. Use these variables in your HTML email template:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Message content

### Example Email Template HTML

```html
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <h2 style="color: #2c3e50;">📩 New Portfolio Contact Message</h2>
  
  <p><strong>👤 Name:</strong> {{from_name}}</p>
  <p><strong>📧 Email:</strong> {{from_email}}</p>
  
  <p><strong>💬 Message:</strong></p>
  <div style="padding: 10px; background: #f9f9f9; border-left: 4px solid #3498db;">
    {{message}}
  </div>
  
  <hr style="border: 1px solid #eee;" />
  
  <p style="font-size: 12px; color: #888;">
    This message was sent from your portfolio contact form.
  </p>
</div>
```

### How to Update EmailJS Credentials

To use different EmailJS credentials:

1. Open `assets/js/main.js`
2. Find the EmailJS configuration section (around line 214)
3. Update:
   - `emailjs.init('YOUR_PUBLIC_KEY')`
   - `.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', ...)`
4. Test the form before deployment

### Troubleshooting

**Form not sending emails?**
- Verify EmailJS service and template IDs match
- Check browser console (F12) for error messages
- Ensure EmailJS account is active
- Verify email template variables match form data

**Rate limit not working?**
- Clear browser localStorage: `localStorage.clear()`
- Check browser console for errors

**Toast notifications not appearing?**
- Ensure Bootstrap CSS is loaded
- Check z-index in browser DevTools

## �📞 Contact Information
- 📧 **Email**: burukmaedot24@gmail.com
- 📱 **Phone**: +251 970 30 8327
- 📍 **Location**: Adama, Ethiopia
- 💻 **GitHub**: https://github.com/BurukeBMT
- 🔗 **LinkedIn**: https://et.linkedin.com/in/biruk-maedot-563019322

## 🚀 Setup Instructions
1. Clone or download the project files
2. Open `index.html` in a modern web browser
3. For local development, use a local server like Apache or Nginx

## 🌐 Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🎨 Customization
- Update personal information in `index.html`
- Modify styles in `assets/css/main.css`
- Add new projects to the portfolio section
- Update contact information and social links

## 📜 License
This project is for personal use. Template based on iPortfolio by BootstrapMade.

## 👨‍💻 Author
**Biruk Maedot**
- 🎓 Software Engineering Graduate (Class of 2025)
- 🏫 Adama Science and Technology University (ASTU)
- 💡 Passionate about AI, Web Development, and Problem Solving

---
*Last updated: 2025*
