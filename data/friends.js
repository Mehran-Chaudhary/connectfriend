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

// Friend Request Management

// Get friend requests for current user
function getFriendRequests() {
  const currentUser = getCurrentUser();
  if (!currentUser) return [];

  const requestsKey = "connecfriend_friend_requests";
  const requests = localStorage.getItem(requestsKey);
  const allRequests = requests ? JSON.parse(requests) : {};

  const userRequests = allRequests[currentUser.id] || [];
  const allUsers = getAllUsers();

  return userRequests
    .map((userId) => allUsers.find((u) => u.id === userId))
    .filter((u) => u);
}

// Get sent friend requests
function getSentFriendRequests() {
  const currentUser = getCurrentUser();
  if (!currentUser) return [];

  const requestsKey = "connecfriend_friend_requests";
  const requests = localStorage.getItem(requestsKey);
  const allRequests = requests ? JSON.parse(requests) : {};

  const allUsers = getAllUsers();
  const sentRequests = [];

  // Find all users who have a request from current user
  for (const [userId, requesters] of Object.entries(allRequests)) {
    if (requesters.includes(currentUser.id)) {
      const user = allUsers.find((u) => u.id === parseInt(userId));
      if (user) sentRequests.push(user);
    }
  }

  return sentRequests;
}

// Send friend request
function sendFriendRequest(toUserId) {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;

  const requestsKey = "connecfriend_friend_requests";
  const requests = localStorage.getItem(requestsKey);
  const allRequests = requests ? JSON.parse(requests) : {};

  if (!allRequests[toUserId]) {
    allRequests[toUserId] = [];
  }

  if (!allRequests[toUserId].includes(currentUser.id)) {
    allRequests[toUserId].push(currentUser.id);
  }

  localStorage.setItem(requestsKey, JSON.stringify(allRequests));
  return true;
}

// Accept friend request
function acceptFriendRequest(fromUserId) {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;

  // Remove from requests
  const requestsKey = "connecfriend_friend_requests";
  const requests = localStorage.getItem(requestsKey);
  const allRequests = requests ? JSON.parse(requests) : {};

  if (allRequests[currentUser.id]) {
    allRequests[currentUser.id] = allRequests[currentUser.id].filter(
      (id) => id !== fromUserId
    );
  }

  localStorage.setItem(requestsKey, JSON.stringify(allRequests));

  // Add to friends list
  const usersKey = "connecfriend_users";
  const users = JSON.parse(localStorage.getItem(usersKey) || "[]");

  const currentUserData = users.find((u) => u.id === currentUser.id);
  const fromUserData = users.find((u) => u.id === fromUserId);

  if (currentUserData && fromUserData) {
    if (!currentUserData.friends) currentUserData.friends = [];
    if (!fromUserData.friends) fromUserData.friends = [];

    if (!currentUserData.friends.includes(fromUserId)) {
      currentUserData.friends.push(fromUserId);
    }

    if (!fromUserData.friends.includes(currentUser.id)) {
      fromUserData.friends.push(currentUser.id);
    }

    localStorage.setItem(usersKey, JSON.stringify(users));
  }

  return true;
}

// Decline friend request
function declineFriendRequest(fromUserId) {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;

  const requestsKey = "connecfriend_friend_requests";
  const requests = localStorage.getItem(requestsKey);
  const allRequests = requests ? JSON.parse(requests) : {};

  if (allRequests[currentUser.id]) {
    allRequests[currentUser.id] = allRequests[currentUser.id].filter(
      (id) => id !== fromUserId
    );
  }

  localStorage.setItem(requestsKey, JSON.stringify(allRequests));
  return true;
}

// Cancel friend request
function cancelFriendRequest(toUserId) {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;

  const requestsKey = "connecfriend_friend_requests";
  const requests = localStorage.getItem(requestsKey);
  const allRequests = requests ? JSON.parse(requests) : {};

  if (allRequests[toUserId]) {
    allRequests[toUserId] = allRequests[toUserId].filter(
      (id) => id !== currentUser.id
    );
  }

  localStorage.setItem(requestsKey, JSON.stringify(allRequests));
  return true;
}

// Get suggestions (users who are not friends and haven't been requested)
function getSuggestions() {
  const currentUser = getCurrentUser();
  if (!currentUser) return [];

  const fullUser = getUserById(currentUser.id);
  const allUsers = getAllUsers();
  const sentRequests = getSentFriendRequests();
  const sentRequestIds = sentRequests.map((u) => u.id);

  const friends = fullUser.friends || [];

  return allUsers
    .filter((user) => {
      return (
        user.id !== currentUser.id &&
        !friends.includes(user.id) &&
        !sentRequestIds.includes(user.id)
      );
    })
    .slice(0, 8); // Limit to 8 suggestions
}

console.log("Friends.js loaded successfully");
