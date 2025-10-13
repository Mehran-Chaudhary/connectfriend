// Posts Data & Management

// Sample posts for the feed
const SAMPLE_POSTS = [
  {
    id: 1,
    userId: 2,
    content:
      "Just finished an amazing hike! The view from the top was absolutely breathtaking 🏔️ #NatureLover #Adventure",
    imageUrl: "gradient-1",
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    likes: [],
    dislikes: [],
    comments: [],
    visibility: "public",
  },
  {
    id: 2,
    userId: 3,
    content:
      "New workout routine is paying off! 💪 Feeling stronger every day. Remember, consistency is key! #FitnessJourney #HealthyLifestyle",
    imageUrl: null,
    timestamp: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
    likes: [],
    dislikes: [],
    comments: [],
    visibility: "public",
  },
  {
    id: 3,
    userId: 4,
    content:
      "Just completed this new design project! So proud of how it turned out 🎨✨ What do you think?",
    imageUrl: "gradient-2",
    timestamp: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
    likes: [],
    dislikes: [],
    comments: [],
    visibility: "friends",
  },
  {
    id: 4,
    userId: 5,
    content:
      "Behind the scenes of my latest video! This one was so much fun to create 🎬 Coming soon to my channel!",
    imageUrl: "gradient-3",
    timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
    likes: [],
    dislikes: [],
    comments: [],
    visibility: "public",
  },
  {
    id: 5,
    userId: 2,
    content:
      "Coffee and coding on a rainy day ☕💻 Perfect combination! What's your favorite way to spend a rainy day?",
    imageUrl: null,
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    likes: [],
    dislikes: [],
    comments: [],
    visibility: "public",
  },
];

// Initialize posts in localStorage
function initializePosts() {
  if (!localStorage.getItem("connecfriend_posts")) {
    localStorage.setItem("connecfriend_posts", JSON.stringify(SAMPLE_POSTS));
    console.log("Posts initialized in localStorage");
  }
}

// Get all posts
function getAllPosts() {
  const posts = localStorage.getItem("connecfriend_posts");
  return posts ? JSON.parse(posts) : SAMPLE_POSTS;
}

// Get posts for news feed (from friends, ordered by user's last login)
function getNewsFeedPosts() {
  const currentUser = getCurrentUser();
  if (!currentUser) return [];

  const fullUser = getUserById(currentUser.id);
  if (!fullUser || !fullUser.friends) return [];

  const allPosts = getAllPosts();
  const allUsers = getAllUsers();

  // Get posts from friends only
  const friendPosts = allPosts.filter((post) =>
    fullUser.friends.includes(post.userId)
  );

  // Sort by user's last login time (most recent first)
  const sortedPosts = friendPosts.sort((a, b) => {
    const userA = allUsers.find((u) => u.id === a.userId);
    const userB = allUsers.find((u) => u.id === b.userId);

    const loginA = new Date(userA?.lastLogin || 0);
    const loginB = new Date(userB?.lastLogin || 0);

    return loginB - loginA; // Most recent login first
  });

  // Attach user info to each post
  return sortedPosts.map((post) => {
    const user = allUsers.find((u) => u.id === post.userId);
    return {
      ...post,
      author: user || null,
    };
  });
}

// Create new post
function createPost(content, imageUrl, visibility, sharedWith = []) {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  const posts = getAllPosts();
  const newPost = {
    id: posts.length + 1,
    userId: currentUser.id,
    content,
    imageUrl,
    timestamp: new Date().toISOString(),
    likes: [],
    dislikes: [],
    comments: [],
    visibility,
    sharedWith: visibility === "custom" ? sharedWith : [],
  };

  posts.unshift(newPost); // Add to beginning
  localStorage.setItem("connecfriend_posts", JSON.stringify(posts));

  return newPost;
}

// Get post reactions (likes/dislikes)
function getPostReactions(postId) {
  const reactionsKey = `connecfriend_reactions`;
  const reactions = localStorage.getItem(reactionsKey);
  return reactions ? JSON.parse(reactions) : {};
}

// Like a post
function likePost(postId) {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;

  const reactionsKey = `connecfriend_reactions`;
  const reactions = getPostReactions();

  if (!reactions[postId]) {
    reactions[postId] = { likes: [], dislikes: [] };
  }

  // Remove from dislikes if present
  reactions[postId].dislikes = reactions[postId].dislikes.filter(
    (id) => id !== currentUser.id
  );

  // Toggle like
  if (reactions[postId].likes.includes(currentUser.id)) {
    reactions[postId].likes = reactions[postId].likes.filter(
      (id) => id !== currentUser.id
    );
  } else {
    reactions[postId].likes.push(currentUser.id);
  }

  localStorage.setItem(reactionsKey, JSON.stringify(reactions));
  return true;
}

// Dislike a post
function dislikePost(postId) {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;

  const reactionsKey = `connecfriend_reactions`;
  const reactions = getPostReactions();

  if (!reactions[postId]) {
    reactions[postId] = { likes: [], dislikes: [] };
  }

  // Remove from likes if present
  reactions[postId].likes = reactions[postId].likes.filter(
    (id) => id !== currentUser.id
  );

  // Toggle dislike
  if (reactions[postId].dislikes.includes(currentUser.id)) {
    reactions[postId].dislikes = reactions[postId].dislikes.filter(
      (id) => id !== currentUser.id
    );
  } else {
    reactions[postId].dislikes.push(currentUser.id);
  }

  localStorage.setItem(reactionsKey, JSON.stringify(reactions));
  return true;
}

// Check if user liked/disliked a post
function getUserReaction(postId) {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  const reactions = getPostReactions();
  if (!reactions[postId]) return null;

  if (reactions[postId].likes.includes(currentUser.id)) return "like";
  if (reactions[postId].dislikes.includes(currentUser.id)) return "dislike";
  return null;
}

// Get reaction counts
function getReactionCounts(postId) {
  const reactions = getPostReactions();
  if (!reactions[postId]) {
    return { likes: 0, dislikes: 0 };
  }

  return {
    likes: reactions[postId].likes.length,
    dislikes: reactions[postId].dislikes.length,
  };
}

// Format time ago
function formatTimeAgo(timestamp) {
  const now = new Date();
  const postDate = new Date(timestamp);
  const diffMs = now - postDate;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  return postDate.toLocaleDateString();
}

// Initialize posts on load
initializePosts();

console.log("Posts.js loaded successfully");
