import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Firebase Configuration (Replace with your actual Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyASuwzHzN7tF2CRWhikxclhHvyMr2pqCV4",
  authDomain: "digital-e-gram-panchayat-6fd24.firebaseapp.com",
  projectId: "digital-e-gram-panchayat-6fd24",
  storageBucket: "digital-e-gram-panchayat-6fd24.firebasestorage.app",
  messagingSenderId: "629896439749",
  appId: "1:629896439749:web:6377d8bf4de3eaf5794dac",
  measurementId: "G-XV8HB6P402"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// --- Logging Utility ---
function logAction(action, details = {}) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Action: ${action}`, details);
    // In a production environment, you might send this to a dedicated logging service
    // or a Firebase function that writes to a more persistent log.
}

// --- Common Utility Functions ---

/**
 * Displays an alert message to the user.
 * @param {string} message The message to display.
 * @param {string} type 'success' or 'error'.
 */
function displayMessage(message, type = 'success') {
    alert(message); // Using native alert for simplicity
    // For a better UX, implement a custom notification system (e.g., toast messages)
    if (type === 'error') {
        console.error("Error:", message);
    } else {
        console.log("Success:", message);
    }
}

/**
 * Checks if the current user has a specific role.
 * @param {string} requiredRole The role to check against ('admin', 'officer', 'staff', 'user').
 * @returns {Promise<boolean>} True if the user has the required role, false otherwise.
 */
async function checkUserRole(requiredRole) {
    const user = auth.currentUser;
    if (!user) {
        return false;
    }
    try {
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists && userDoc.data().role === requiredRole) {
            return true;
        }
    } catch (error) {
        logAction('Error checking user role', { error: error.message, userId: user.uid, requiredRole });
    }
    return false;
}

// --- User Module Functions ---

/**
 * Registers a new user with email and password and stores additional data.
 * @param {string} email User's email.
 * @param {string} password User's password.
 * @param {object} userData Additional user data (e.g., name, mobile, role).
 * @returns {Promise<firebase.User|null>} The created Firebase User object or null on failure.
 */
async function registerUser(email, password, userData) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        await db.collection('users').doc(userCredential.user.uid).set(userData);
        logAction('User Registered', { userId: userCredential.user.uid, email: email });
        displayMessage('Registration successful!', 'success');
        return userCredential.user;
    } catch (error) {
        logAction('User Registration Failed', { error: error.message, email: email });
        displayMessage(`Registration failed: ${error.message}`, 'error');
        return null;
    }
}

/**
 * Logs in a user with email and password.
 * @param {string} email User's email.
 * @param {string} password User's password.
 * @returns {Promise<firebase.User|null>} The logged-in Firebase User object or null on failure.
 */
async function loginUser(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        logAction('User Logged In', { userId: userCredential.user.uid, email: email });
        displayMessage('Login successful!', 'success');
        return userCredential.user;
    } catch (error) {
        logAction('User Login Failed', { error: error.message, email: email });
        displayMessage(`Login failed: ${error.message}`, 'error');
        return null;
    }
}

/**
 * Logs out the current user.
 */
function logoutUser() {
    auth.signOut().then(() => {
        logAction('User Logged Out');
        displayMessage('Logged out successfully!', 'success');
        // Redirect to login or home page after logout
        window.location.href = 'login.html';
    }).catch((error) => {
        logAction('User Logout Failed', { error: error.message });
        displayMessage(`Logout failed: ${error.message}`, 'error');
    });
}

/**
 * Submits an application for a service.
 * @param {string} userId The ID of the user submitting the application.
 * @param {string} serviceId The ID of the service being applied for.
 * @param {object} applicationData The specific data for the application (e.g., applicant's name, Aadhaar).
 * @returns {Promise<void>}
 */
async function applyForService(userId, serviceId, applicationData) {
    try {
        await db.collection('applications').add({
            userId: userId,
            serviceId: serviceId,
            status: 'Pending', // Initial status
            ...applicationData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        logAction('Service Application Submitted', { userId, serviceId });
        displayMessage('Application submitted successfully! You can track its status in "My Applications".', 'success');
        // Redirect to my-applications page
        window.location.href = 'my-applications.html';
    } catch (error) {
        logAction('Service Application Failed', { error: error.message, userId, serviceId });
        displayMessage(`Application submission failed: ${error.message}`, 'error');
    }
}

/**
 * Retrieves all applications for a specific user.
 * @param {string} userId The ID of the user.
 * @returns {Promise<Array<object>>} An array of application objects.
 */
async function getUserApplications(userId) {
    try {
        const snapshot = await db.collection('applications').where('userId', '==', userId).get();
        const applications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        logAction('Fetched User Applications', { userId, count: applications.length });
        return applications;
    } catch (error) {
        logAction('Failed to Fetch User Applications', { error: error.message, userId });
        displayMessage("Error getting your applications. Please try again later.", 'error');
        return [];
    }
}

// --- Officer/Admin Module Functions ---

/**
 * Creates a new service. (Admin only)
 * @param {object} serviceData The data for the new service (name, description, fees).
 * @returns {Promise<void>}
 */
async function createService(serviceData) {
    if (!(await checkUserRole('admin'))) {
        displayMessage('Authorization failed. Only administrators can create services.', 'error');
        return;
    }
    try {
        await db.collection('services').add({
            ...serviceData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        logAction('Service Created', { serviceName: serviceData.name });
        displayMessage('Service created successfully!', 'success');
    } catch (error) {
        logAction('Service Creation Failed', { error: error.message, serviceName: serviceData.name });
        displayMessage(`Service creation failed: ${error.message}`, 'error');
    }
}

/**
 * Updates an existing service. (Admin only)
 * @param {string} serviceId The ID of the service to update.
 * @param {object} newData The new data for the service.
 * @returns {Promise<void>}
 */
async function updateService(serviceId, newData) {
    if (!(await checkUserRole('admin'))) {
        displayMessage('Authorization failed. Only administrators can update services.', 'error');
        return;
    }
    try {
        await db.collection('services').doc(serviceId).update({
            ...newData,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        logAction('Service Updated', { serviceId });
        displayMessage('Service updated successfully!', 'success');
    } catch (error) {
        logAction('Service Update Failed', { error: error.message, serviceId });
        displayMessage(`Service update failed: ${error.message}`, 'error');
    }
}

/**
 * Deletes a service. (Admin only)
 * @param {string} serviceId The ID of the service to delete.
 * @returns {Promise<void>}
 */
async function deleteService(serviceId) {
    if (!(await checkUserRole('admin'))) {
        displayMessage('Authorization failed. Only administrators can delete services.', 'error');
        return;
    }
    try {
        await db.collection('services').doc(serviceId).delete();
        logAction('Service Deleted', { serviceId });
        displayMessage('Service deleted successfully!', 'success');
    } catch (error) {
        logAction('Service Deletion Failed', { error: error.message, serviceId });
        displayMessage(`Service deletion failed: ${error.message}`, 'error');
    }
}

/**
 * Updates the status of an application. (Admin/Officer/Staff)
 * @param {string} applicationId The ID of the application to update.
 * @param {string} newStatus The new status (e.g., 'Approved', 'Rejected').
 * @param {string} remarks Optional remarks for the status update.
 * @returns {Promise<void>}
 */
async function updateApplicationStatus(applicationId, newStatus, remarks = '') {
    const user = auth.currentUser;
    if (!user) {
        displayMessage('You must be logged in to update application status.', 'error');
        return;
    }

    const userDoc = await db.collection('users').doc(user.uid).get();
    if (!userDoc.exists || !['admin', 'officer', 'staff'].includes(userDoc.data().role)) {
        displayMessage('Authorization failed. Only authorized personnel can update application status.', 'error');
        return;
    }

    try {
        await db.collection('applications').doc(applicationId).update({
            status: newStatus,
            remarks: remarks,
            updatedBy: user.uid, // Track who updated it
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        logAction('Application Status Updated', { applicationId, newStatus, updatedBy: user.uid });
        displayMessage('Application status updated successfully!', 'success');
    } catch (error) {
        logAction('Application Status Update Failed', { error: error.message, applicationId, newStatus });
        displayMessage(`Failed to update application status: ${error.message}`, 'error');
    }
}

// --- Staff Module Functions (and common for User/Officer) ---

/**
 * Retrieves all available services.
 * @returns {Promise<Array<object>>} An array of service objects.
 */
async function getServices() {
    try {
        const snapshot = await db.collection('services').get();
        const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        logAction('Fetched Services', { count: services.length });
        return services;
    } catch (error) {
        logAction('Failed to Fetch Services', { error: error.message });
        displayMessage("Error fetching services. Please try again later.", 'error');
        return [];
    }
}

// Export functions to be accessible globally (or use module system)
// For simple HTML files, attaching to window is common.
window.firebase = firebase; // Make firebase object available
window.auth = auth;
window.db = db;
window.logAction = logAction;
window.displayMessage = displayMessage;
window.checkUserRole = checkUserRole;

// User functions
window.registerUser = registerUser;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.applyForService = applyForService;
window.getUserApplications = getUserApplications;

// Admin/Officer functions
window.createService = createService;
window.updateService = updateService;
window.deleteService = deleteService;
window.updateApplicationStatus = updateApplicationStatus;

// Staff/Common functions
window.getServices = getServices;