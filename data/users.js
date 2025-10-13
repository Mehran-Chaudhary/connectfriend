// Predefined Users Data
const PREDEFINED_USERS = [
  {
    id: 1,
    username: "john_doe",
    password: "password123",
    fullName: "John Doe",
    email: "john.doe@connecfriend.com",
    profilePicture: "JD",
    bio: "Software developer and tech enthusiast. Love coding and coffee ☕",
    location: "New York, USA",
    joined: "January 2024",
    friends: [2, 3, 4, 5],
    posts: 45,
    friendsCount: 234,
    lastLogin: new Date().toISOString(),
  },
  {
    id: 2,
    username: "sarah_smith",
    password: "password123",
    fullName: "Sarah Smith",
    email: "sarah.smith@connecfriend.com",
    profilePicture: "SS",
    bio: "Digital marketer | Travel lover 🌍 | Photography enthusiast 📸",
    location: "Los Angeles, USA",
    joined: "February 2024",
    friends: [1, 3, 4],
    posts: 67,
    friendsCount: 189,
    lastLogin: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: 3,
    username: "mike_wilson",
    password: "password123",
    fullName: "Mike Wilson",
    email: "mike.wilson@connecfriend.com",
    profilePicture: "MW",
    bio: "Fitness trainer 💪 | Nutrition expert | Helping people live healthier",
    location: "Chicago, USA",
    joined: "March 2024",
    friends: [1, 2, 5],
    posts: 89,
    friendsCount: 312,
    lastLogin: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    id: 4,
    username: "emma_johnson",
    password: "password123",
    fullName: "Emma Johnson",
    email: "emma.johnson@connecfriend.com",
    profilePicture: "EJ",
    bio: "Graphic designer | Art lover 🎨 | Creating beautiful things",
    location: "San Francisco, USA",
    joined: "January 2024",
    friends: [1, 2, 5],
    posts: 52,
    friendsCount: 276,
    lastLogin: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
  },
  {
    id: 5,
    username: "alex_brown",
    password: "password123",
    fullName: "Alex Brown",
    email: "alex.brown@connecfriend.com",
    profilePicture: "AB",
    bio: "Content creator | Video editor | Storyteller 🎬",
    location: "Miami, USA",
    joined: "February 2024",
    friends: [1, 3, 4],
    posts: 73,
    friendsCount: 198,
    lastLogin: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
  },
];

// Initialize users in localStorage if not already present
function initializeUsers() {
  if (!localStorage.getItem("connecfriend_users")) {
    localStorage.setItem(
      "connecfriend_users",
      JSON.stringify(PREDEFINED_USERS)
    );
    console.log("Users initialized in localStorage");
  }
}

// Get all users from localStorage
function getAllUsers() {
  const users = localStorage.getItem("connecfriend_users");
  return users ? JSON.parse(users) : PREDEFINED_USERS;
}

// Get user by username
function getUserByUsername(username) {
  const users = getAllUsers();
  return users.find((user) => user.username === username);
}

// Get user by ID
function getUserById(id) {
  const users = getAllUsers();
  return users.find((user) => user.id === id);
}

// Update user in localStorage
function updateUser(updatedUser) {
  const users = getAllUsers();
  const index = users.findIndex((user) => user.id === updatedUser.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    localStorage.setItem("connecfriend_users", JSON.stringify(users));
    return true;
  }
  return false;
}

// Validate user credentials
function validateCredentials(username, password) {
  const user = getUserByUsername(username);
  if (user && user.password === password) {
    return user;
  }
  return null;
}

// Set current logged-in user
function setCurrentUser(user) {
  // Update last login
  user.lastLogin = new Date().toISOString();
  updateUser(user);

  // Store in session
  const userSession = {
    id: user.id,
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    profilePicture: user.profilePicture,
    bio: user.bio,
    location: user.location,
    loginTime: new Date().toISOString(),
  };
  localStorage.setItem(
    "connecfriend_current_user",
    JSON.stringify(userSession)
  );
  sessionStorage.setItem("connecfriend_session", JSON.stringify(userSession));
}

// Get current logged-in user
function getCurrentUser() {
  const sessionUser = sessionStorage.getItem("connecfriend_session");
  const localUser = localStorage.getItem("connecfriend_current_user");

  if (sessionUser) {
    return JSON.parse(sessionUser);
  } else if (localUser) {
    // Restore from localStorage if "Remember me" was checked
    const user = JSON.parse(localUser);
    sessionStorage.setItem("connecfriend_session", JSON.stringify(user));
    return user;
  }
  return null;
}

// Logout user
function logoutUser() {
  sessionStorage.removeItem("connecfriend_session");
  localStorage.removeItem("connecfriend_current_user");
}

// Check if user is logged in
function isLoggedIn() {
  return getCurrentUser() !== null;
}

// Initialize users on page load
initializeUsers();
