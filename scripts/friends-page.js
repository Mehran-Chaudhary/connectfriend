// Friends Page Script

document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in
  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  const fullUser = getUserById(currentUser.id);

  // Load friends
  loadAllFriends();

  // Update stats
  updateStats();

  // Setup event listeners
  setupEventListeners();
});

// Update stats
function updateStats() {
  const friends = getUserFriends();
  document.getElementById("all-friends-count").textContent = friends.length;
  document.getElementById("online-count").textContent = Math.min(
    friends.length,
    3
  ); // Simulate online friends
}

// Load all friends
function loadAllFriends() {
  const friends = getUserFriends();
  const friendsGrid = document.getElementById("friends-grid");

  if (friends.length === 0) {
    friendsGrid.innerHTML = `
      <div class="col-span-3 text-center py-16">
        <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">No Friends Yet</h3>
        <p class="text-gray-500 mb-6">Start connecting with people!</p>
        <button id="find-friends-empty" class="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
          Find Friends
        </button>
      </div>
    `;
    return;
  }

  friendsGrid.innerHTML = friends
    .map((friend) => createFriendCard(friend))
    .join("");

  // Attach rating listeners
  attachRatingListeners();
}

// Create friend card HTML
function createFriendCard(friend) {
  const rating = friend.rating;

  return `
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
      <!-- Friend Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
            ${friend.profilePicture}
          </div>
          <div>
            <h3 class="font-bold text-gray-900 text-lg">${friend.fullName}</h3>
            <p class="text-sm text-gray-500">@${friend.username}</p>
          </div>
        </div>
        
        <!-- Options Menu -->
        <div class="relative">
          <button class="text-gray-400 hover:text-gray-600 p-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
            </svg>
          </button>
        </div>
      </div>

      ${
        friend.location
          ? `<p class="text-sm text-gray-600 mb-2">📍 ${friend.location}</p>`
          : ""
      }
      ${
        friend.bio
          ? `<p class="text-sm text-gray-600 mb-4 line-clamp-2">${friend.bio}</p>`
          : ""
      }

      <!-- Rating Section -->
      <div class="mt-4 pt-4 border-t border-gray-200">
        <p class="text-xs font-semibold text-gray-700 mb-3">Rate this friend:</p>
        <div class="grid grid-cols-3 gap-2">
          ${createRatingButton(friend.id, FRIEND_RATINGS.STUPID, rating)}
          ${createRatingButton(friend.id, FRIEND_RATINGS.COOL, rating)}
          ${createRatingButton(friend.id, FRIEND_RATINGS.TRUSTWORTHY, rating)}
        </div>
        ${
          rating
            ? `<p class="text-xs text-gray-500 mt-3 text-center">
                <span class="${rating.textColor} font-semibold">${rating.emoji} ${rating.name}</span>
              </p>`
            : `<p class="text-xs text-gray-400 mt-3 text-center italic">Not rated yet</p>`
        }
      </div>

      <!-- Action Buttons -->
      <div class="grid grid-cols-2 gap-2 mt-4">
        <button class="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors">
          Message
        </button>
        <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
          Unfriend
        </button>
      </div>
    </div>
  `;
}

// Create rating button
function createRatingButton(friendId, rating, currentRating) {
  const isActive = currentRating && currentRating.id === rating.id;
  const activeClass = isActive
    ? `${rating.bgColor} ${rating.textColor} ring-2 ring-${rating.color}-400 scale-105`
    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50";

  return `
    <button 
      class="rating-btn px-3 py-3 rounded-xl ${activeClass} transition-all duration-200 text-center"
      data-friend-id="${friendId}"
      data-rating-id="${rating.id}"
      title="${rating.name}"
    >
      <span class="text-2xl block">${rating.emoji}</span>
      <span class="text-xs font-semibold block mt-1">${rating.name}</span>
    </button>
  `;
}

// Attach rating listeners
function attachRatingListeners() {
  const ratingButtons = document.querySelectorAll(".rating-btn");
  ratingButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const friendId = parseInt(this.getAttribute("data-friend-id"));
      const ratingId = parseInt(this.getAttribute("data-rating-id"));

      // Set the rating
      setFriendRating(friendId, ratingId);

      // Reload friends to update UI
      loadAllFriends();

      // Show success message
      showSuccessToast("Friend rated successfully!");
    });
  });
}

// Show success toast
function showSuccessToast(message) {
  const toast = document.createElement("div");
  toast.className =
    "fixed top-24 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-slide-in";
  toast.innerHTML = `
    <div class="flex items-center space-x-2">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
      </svg>
      <span>${message}</span>
    </div>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Setup event listeners
function setupEventListeners() {
  // Tab switching
  const tabAllFriends = document.getElementById("tab-all-friends");
  const tabRequests = document.getElementById("tab-requests");
  const tabSuggestions = document.getElementById("tab-suggestions");

  const allFriendsSection = document.getElementById("all-friends-section");
  const requestsSection = document.getElementById("requests-section");
  const suggestionsSection = document.getElementById("suggestions-section");

  tabAllFriends.addEventListener("click", () => {
    switchTab(tabAllFriends, allFriendsSection);
  });

  tabRequests.addEventListener("click", () => {
    switchTab(tabRequests, requestsSection);
  });

  tabSuggestions.addEventListener("click", () => {
    switchTab(tabSuggestions, suggestionsSection);
  });

  // Logout
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

  // Search friends
  const searchInput = document.getElementById("search-friends");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      filterFriends(e.target.value);
    });
  }
}

// Switch between tabs
function switchTab(activeTab, activeSection) {
  // Remove active state from all tabs
  document.querySelectorAll(".tab-btn").forEach((tab) => {
    tab.classList.remove("text-blue-600", "border-blue-600");
    tab.classList.add("text-gray-600", "border-transparent");
  });

  // Add active state to clicked tab
  activeTab.classList.remove("text-gray-600", "border-transparent");
  activeTab.classList.add("text-blue-600", "border-blue-600");

  // Hide all sections
  document.getElementById("all-friends-section").classList.add("hidden");
  document.getElementById("requests-section").classList.add("hidden");
  document.getElementById("suggestions-section").classList.add("hidden");

  // Show active section
  activeSection.classList.remove("hidden");
}

// Filter friends by search
function filterFriends(query) {
  const friends = getUserFriends();
  const filtered = friends.filter(
    (friend) =>
      friend.fullName.toLowerCase().includes(query.toLowerCase()) ||
      friend.username.toLowerCase().includes(query.toLowerCase())
  );

  const friendsGrid = document.getElementById("friends-grid");

  if (filtered.length === 0) {
    friendsGrid.innerHTML = `
      <div class="col-span-3 text-center py-12">
        <p class="text-gray-500">No friends found matching "${query}"</p>
      </div>
    `;
    return;
  }

  friendsGrid.innerHTML = filtered
    .map((friend) => createFriendCard(friend))
    .join("");

  attachRatingListeners();
}

// Handle logout
function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    logoutUser();
    window.location.href = "login.html";
  }
}
