// Predefined Users Data
const PREDEFINED_USERS = [
  {
    id: 1,
    username: "mehran_akhtar",
    password: "password123",
    fullName: "Mehran Akhtar",
    alias: "MA",
    email: "mehran.akhtar@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop",
    bio: "Software engineer and tech innovator. Building the future one line of code at a time.",
    location: "Karachi, Pakistan",
    joined: "January 2024",
    friends: [2, 3, 4, 5, 6, 7, 8],
    posts: 45,
    friendsCount: 234,
    lastLogin: new Date().toISOString(),
  },
  {
    id: 2,
    username: "fatima_zahra",
    password: "password123",
    fullName: "Fatima Zahra",
    alias: "FZ",
    email: "fatima.zahra@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=400&fit=crop",
    bio: "Digital marketing specialist and content strategist. Helping brands tell their stories.",
    location: "Dubai, UAE",
    joined: "February 2024",
    friends: [1, 3, 4, 6, 9],
    posts: 67,
    friendsCount: 189,
    lastLogin: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: 3,
    username: "abdullah_rahman",
    password: "password123",
    fullName: "Abdullah Rahman",
    alias: "AR",
    email: "abdullah.rahman@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop",
    bio: "Fitness coach and nutrition expert. Transforming lives through health and wellness.",
    location: "Lahore, Pakistan",
    joined: "March 2024",
    friends: [1, 2, 5, 7, 10],
    posts: 89,
    friendsCount: 312,
    lastLogin: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    id: 4,
    username: "aisha_malik",
    password: "password123",
    fullName: "Aisha Malik",
    alias: "AM",
    email: "aisha.malik@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop",
    bio: "Graphic designer and visual artist. Creating beauty through design and color.",
    location: "Islamabad, Pakistan",
    joined: "January 2024",
    friends: [1, 2, 5, 8, 11],
    posts: 52,
    friendsCount: 276,
    lastLogin: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
  },
  {
    id: 5,
    username: "omar_hassan",
    password: "password123",
    fullName: "Omar Hassan",
    alias: "OH",
    email: "omar.hassan@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=400&fit=crop",
    bio: "Video creator and storyteller. Capturing moments that inspire and connect people.",
    location: "Riyadh, Saudi Arabia",
    joined: "February 2024",
    friends: [1, 3, 4, 9, 12],
    posts: 73,
    friendsCount: 198,
    lastLogin: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
  },
  {
    id: 6,
    username: "zainab_ahmed",
    password: "password123",
    fullName: "Zainab Ahmed",
    alias: "ZA",
    email: "zainab.ahmed@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=400&fit=crop",
    bio: "Travel blogger and adventure seeker. Exploring the world one destination at a time.",
    location: "Cairo, Egypt",
    joined: "March 2024",
    friends: [1, 2, 7, 10, 13],
    posts: 94,
    friendsCount: 421,
    lastLogin: new Date(Date.now() - 5400000).toISOString(), // 1.5 hours ago
  },
  {
    id: 7,
    username: "mohammad_ali",
    password: "password123",
    fullName: "Mohammad Ali",
    alias: "MA",
    email: "mohammad.ali@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1200&h=400&fit=crop",
    bio: "Business consultant and entrepreneur. Helping startups scale and succeed.",
    location: "Doha, Qatar",
    joined: "February 2024",
    friends: [1, 3, 6, 11, 14],
    posts: 61,
    friendsCount: 287,
    lastLogin: new Date(Date.now() - 9000000).toISOString(), // 2.5 hours ago
  },
  {
    id: 8,
    username: "hamza_sheikh",
    password: "password123",
    fullName: "Hamza Sheikh",
    alias: "HS",
    email: "hamza.sheikh@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=400&fit=crop",
    bio: "Photographer and visual storyteller. Capturing life's beautiful moments through my lens.",
    location: "Multan, Pakistan",
    joined: "January 2024",
    friends: [1, 4, 9, 12, 15],
    posts: 128,
    friendsCount: 563,
    lastLogin: new Date(Date.now() - 1800000).toISOString(), // 30 min ago
  },
  {
    id: 9,
    username: "mariam_noor",
    password: "password123",
    fullName: "Mariam Noor",
    alias: "MN",
    email: "mariam.noor@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop",
    bio: "Tech educator and coding mentor. Empowering the next generation of developers.",
    location: "Amman, Jordan",
    joined: "March 2024",
    friends: [2, 5, 8, 13, 16],
    posts: 76,
    friendsCount: 342,
    lastLogin: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
  },
  {
    id: 10,
    username: "yusuf_ibrahim",
    password: "password123",
    fullName: "Yusuf Ibrahim",
    alias: "YI",
    email: "yusuf.ibrahim@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=400&fit=crop",
    bio: "Data scientist and AI researcher. Working on machine learning solutions for social good.",
    location: "Peshawar, Pakistan",
    joined: "February 2024",
    friends: [3, 6, 11, 14, 17],
    posts: 43,
    friendsCount: 198,
    lastLogin: new Date(Date.now() - 28800000).toISOString(), // 8 hours ago
  },
  {
    id: 11,
    username: "sarah_khan",
    password: "password123",
    fullName: "Sarah Khan",
    alias: "SK",
    email: "sarah.khan@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&h=400&fit=crop",
    bio: "Fashion designer and style consultant. Bringing elegance and tradition together.",
    location: "Faisalabad, Pakistan",
    joined: "January 2024",
    friends: [4, 7, 10, 15, 18],
    posts: 112,
    friendsCount: 489,
    lastLogin: new Date(Date.now() - 12600000).toISOString(), // 3.5 hours ago
  },
  {
    id: 12,
    username: "wei_chen",
    password: "password123",
    fullName: "Wei Chen",
    alias: "WC",
    email: "wei.chen@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1542190891-2093d38760f2?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=400&fit=crop",
    bio: "Software architect and cloud computing specialist. Building scalable systems.",
    location: "Beijing, China",
    joined: "March 2024",
    friends: [5, 8, 13, 16, 19],
    posts: 38,
    friendsCount: 167,
    lastLogin: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
  },
  {
    id: 13,
    username: "li_ming",
    password: "password123",
    fullName: "Li Ming",
    alias: "LM",
    email: "li.ming@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1507081323647-4d250478b919?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop",
    bio: "Entrepreneur and startup founder. Innovation is my passion and success is my goal.",
    location: "Shanghai, China",
    joined: "February 2024",
    friends: [6, 9, 12, 17, 20],
    posts: 55,
    friendsCount: 234,
    lastLogin: new Date(Date.now() - 25200000).toISOString(), // 7 hours ago
  },
  {
    id: 14,
    username: "priya_sharma",
    password: "password123",
    fullName: "Priya Sharma",
    alias: "PS",
    email: "priya.sharma@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop",
    bio: "Yoga instructor and wellness coach. Finding balance and peace through mindful living.",
    location: "Mumbai, India",
    joined: "January 2024",
    friends: [7, 10, 15, 18, 1],
    posts: 91,
    friendsCount: 378,
    lastLogin: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    id: 15,
    username: "raj_patel",
    password: "password123",
    fullName: "Raj Patel",
    alias: "RP",
    email: "raj.patel@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=400&fit=crop",
    bio: "Digital artist and animator. Creating visual experiences that inspire and amaze.",
    location: "Bangalore, India",
    joined: "March 2024",
    friends: [8, 11, 14, 19, 2],
    posts: 104,
    friendsCount: 445,
    lastLogin: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
  },
  {
    id: 16,
    username: "sompong_thai",
    password: "password123",
    fullName: "Sompong Rattana",
    alias: "SR",
    email: "sompong.thai@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&h=400&fit=crop",
    bio: "Chef and culinary artist. Bringing authentic Thai flavors to the world.",
    location: "Bangkok, Thailand",
    joined: "February 2024",
    friends: [9, 12, 17, 20, 3],
    posts: 87,
    friendsCount: 312,
    lastLogin: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
  },
  {
    id: 17,
    username: "david_miller",
    password: "password123",
    fullName: "David Miller",
    alias: "DM",
    email: "david.miller@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop",
    bio: "Environmental scientist working on climate change solutions and sustainability.",
    location: "Toronto, Canada",
    joined: "January 2024",
    friends: [10, 13, 16, 19, 4],
    posts: 62,
    friendsCount: 267,
    lastLogin: new Date(Date.now() - 19800000).toISOString(), // 5.5 hours ago
  },
  {
    id: 18,
    username: "sofia_rodriguez",
    password: "password123",
    fullName: "Sofia Rodriguez",
    alias: "SR",
    email: "sofia.rodriguez@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=400&fit=crop",
    bio: "Journalist and human rights advocate. Telling stories that need to be heard.",
    location: "Madrid, Spain",
    joined: "March 2024",
    friends: [11, 14, 17, 20, 5],
    posts: 79,
    friendsCount: 356,
    lastLogin: new Date(Date.now() - 16200000).toISOString(), // 4.5 hours ago
  },
  {
    id: 19,
    username: "ahmed_farouk",
    password: "password123",
    fullName: "Ahmed Farouk",
    alias: "AF",
    email: "ahmed.farouk@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=400&fit=crop",
    bio: "Medical doctor and healthcare innovator. Committed to improving patient care.",
    location: "Alexandria, Egypt",
    joined: "February 2024",
    friends: [12, 15, 18, 1, 6],
    posts: 47,
    friendsCount: 201,
    lastLogin: new Date(Date.now() - 23400000).toISOString(), // 6.5 hours ago
  },
  {
    id: 20,
    username: "emma_watson",
    password: "password123",
    fullName: "Emma Watson",
    alias: "EW",
    email: "emma.watson@connecfriend.com",
    profilePicture:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    coverPhoto:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=400&fit=crop",
    bio: "Education reformer and literacy advocate. Every child deserves access to quality education.",
    location: "London, UK",
    joined: "January 2024",
    friends: [13, 16, 19, 2, 7],
    posts: 58,
    friendsCount: 289,
    lastLogin: new Date(Date.now() - 27000000).toISOString(), // 7.5 hours ago
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

// Debug: Log that users.js is loaded
console.log("Users.js loaded successfully");
console.log(
  "Available users:",
  getAllUsers().map((u) => u.username)
);
