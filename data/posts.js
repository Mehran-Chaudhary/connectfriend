// Posts Data & Management

// Sample posts for the feed
const SAMPLE_POSTS = [
  {
    id: 1,
    userId: 2,
    content:
      "Just finished an incredible marketing campaign for our client in Dubai. The results exceeded all expectations! Grateful for this opportunity to make an impact.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
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
      "Morning workout session complete. The discipline you build in the gym translates to every aspect of life. Stay consistent, stay strong.",
    imageUrl:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
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
      "Finished designing the new branding identity for a local business in Islamabad. It's amazing how colors and shapes can tell a powerful story. What do you think of this color palette?",
    imageUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
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
      "Behind the scenes from today's video shoot in Riyadh. The production quality keeps getting better with each project. Can't wait to share the final result with everyone!",
    imageUrl:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop",
    timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
    likes: [],
    dislikes: [],
    comments: [],
    visibility: "public",
  },
  {
    id: 5,
    userId: 6,
    content:
      "Standing at the edge of the world in the Egyptian desert. Travel teaches us that home is not a place, but a feeling. Every journey brings new perspectives.",
    imageUrl:
      "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800&h=600&fit=crop",
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    likes: [],
    dislikes: [],
    comments: [],
    visibility: "public",
  },
  {
    id: 6,
    userId: 8,
    content:
      "Golden hour photography session in the beautiful valleys of Multan. Nature provides the perfect canvas, we just need to capture it at the right moment.",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    timestamp: new Date(Date.now() - 129600000).toISOString(), // 1.5 days ago
    likes: [],
    dislikes: [],
    comments: [],
    visibility: "public",
  },
  {
    id: 7,
    userId: 9,
    content:
      "Teaching the next generation of coders at our coding bootcamp in Amman. Every student has the potential to create something amazing. The future of tech is bright!",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    likes: [],
    dislikes: [],
    comments: [],
    visibility: "public",
  },
  {
    id: 8,
    userId: 12,
    content:
      "Deployed our new cloud infrastructure today. Scalability achieved with 99.9% uptime. The architecture is finally where we need it to be for the next phase of growth.",
    imageUrl: null,
    timestamp: new Date(Date.now() - 216000000).toISOString(), // 2.5 days ago
    likes: [],
    dislikes: [],
    comments: [],
    visibility: "public",
  },
  {
    id: 9,
    userId: 14,
    content:
      "Morning yoga session by the sea in Mumbai. Finding peace and balance is essential in our fast-paced world. Take time to breathe and be present.",
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
    timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    likes: [],
    dislikes: [],
    comments: [],
    visibility: "public",
  },
  {
    id: 10,
    userId: 15,
    content:
      "Working on a new animation project that blends traditional art with digital innovation. The fusion of old and new creates something truly special.",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
    timestamp: new Date(Date.now() - 302400000).toISOString(), // 3.5 days ago
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
