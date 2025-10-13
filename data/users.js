// Predefined Users Data
const PREDEFINED_USERS = [
  {
    id: 1,
    username: "mehran_akhtar",
    password: "password123",
    fullName: "Mehran Akhtar",
    alias: "MA",
    email: "mehran.akhtar@connecfriend.com",
    profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
    coverPhoto: "https://picsum.photos/seed/mehran/1200/400",
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
    profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
    coverPhoto: "https://picsum.photos/seed/fatima/1200/400",
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
    profilePicture: "https://randomuser.me/api/portraits/men/45.jpg",
    coverPhoto: "https://picsum.photos/seed/abdullah/1200/400",
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
    profilePicture: "https://randomuser.me/api/portraits/women/65.jpg",
    coverPhoto: "https://picsum.photos/seed/aisha/1200/400",
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
    profilePicture: "https://randomuser.me/api/portraits/men/52.jpg",
    coverPhoto: "https://picsum.photos/seed/omar/1200/400",
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
    profilePicture: "https://randomuser.me/api/portraits/women/68.jpg",
    coverPhoto: "https://picsum.photos/seed/zainab/1200/400",
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
    alias: "MAL",
    email: "mohammad.ali@connecfriend.com",
    profilePicture: "https://randomuser.me/api/portraits/men/43.jpg",
    coverPhoto: "https://picsum.photos/seed/mohamadali/1200/400",
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
    profilePicture: "https://randomuser.me/api/portraits/men/71.jpg",
    coverPhoto: "https://picsum.photos/seed/hamza/1200/400",
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
    profilePicture: "https://randomuser.me/api/portraits/women/72.jpg",
    coverPhoto: "https://picsum.photos/seed/mariam/1200/400",
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
    profilePicture: "https://randomuser.me/api/portraits/men/83.jpg",
    coverPhoto: "https://picsum.photos/seed/yusuf/1200/400",
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
    profilePicture: "https://randomuser.me/api/portraits/women/81.jpg",
    coverPhoto: "https://picsum.photos/seed/sarah/1200/400",
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
    profilePicture: "https://randomuser.me/api/portraits/men/75.jpg",
    coverPhoto: "https://picsum.photos/seed/weichen/1200/400",
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
    profilePicture: "https://randomuser.me/api/portraits/women/90.jpg",
    coverPhoto: "https://picsum.photos/seed/liming/1200/400",
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
    profilePicture: "https://randomuser.me/api/portraits/women/85.jpg",
    coverPhoto: "https://picsum.photos/seed/priya/1200/400",
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
    profilePicture: "https://randomuser.me/api/portraits/men/92.jpg",
    coverPhoto: "https://picsum.photos/seed/raj/1200/400",
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
    profilePicture: "https://randomuser.me/api/portraits/men/88.jpg",
    coverPhoto: "https://picsum.photos/seed/sompong/1200/400",
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
    profilePicture: "https://randomuser.me/api/portraits/men/62.jpg",
    coverPhoto: "https://picsum.photos/seed/david/1200/400",
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
    alias: "SRD",
    email: "sofia.rodriguez@connecfriend.com",
    profilePicture: "https://randomuser.me/api/portraits/women/79.jpg",
    coverPhoto: "https://picsum.photos/seed/sofia/1200/400",
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
    profilePicture: "https://randomuser.me/api/portraits/men/67.jpg",
    coverPhoto: "https://picsum.photos/seed/ahmed/1200/400",
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
    profilePicture: "https://randomuser.me/api/portraits/women/95.jpg",
    coverPhoto: "https://picsum.photos/seed/emma/1200/400",
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
