# 🎉 Community Event Planner

A beautiful, modern Progressive Web App (PWA) for creating, managing, and discovering community events. Built with vanilla HTML, CSS, and JavaScript with a stunning glassmorphic design.

![Event Planner](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PWA](https://img.shields.io/badge/PWA-ready-orange.svg)

## ✨ Features

- **📝 Event Management**: Create, edit, and delete events with ease
- **👥 RSVP System**: Users can RSVP to events and view attendee lists
- **🔍 Search & Filter**: Real-time search and advanced filtering by category/date
- **🔐 Permission Control**: Only event creators can edit/delete their events
- **💾 Offline Support**: Works offline with service worker caching
- **📱 PWA Ready**: Installable as a native app on desktop and mobile
- **🎨 Modern Design**: Glassmorphic UI with vibrant gradients and smooth animations
- **📊 Category System**: 6 event categories with color coding
- **💿 Local Storage**: No backend needed - all data stored in browser

## 🎯 Event Categories

- **Social** - Community gatherings and social events
- **Professional** - Networking and business events
- **Sports** - Athletic activities and tournaments
- **Arts** - Cultural and artistic events
- **Education** - Workshops and learning sessions
- **Other** - Miscellaneous events

## 🚀 How to Run This Project

### Method 1: Direct File Opening (Quickest)

1. **Navigate to the project folder**:
   ```
   C:\Users\Varun\OneDrive\Desktop\communityeventplanner
   ```

2. **Double-click `index.html`**

3. **Done!** The app will open in your default browser

> **Note**: This method works perfectly but won't enable PWA features (offline mode, install button)

---

### Method 2: Using Python (PWA Features Enabled)

**Requirements**: Python 3.x installed

1. **Open Command Prompt** (Win + R, type `cmd`, press Enter)

2. **Navigate to project directory**:
   ```bash
   cd C:\Users\Varun\OneDrive\Desktop\communityeventplanner
   ```

3. **Start local server**:
   ```bash
   python -m http.server 8000
   ```

4. **Open browser** and go to:
   ```
   http://localhost:8000
   ```

5. **You'll see the "Install App" button** appear - click it to install as PWA!

6. **To stop server**: Press `Ctrl + C` in Command Prompt

---

### Method 3: Using Node.js (Alternative)

**Requirements**: Node.js installed

1. **Install http-server globally** (one-time):
   ```bash
   npm install -g http-server
   ```

2. **Navigate to project**:
   ```bash
   cd C:\Users\Varun\OneDrive\Desktop\communityeventplanner
   ```

3. **Start server**:
   ```bash
   http-server -p 8000
   ```

4. **Open browser**: `http://localhost:8000`

---

### Method 4: Using VS Code Live Server

**Requirements**: VS Code with Live Server extension

1. **Open VS Code**

2. **Open project folder**: `File` → `Open Folder` → Select `communityeventplanner`

3. **Install Live Server extension** (if not installed):
   - Extensions icon (left sidebar)
   - Search "Live Server"
   - Install by Ritwick Dey

4. **Right-click `index.html`** → **"Open with Live Server"**

5. **Done!** App opens automatically in browser

---

## 📁 Project Structure

```
communityeventplanner/
├── index.html           # Main HTML file
├── styles.css           # Complete design system and styles
├── app.js              # Application logic and event management
├── manifest.json       # PWA manifest configuration
├── service-worker.js   # Service worker for offline support
├── icon-192.png        # App icon (192x192) - optional
├── icon-512.png        # App icon (512x512) - optional
└── README.md           # This file
```

## 🎮 How to Use

### Creating Events

1. Click **"+ Create Event"** button
2. Fill in all required fields:
   - Event Title
   - Category
   - Date & Time
   - Location
   - Description
3. Click **"Save Event"**

### RSVP to Events

1. Click on any event card
2. Click **"RSVP"** button in the event details
3. Your name will be added to the attendee list
4. Click **"Cancel RSVP"** to remove yourself

### Searching & Filtering

- **Search**: Type in the search box to find events by title, location, or description
- **Category Filter**: Select a category from the dropdown
- **Date Filter**: Choose from All Dates, Upcoming, This Week, or This Month

### Editing/Deleting Events

1. Click on an event **you created**
2. Click **"Edit Event"** to modify details
3. Click **"Delete Event"** to remove the event (confirmation required)

> **Note**: Only event creators can edit/delete their own events!

### Switching Users

- Use the **"Current User"** dropdown to switch between users
- This is for testing the permission system
- Each user can only edit/delete their own events

## 🌐 Deploying Online

### Option 1: Netlify (Easiest)

1. Go to https://app.netlify.com/drop
2. Drag and drop all project files
3. Get instant URL: `https://your-app.netlify.app`

### Option 2: GitHub Pages

1. Create GitHub repository
2. Upload all files
3. Settings → Pages → Enable Pages
4. URL: `https://username.github.io/repository-name/`

### Option 3: Vercel

1. Sign up at https://vercel.com
2. Import repository
3. Deploy with one click

[See detailed deployment guide](./deployment-guide.md)

## 💾 Data Storage

- All event data is stored in browser's **localStorage**
- Data persists across browser sessions
- No backend or database required
- Each user's browser has independent data

**To clear data**:
1. Open browser DevTools (F12)
2. Application → Local Storage
3. Clear storage

## 🔧 Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with CSS variables
- **JavaScript (ES6+)** - Application logic
- **Service Workers** - Offline functionality
- **LocalStorage API** - Data persistence
- **PWA** - Progressive Web App capabilities

## 🎨 Design Features

- **Glassmorphic UI** with backdrop blur
- **Vibrant gradients** (Indigo, Pink, Teal)
- **Smooth animations** and transitions
- **Responsive design** for all screen sizes
- **Dark mode aesthetic**
- **Custom scrollbar** styling
- **Category-based color coding**

## 📱 Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Any modern browser with ES6+ support

## 🐛 Troubleshooting

**Styles not loading?**
- Ensure `styles.css` is in the same directory as `index.html`
- Hard refresh: `Ctrl + F5`

**JavaScript not working?**
- Check browser console (F12) for errors
- Ensure `app.js` is in the same directory

**Install button not appearing?**
- Must use `localhost` or `https://` (not `file://`)
- Icons must be present: `icon-192.png` and `icon-512.png`

**Events not saving?**
- Check if localStorage is enabled in browser
- Check browser's privacy settings

## 👤 Default Users

The app comes with demo users for testing:

- **Varun (Admin)** - Default user
- Alice Johnson
- Bob Smith
- Charlie Davis
- Diana Martinez

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

Created by Varun

---

## 🎉 Quick Start Checklist

- [ ] Download/clone the project
- [ ] Open `index.html` directly OR
- [ ] Run local server (Python/Node/VS Code)
- [ ] Create your first event
- [ ] Test RSVP functionality
- [ ] Try search and filters
- [ ] Switch users to test permissions
- [ ] Install as PWA (optional)
- [ ] Deploy online (optional)

---

**Enjoy using Community Event Planner! 🚀**

For questions or issues, feel free to reach out!

