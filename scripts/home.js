// Home Page / News Feed Script

document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in
  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  const fullUser = getUserById(currentUser.id);

  // Display user info in various places
  displayUserInfo(fullUser);

  // Load news feed
  loadNewsFeed();

  // Load online friends
  loadOnlineFriends();

  // Setup event listeners
  setupEventListeners();
});

// Display user information
function displayUserInfo(user) {
  // Header avatar
  const headerAvatar = document.getElementById("header-avatar");
  if (headerAvatar) {
    headerAvatar.textContent = user.profilePicture;
  }

  // Sidebar user info
  document.getElementById("sidebar-avatar").textContent = user.profilePicture;
  document.getElementById("sidebar-name").textContent = user.fullName;
  document.getElementById("sidebar-username").textContent = `@${user.username}`;
  document.getElementById("sidebar-friends").textContent = user.friendsCount;

  // Create post avatar
  document.getElementById("create-post-avatar").textContent =
    user.profilePicture;

  // Modal avatar
  document.getElementById("modal-avatar").textContent = user.profilePicture;
  document.getElementById("modal-name").textContent = user.fullName;
}

// Load news feed posts
function loadNewsFeed() {
  const feedPosts = getNewsFeedPosts();
  const newsFeed = document.getElementById("news-feed");

  if (feedPosts.length === 0) {
    newsFeed.innerHTML = `
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
        <svg class="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
        </svg>
        <h3 class="text-xl font-bold text-gray-900 mb-2">No posts to show</h3>
        <p class="text-gray-500">Connect with friends to see their updates!</p>
        <a href="friends.html" class="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Find Friends
        </a>
      </div>
    `;
    return;
  }

  newsFeed.innerHTML = feedPosts.map((post) => createPostHTML(post)).join("");

  // Attach event listeners to all posts
  attachPostEventListeners();
}

// Create HTML for a single post
function createPostHTML(post) {
  if (!post.author) return "";

  const reactions = getReactionCounts(post.id);
  const userReaction = getUserReaction(post.id);
  const timeAgo = formatTimeAgo(post.timestamp);

  // Gradient classes for images
  const gradients = [
    "from-blue-300 via-purple-300 to-pink-300",
    "from-green-300 via-blue-300 to-purple-300",
    "from-orange-300 via-red-300 to-pink-300",
    "from-yellow-300 via-green-300 to-blue-300",
  ];
  const gradientClass =
    post.imageUrl === "gradient-1"
      ? gradients[0]
      : post.imageUrl === "gradient-2"
      ? gradients[1]
      : post.imageUrl === "gradient-3"
      ? gradients[2]
      : gradients[3];

  const visibilityIcon =
    post.visibility === "public"
      ? "🌍"
      : post.visibility === "friends"
      ? "👥"
      : "⚙️";
  const visibilityText =
    post.visibility === "public"
      ? "Public"
      : post.visibility === "friends"
      ? "Friends"
      : "Custom";

  return `
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 post-card">
      <!-- Post Header -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
            ${post.author.profilePicture}
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">${post.author.fullName}</h3>
            <div class="flex items-center space-x-2 text-sm text-gray-500">
              <span>${timeAgo}</span>
              <span>•</span>
              <span>${visibilityIcon} ${visibilityText}</span>
            </div>
          </div>
        </div>
        <button class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
          </svg>
        </button>
      </div>

      <!-- Post Content -->
      <p class="text-gray-800 mb-4">${post.content}</p>

      <!-- Post Image (if exists) -->
      ${
        post.imageUrl
          ? `<div class="rounded-xl overflow-hidden mb-4 h-96 bg-gradient-to-br ${gradientClass}"></div>`
          : ""
      }

      <!-- Post Stats -->
      <div class="flex items-center justify-between py-3 border-t border-b border-gray-200 mb-3">
        <div class="flex items-center space-x-4 text-sm text-gray-600">
          ${
            reactions.likes > 0
              ? `<span class="flex items-center space-x-1">
                  <span class="text-blue-600">👍</span>
                  <span>${reactions.likes} Like${
                  reactions.likes > 1 ? "s" : ""
                }</span>
                </span>`
              : ""
          }
          ${
            reactions.dislikes > 0
              ? `<span class="flex items-center space-x-1">
                  <span class="text-red-600">👎</span>
                  <span>${reactions.dislikes} Dislike${
                  reactions.dislikes > 1 ? "s" : ""
                }</span>
                </span>`
              : ""
          }
          ${
            reactions.likes === 0 && reactions.dislikes === 0
              ? `<span class="text-gray-400">No reactions yet</span>`
              : ""
          }
        </div>
        <div class="flex items-center space-x-4 text-sm text-gray-600">
          <span>0 Comments</span>
          <span>0 Shares</span>
        </div>
      </div>

      <!-- Post Actions -->
      <div class="flex items-center justify-around">
        <button 
          class="like-btn flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-all duration-200 ${
            userReaction === "like" ? "text-blue-600" : "text-gray-600"
          }"
          data-post-id="${post.id}"
        >
          <svg class="w-5 h-5" fill="${
            userReaction === "like" ? "currentColor" : "none"
          }" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
          </svg>
          <span class="text-sm font-medium">Like</span>
        </button>

        <button 
          class="dislike-btn flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-all duration-200 ${
            userReaction === "dislike" ? "text-red-600" : "text-gray-600"
          }"
          data-post-id="${post.id}"
        >
          <svg class="w-5 h-5" fill="${
            userReaction === "dislike" ? "currentColor" : "none"
          }" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"></path>
          </svg>
          <span class="text-sm font-medium">Dislike</span>
        </button>

        <button class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          <span class="text-sm font-medium">Comment</span>
        </button>

        <button class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
          </svg>
          <span class="text-sm font-medium">Share</span>
        </button>
      </div>
    </div>
  `;
}

// Attach event listeners to posts
function attachPostEventListeners() {
  // Like buttons
  document.querySelectorAll(".like-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const postId = parseInt(this.getAttribute("data-post-id"));
      likePost(postId);
      loadNewsFeed(); // Reload to update UI
    });
  });

  // Dislike buttons
  document.querySelectorAll(".dislike-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const postId = parseInt(this.getAttribute("data-post-id"));
      dislikePost(postId);
      loadNewsFeed(); // Reload to update UI
    });
  });
}

// Load online friends (sidebar)
function loadOnlineFriends() {
  const friends = getUserFriends();
  const onlineFriends = document.getElementById("online-friends");

  if (!onlineFriends) return;

  if (friends.length === 0) {
    onlineFriends.innerHTML = `
      <div class="text-center text-gray-400 text-sm py-4">
        No friends online
      </div>
    `;
    return;
  }

  onlineFriends.innerHTML = friends
    .slice(0, 5)
    .map(
      (friend) => `
    <div class="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
      <div class="relative">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          ${friend.profilePicture}
        </div>
        <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 truncate">${friend.fullName}</p>
        <p class="text-xs text-gray-500 truncate">Online</p>
      </div>
    </div>
  `
    )
    .join("");
}

// Setup event listeners
function setupEventListeners() {
  // Logout buttons
  const logoutBtn = document.getElementById("logout-btn");
  const mobileLogoutBtn = document.getElementById("mobile-logout-btn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  if (mobileLogoutBtn) {
    mobileLogoutBtn.addEventListener("click", handleLogout);
  }

  // Mobile menu
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMobileMenu = document.getElementById("close-mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("hidden");
    });
  }

  if (closeMobileMenu && mobileMenu) {
    closeMobileMenu.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  }

  // Close menu when clicking outside
  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.add("hidden");
      }
    });
  }

  // Create post modal
  const postInput = document.getElementById("post-input");
  const createPostModal = document.getElementById("create-post-modal");
  const closeModal = document.getElementById("close-modal");
  const postVisibility = document.getElementById("post-visibility");
  const customShareOptions = document.getElementById("custom-share-options");
  const submitPost = document.getElementById("submit-post");

  if (postInput && createPostModal) {
    postInput.addEventListener("click", () => {
      createPostModal.classList.remove("hidden");
      loadFriendsForCustomShare();
    });
  }

  if (closeModal && createPostModal) {
    closeModal.addEventListener("click", () => {
      createPostModal.classList.add("hidden");
      document.getElementById("post-content").value = "";
    });
  }

  // Close modal when clicking outside
  if (createPostModal) {
    createPostModal.addEventListener("click", (e) => {
      if (e.target === createPostModal) {
        createPostModal.classList.add("hidden");
        document.getElementById("post-content").value = "";
      }
    });
  }

  // Visibility change
  if (postVisibility && customShareOptions) {
    postVisibility.addEventListener("change", () => {
      if (postVisibility.value === "custom") {
        customShareOptions.classList.remove("hidden");
      } else {
        customShareOptions.classList.add("hidden");
      }
    });
  }

  // Submit post
  if (submitPost) {
    submitPost.addEventListener("click", handleCreatePost);
  }
}

// Load friends for custom share
function loadFriendsForCustomShare() {
  const friends = getUserFriends();
  const friendsListCheckbox = document.getElementById("friends-list-checkbox");

  if (!friendsListCheckbox) return;

  friendsListCheckbox.innerHTML = friends
    .map(
      (friend) => `
    <label class="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
      <input type="checkbox" value="${friend.id}" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
      <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
        ${friend.profilePicture}
      </div>
      <span class="text-sm text-gray-900">${friend.fullName}</span>
    </label>
  `
    )
    .join("");
}

// Handle creating new post
function handleCreatePost() {
  const content = document.getElementById("post-content").value.trim();
  const visibility = document.getElementById("post-visibility").value;

  if (!content) {
    alert("Please write something before posting!");
    return;
  }

  let sharedWith = [];
  if (visibility === "custom") {
    const checkboxes = document.querySelectorAll(
      "#friends-list-checkbox input[type='checkbox']:checked"
    );
    sharedWith = Array.from(checkboxes).map((cb) => parseInt(cb.value));

    if (sharedWith.length === 0) {
      alert("Please select at least one friend to share with!");
      return;
    }
  }

  // Create the post
  const newPost = createPost(content, null, visibility, sharedWith);

  if (newPost) {
    // Close modal
    document.getElementById("create-post-modal").classList.add("hidden");
    document.getElementById("post-content").value = "";

    // Show success message
    showSuccessMessage("Post created successfully!");

    // Reload feed
    setTimeout(() => {
      loadNewsFeed();
    }, 500);
  }
}

// Show success message
function showSuccessMessage(message) {
  const successDiv = document.createElement("div");
  successDiv.className =
    "fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-slide-in";
  successDiv.innerHTML = `
    <div class="flex items-center space-x-2">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
      </svg>
      <span>${message}</span>
    </div>
  `;

  document.body.appendChild(successDiv);

  setTimeout(() => {
    successDiv.remove();
  }, 3000);
}

// Handle logout
function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    logoutUser();
    window.location.href = "login.html";
  }
}
