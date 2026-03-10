# Community Event Planner App 🎉

## Project Overview

The **Community Event Planner App** is a web-based application that allows users to create, view, and manage community events.
It helps communities organize activities such as workshops, meetups, cultural events, and social gatherings in an easy and interactive way.

The application stores event information using **Firebase Realtime Database**, enabling real-time data storage and retrieval.

---

## Features

* Create and manage community events
* Store event data in Firebase cloud database
* View events dynamically on the webpage
* Real-time database updates
* Simple and user-friendly interface
* Responsive design

---

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Firebase Realtime Database

Tools Used:

* Visual Studio Code
* Git & GitHub

---

## Project Structure

community-event-planner-app

│

├── index.html          # Main webpage

├── style.css           # Styling for the UI

├── script.js           # Application logic

├── firebase.js         # Firebase configuration

└── README.md           # Project documentation

---

## Firebase Database

This project uses **Firebase Realtime Database** to store event information such as:

* Event Title
* Category
* Date
* Time
* Location
* Description
* Creator

Example database structure:

{
"events": {
"event1": {
"title": "Music Festival",
"date": "2026-03-20",
"location": "City Park"
}
}
}

---

## Installation and Setup

### Step 1: Clone the Repository

git clone https://github.com/YOUR_USERNAME/community-event-planner-app.git

### Step 2: Open the Project

Open the folder using **Visual Studio Code**.

File → Open Folder → Select project folder.

### Step 3: Configure Firebase

Open the JavaScript file where Firebase is initialized and add your Firebase configuration.

Example:

const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_PROJECT.firebaseapp.com",
databaseURL: "https://YOUR_PROJECT.firebaseio.com",
projectId: "YOUR_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);

### Step 4: Run the Application

Open **index.html** in a web browser
OR use the **Live Server extension** in Visual Studio Code.

Right Click → Open with Live Server

---

## Usage

1. Open the application in a browser.
2. Create a new event by filling in the event details.
3. Submit the form to save the event.
4. Events will be stored in Firebase and displayed on the webpage.

---

## Future Improvements

* User authentication
* Event editing and deletion
* Event search and filtering
* Google Maps integration for event locations
* Mobile responsive UI improvements

---

## Author

Harshith R S

---

## License

This project is created for educational and internship purposes.

