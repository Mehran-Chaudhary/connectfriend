// Profile Page Script

document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in
  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  // Get full user data
  const fullUser = getUserById(currentUser.id);

  // Display user profile information
  displayUserProfile(fullUser);

  // Load and display friends
  loadFriends();

  // Setup event listeners
  setupEventListeners();
});

// Display user profile
function displayUserProfile(user) {
  document.getElementById("profile-avatar").textContent = user.profilePicture;
  document.getElementById("profile-name").textContent = user.fullName;
  document.getElementById("profile-username").textContent = `@${user.username}`;
  document.getElementById("profile-email").textContent = user.email;
  document.getElementById("profile-location").textContent = user.location;
  document.getElementById("profile-joined").textContent = user.joined;
  document.getElementById("profile-bio").textContent = user.bio;
  document.getElementById("posts-count").textContent = user.posts;
  document.getElementById("friends-count").textContent = user.friendsCount;
}

// Load and display friends
function loadFriends() {
  const friends = getUserFriends();
  const friendsList = document.getElementById("friends-list");
  const friendCount = document.getElementById("friend-list-count");

  friendCount.textContent = `${friends.length} friend${
    friends.length !== 1 ? "s" : ""
  }`;

  if (friends.length === 0) {
    friendsList.innerHTML = `
      <div class="col-span-2 text-center py-12">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <p class="text-gray-500 text-lg">No friends yet</p>
        <p class="text-gray-400 text-sm mt-2">Start connecting with people!</p>
      </div>
    `;
    return;
  }

  friendsList.innerHTML = friends
    .map(
      (friend) => `
    <div class="friend-card bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
      <div class="flex items-start justify-between">
        <div class="flex items-center space-x-3 flex-1">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
            ${friend.profilePicture}
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 truncate">${
              friend.fullName
            }</h3>
            <p class="text-sm text-gray-500 truncate">@${friend.username}</p>
            ${
              friend.location
                ? `<p class="text-xs text-gray-400 mt-1 truncate">📍 ${friend.location}</p>`
                : ""
            }
          </div>
        </div>
      </div>

      ${
        friend.bio
          ? `<p class="text-sm text-gray-600 mt-3 line-clamp-2">${friend.bio}</p>`
          : ""
      }

      <!-- Rating Buttons -->
      <div class="mt-4 pt-4 border-t border-gray-200">
        <p class="text-xs text-gray-500 mb-2">Rate this friend:</p>
        <div class="flex items-center space-x-2">
          ${createRatingButton(friend.id, FRIEND_RATINGS.STUPID, friend.rating)}
          ${createRatingButton(friend.id, FRIEND_RATINGS.COOL, friend.rating)}
          ${createRatingButton(
            friend.id,
            FRIEND_RATINGS.TRUSTWORTHY,
            friend.rating
          )}
        </div>
        ${
          friend.rating
            ? `<p class="text-xs text-gray-500 mt-2">Current: <span class="${friend.rating.textColor} font-semibold">${friend.rating.emoji} ${friend.rating.name}</span></p>`
            : `<p class="text-xs text-gray-400 mt-2 italic">Not rated yet</p>`
        }
      </div>
    </div>
  `
    )
    .join("");

  // Add event listeners to rating buttons
  attachRatingListeners();
}

// Create rating button HTML
function createRatingButton(friendId, rating, currentRating) {
  const isActive = currentRating && currentRating.id === rating.id;
  const activeClass = isActive
    ? `${rating.bgColor} ${rating.textColor} ring-2 ring-offset-1 ring-${rating.color}-400`
    : "bg-white text-gray-400 hover:bg-gray-100";

  return `
    <button 
      class="rating-btn flex-1 px-3 py-2 rounded-lg border border-gray-200 ${activeClass} transition-all duration-200 text-center"
      data-friend-id="${friendId}"
      data-rating-id="${rating.id}"
      title="${rating.name}"
    >
      <span class="text-xl">${rating.emoji}</span>
      <span class="block text-xs font-medium mt-1">${rating.name}</span>
    </button>
  `;
}

// Attach rating button listeners
function attachRatingListeners() {
  const ratingButtons = document.querySelectorAll(".rating-btn");
  ratingButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const friendId = parseInt(this.getAttribute("data-friend-id"));
      const ratingId = parseInt(this.getAttribute("data-rating-id"));

      // Set the rating
      setFriendRating(friendId, ratingId);

      // Reload friends to update UI
      loadFriends();

      // Show feedback
      showRatingFeedback(this);
    });
  });
}

// Show rating feedback animation
function showRatingFeedback(button) {
  button.classList.add("scale-110");
  setTimeout(() => {
    button.classList.remove("scale-110");
  }, 200);
}

// Setup event listeners
function setupEventListeners() {
  // Logout button (desktop)
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  // Logout button (mobile)
  const mobileLogoutBtn = document.getElementById("mobile-logout-btn");
  if (mobileLogoutBtn) {
    mobileLogoutBtn.addEventListener("click", handleLogout);
  }

  // Mobile menu toggle
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
}

// Handle logout
function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    logoutUser();
    window.location.href = "login.html";
  }
}
