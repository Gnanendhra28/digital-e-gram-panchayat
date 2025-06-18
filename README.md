
This project aims to improve the delivery of citizen services in villages by computerizing applications for gram panchayat services. It provides a web application for citizens to apply for various services online and track their progress, while administrative staff manage approvals and scheme creation.

## Project Details

* [cite_start]**Project Title**: Digital E Gram Panchayat 
* [cite_start]**Technologies**: HTML, CSS, JS, and Firebase 
* [cite_start]**Domain**: Industry 

<img width="1021" alt="Screenshot 2025-06-18 at 11 03 18 PM" src="https://github.com/user-attachments/assets/49d80e87-42ae-41e7-8966-63c71a19958c" /># Digital E Gram Panchayat

## Problem Statement

[cite_start]The major goal of this project is to improve the delivery of citizen services in the village by computerizing applications for gram panchayat services. [cite_start]Gram panchayat is a decentralized institution that manages applications and provides information about gram panchayat services. [cite_start]The suggested system will allow users to submit applications for various services and track their progress. [cite_start]The suggested system E-Services for Gram Panchayath develops a web application with the goal of providing government information about services or schemes, and public users can apply for services using an online application. [cite_start]Admin and staff will manage the application for approval and creation of the scheme.

## System Modules

* [cite_start]User 
* [cite_start]Staff 
* [cite_start]Officer 

### Module List

[cite_start]**Officer/Admin** 
* [cite_start]Login 
* [cite_start]Create Services 
* [cite_start]Update/Delete services 
* [cite_start]Update application status 
* [cite_start]Logout 

[cite_start]**User** 
* [cite_start]Register 
* [cite_start]Login 
* [cite_start]Search services 
* [cite_start]Apply Services 
* [cite_start]My application status 
* [cite_start]My profile 
* [cite_start]Logout 

[cite_start]**Staff** 
* [cite_start]Login 
* [cite_start]View services 
* [cite_start]Update Application status 

## Project Evaluation Metrics

### Code
* [cite_start]Code should be written in a modular fashion.
* [cite_start]**Safe**: It can be used without causing harm.
* [cite_start]**Testable**: It can be tested at the code level.
* [cite_start]**Maintainable**: It can be maintained, even as your codebase grows.
* [cite_start]**Portable**: It works the same in every environment (operating system).
* [cite_start]You have to maintain your code on GitHub.
* [cite_start]You have to keep your GitHub repo public so that anyone can check your code.
* [cite_start]Proper readme file you have to maintain for any project development.
* [cite_start]You should include basic workflow and execution of the entire project in the readme file on GitHub.
* [cite_start]Follow the coding standards.

### Database
* [cite_start]You are supposed to use Firebase.

### Logging
* [cite_start]Logging is a must for every action performed by your code, use the JavaScript or python logging library for this.

### Deployment
* [cite_start]You can host your model in the cloud platform, edge devices, or maybe local, but with a proper justification of your system design.

### Optimization of solutions
* [cite_start]Try to optimize your solution on code level, architecture level, and mention all of these things in your final submission.
* [cite_start]Mention your test cases for your project.

## Setup and Local Execution

### Prerequisites

* Web browser (Chrome, Firefox, etc.)
* A text editor (VS Code, Sublime Text, etc.)
* (Optional but Recommended) A local web server to avoid CORS issues (e.g., Live Server extension for VS Code, or Python's `http.server`).

### Firebase Project Setup

1.  **Create a Firebase Project**:
    * Go to the [Firebase Console](https://console.firebase.google.com/).
    * Click "Add project" and follow the prompts to create a new project.
2.  **Add a Web App**:
    * Inside your Firebase project, click on the "</>" icon to add a web app.
    * Follow the setup steps and **copy your Firebase configuration object**. This will look something like:
        ```javascript
        const firebaseConfig = {
         apiKey: "AIzaSyASuwzHzN7tF2CRWhikxclhHvyMr2pqCV4",
         authDomain: "digital-e-gram-panchayat-6fd24.firebaseapp.com",
         projectId: "digital-e-gram-panchayat-6fd24",
         storageBucket: "digital-e-gram-panchayat-6fd24.firebasestorage.app",
         messagingSenderId: "629896439749",
         appId: "1:629896439749:web:6377d8bf4de3eaf5794dac",
         measurementId: "G-XV8HB6P402"
          };
        ```
3.  **Update `js/script.js`**:
    * Open `js/script.js` in your project.
    * Replace the placeholder `firebaseConfig` with the actual configuration you copied from Firebase.
4.  **Enable Firebase Services**:
    * In your Firebase Console, navigate to:
        * **Authentication**: Go to "Build" > "Authentication" > "Get started". Then, go to the "Sign-in method" tab and enable "Email/Password".
        * **Firestore Database**: Go to "Build" > "Firestore Database" > "Create database". Start in "production mode" (you'll set up rules later) and choose a location.

### Running Locally

1.  **Clone the Repository (if not already done)**:
    ```bash
    git clone [https://github.com/YOUR_USERNAME/digital-e-gram-panchayat.git](https://github.com/YOUR_USERNAME/digital-e-gram-panchayat.git)
    cd digital-e-gram-panchayat
    ```
2.  **Install Firebase SDK**:
    The Firebase SDK is included via CDN links in `index.html`, `login.html`, etc., so no separate installation is required for client-side use.

3.  **Serve the Files**:
    * **Using VS Code Live Server**: If you have Visual Studio Code, install the "Live Server" extension. Right-click on `index.html` and select "Open with Live Server".
    * **Using Python's HTTP Server**: Open your terminal in the `digital-e-gram-panchayat` directory and run:
        ```bash
        python -m http.server 8000
        ```
        Then, open your web browser and navigate to `http://localhost:8000`.

## Test Cases

These are example test cases for various functionalities.

### User Module

* **TC001: User Registration Success**
    * **Description**: Verify a new user can successfully register with valid credentials.
    * **Steps**:
        1.  Navigate to `/register.html`.
        2.  Enter valid email, password, name, and mobile number.
        3.  Click "Register".
    * **Expected Result**: User account created in Firebase Auth and 'users' collection; "Registration successful!" alert; Redirect to login/home page.

* **TC002: User Login Success**
    * **Description**: Verify a registered user can log in successfully.
    * **Steps**:
        1.  Navigate to `/login.html`.
        2.  Enter registered email and password.
        3.  Click "Login".
    * **Expected Result**: User logged in; "Login successful!" alert; Redirect to user dashboard.

* **TC003: Apply for Service**
    * **Description**: Verify a logged-in user can apply for an available service.
    * **Steps**:
        1.  Log in as a user.
        2.  Navigate to `/services.html`.
        3.  Select a service and click "Apply".
        4.  Fill out the application form with required details.
        5.  Click "Submit Application".
    * **Expected Result**: Application created in 'applications' collection with 'Pending' status; "Application submitted successfully!" alert.

* **TC004: View My Applications**
    * **Description**: Verify a user can view their submitted applications and their statuses.
    * **Steps**:
        1.  Log in as a user.
        2.  Navigate to `/my-applications.html`.
    * **Expected Result**: List of user's applications displayed with current statuses.

### Officer/Admin Module

* **TC005: Admin Login Success**
    * **Description**: Verify an admin can log in successfully.
    * **Steps**:
        1.  Navigate to `/login.html`.
        2.  Enter admin email and password (ensure an admin user is set up in Firebase).
        3.  Click "Login".
    * **Expected Result**: Admin logged in; Redirect to admin dashboard.

* **TC006: Create New Service**
    * **Description**: Verify an admin can create a new service.
    * **Steps**:
        1.  Log in as admin.
        2.  Navigate to `/manage-services.html`.
        3.  Click "Add New Service" (or equivalent button/link).
        4.  Enter service name, description, and other details.
        5.  Click "Save Service".
    * **Expected Result**: New service added to 'services' collection; "Service created successfully!" alert.

* **TC007: Update Application Status (Admin/Officer)**
    * **Description**: Verify an admin/officer can update the status of an application.
    * **Steps**:
        1.  Log in as admin/officer.
        2.  Navigate to `/manage-applications.html`.
        3.  Select a pending application from the list.
        4.  Change its status (e.g., to 'Approved').
        5.  Add remarks (optional).
        6.  Click "Update Status".
    * **Expected Result**: Application status updated in 'applications' collection; "Application status updated successfully!" alert; User's view of application status reflects the change.

### Staff Module

* **TC008: Staff Login Success**
    * **Description**: Verify a staff member can log in successfully.
    * **Steps**:
        1.  Navigate to `/login.html`.
        2.  Enter staff email and password (ensure a staff user is set up).
        3.  Click "Login".
    * **Expected Result**: Staff logged in; Redirect to staff dashboard.

* **TC009: Update Application Status (Staff)**
    * **Description**: Verify a staff member can update the status of an application.
    * **Steps**:
        1.  Log in as staff.
        2.  Navigate to `/manage-applications.html`.
        3.  Select a pending application.
        4.  Change its status (e.g., to 'In Progress').
        5.  Click "Update Status".
    * **Expected Result**: Application status updated in 'applications' collection; "Application status updated successfully!" alert.

## Firebase Firestore Rules (Example - **Crucial for Security**)

You MUST configure your Firestore security rules to protect your data. Here's a *basic* example to get started, but you will need to customize this heavily based on your role-based access control.
