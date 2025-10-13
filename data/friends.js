// Friend Ratings Data & Management

// Friend Rating Types
const FRIEND_RATINGS = {
  STUPID: {
    id: 1,
    name: "Stupid",
    emoji: "😜",
    color: "yellow",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-600",
    hoverColor: "hover:bg-yellow-200",
  },
  COOL: {
    id: 2,
    name: "Cool",
    emoji: "😎",
    color: "blue",
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
    hoverColor: "hover:bg-blue-200",
  },
  TRUSTWORTHY: {
    id: 3,
    name: "Trustworthy",
    emoji: "🤝",
    color: "green",
    bgColor: "bg-green-100",
    textColor: "text-green-600",
    hoverColor: "hover:bg-green-200",
  },
};

// Get friend ratings for current user
function getFriendRatings() {
  const currentUser = getCurrentUser();
  if (!currentUser) return {};

  const ratingsKey = `connecfriend_ratings_${currentUser.id}`;
  const ratings = localStorage.getItem(ratingsKey);
  return ratings ? JSON.parse(ratings) : {};
}

// Set friend rating
function setFriendRating(friendId, ratingId) {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;

  const ratingsKey = `connecfriend_ratings_${currentUser.id}`;
  const ratings = getFriendRatings();

  ratings[friendId] = ratingId;
  localStorage.setItem(ratingsKey, JSON.stringify(ratings));

  console.log(`Friend ${friendId} rated as ${ratingId}`);
  return true;
}

// Get rating for a specific friend
function getFriendRating(friendId) {
  const ratings = getFriendRatings();
  const ratingId = ratings[friendId];

  if (ratingId === 1) return FRIEND_RATINGS.STUPID;
  if (ratingId === 2) return FRIEND_RATINGS.COOL;
  if (ratingId === 3) return FRIEND_RATINGS.TRUSTWORTHY;

  return null;
}

// Get friends for current user
function getUserFriends() {
  const currentUser = getCurrentUser();
  if (!currentUser) return [];

  const fullUser = getUserById(currentUser.id);
  if (!fullUser || !fullUser.friends) return [];

  // Get all users and filter by friend IDs
  const allUsers = getAllUsers();
  return fullUser.friends
    .map((friendId) => {
      const friend = allUsers.find((u) => u.id === friendId);
      if (friend) {
        return {
          id: friend.id,
          username: friend.username,
          fullName: friend.fullName,
          profilePicture: friend.profilePicture,
          bio: friend.bio,
          location: friend.location,
          rating: getFriendRating(friend.id),
        };
      }
      return null;
    })
    .filter((f) => f !== null);
}

// Calculate time since last login
function getTimeSinceLogin(lastLogin) {
  if (!lastLogin) return "Never";

  const now = new Date();
  const loginDate = new Date(lastLogin);
  const diffMs = now - loginDate;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

console.log("Friends.js loaded successfully");
