// Messages Page Script

let currentChatUser = null;

document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in
  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  // Load conversations
  loadConversations();

  // Update unread count
  updateUnreadCount();

  // Setup event listeners
  setupEventListeners();
});

// Load all conversations
function loadConversations() {
  const conversations = getConversations();
  const conversationsList = document.getElementById("conversations-list");
  const allUsers = getAllUsers();

  if (conversations.length === 0) {
    conversationsList.innerHTML = `
      <div class="text-center py-12 px-4">
        <p class="text-gray-500 mb-4">No conversations yet</p>
        <button id="start-conversation" class="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Start a Conversation
        </button>
      </div>
    `;
    return;
  }

  conversationsList.innerHTML = conversations
    .map((conv) => {
      const participant = allUsers.find((u) => u.id === conv.participantId);
      if (!participant) return "";

      const alias = participant.alias || participant.profilePicture;
      const isImageUrl =
        participant.profilePicture &&
        participant.profilePicture.startsWith("http");
      const avatarHTML = isImageUrl
        ? `<img src="${participant.profilePicture}" alt="${participant.fullName}" class="w-full h-full object-cover rounded-full" />`
        : alias;

      return `
      <div 
        class="conversation-item p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
        data-user-id="${participant.id}"
      >
        <div class="flex items-center space-x-3">
          <div class="relative">
            <div class="w-14 h-14 ${
              isImageUrl ? "" : "bg-gradient-to-br from-blue-500 to-purple-500"
            } rounded-full flex items-center justify-center text-white text-lg font-bold overflow-hidden">
              ${avatarHTML}
            </div>
            ${
              conv.unreadCount > 0
                ? `<span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">${conv.unreadCount}</span>`
                : ""
            }
          </div>
          
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <h3 class="font-semibold text-gray-900 truncate">${
                participant.fullName
              }</h3>
              <span class="text-xs text-gray-500">${formatMessageTime(
                conv.lastMessageTime
              )}</span>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-sm text-gray-600 truncate ${
                conv.unreadCount > 0 ? "font-semibold" : ""
              }">
                ${
                  conv.isTyping
                    ? '<span class="text-blue-600">typing...</span>'
                    : conv.lastMessage
                }
              </p>
              ${
                conv.unreadCount > 0
                  ? `<span class="w-2 h-2 bg-blue-600 rounded-full ml-2"></span>`
                  : ""
              }
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  // Attach click listeners
  attachConversationListeners();
}

// Attach conversation click listeners
function attachConversationListeners() {
  document.querySelectorAll(".conversation-item").forEach((item) => {
    item.addEventListener("click", function () {
      const userId = parseInt(this.getAttribute("data-user-id"));
      openChat(userId);
    });
  });
}

// Open chat with a user
function openChat(userId) {
  const user = getUserById(userId);
  if (!user) return;

  currentChatUser = user;

  const alias = user.alias || user.profilePicture;
  const isImageUrl =
    user.profilePicture && user.profilePicture.startsWith("http");

  // Update chat header
  const chatAvatar = document.getElementById("chat-avatar");
  if (chatAvatar) {
    if (isImageUrl) {
      chatAvatar.innerHTML = `<img src="${user.profilePicture}" alt="${user.fullName}" class="w-full h-full object-cover rounded-full" />`;
      chatAvatar.classList.remove(
        "bg-gradient-to-br",
        "from-blue-500",
        "to-purple-500"
      );
    } else {
      chatAvatar.textContent = alias;
      chatAvatar.classList.add(
        "bg-gradient-to-br",
        "from-blue-500",
        "to-purple-500"
      );
    }
  }

  document.getElementById("chat-name").textContent = user.fullName;
  document.getElementById("chat-status").textContent = "Active now";

  // Show chat window
  document.getElementById("chat-window").classList.remove("hidden");
  document.getElementById("chat-window").classList.add("flex");

  // Show message input
  document.getElementById("message-input-container").classList.remove("hidden");

  // Load messages
  loadMessages(userId);

  // Mark as read
  markAsRead(userId);

  // Update unread count
  updateUnreadCount();

  // Reload conversations to update UI
  loadConversations();
}

// Load messages for a conversation
function loadMessages(userId) {
  const currentUser = getCurrentUser();
  const messages = getMessages(userId);
  const messagesArea = document.getElementById("messages-area");

  if (messages.length === 0) {
    messagesArea.innerHTML = `
      <div class="h-full flex items-center justify-center">
        <div class="text-center">
          <p class="text-gray-500 mb-4">No messages yet</p>
          <p class="text-sm text-gray-400">Start the conversation!</p>
        </div>
      </div>
    `;
    return;
  }

  messagesArea.innerHTML = `
    <div class="space-y-4">
      ${messages
        .map((msg) => {
          const isSent = msg.senderId === currentUser.id;
          const sender = getUserById(msg.senderId);
          const senderAlias = sender?.alias || sender?.profilePicture || "--";
          const senderIsImageUrl =
            sender?.profilePicture && sender.profilePicture.startsWith("http");
          const senderAvatarHTML = senderIsImageUrl
            ? `<img src="${sender.profilePicture}" alt="${sender.fullName}" class="w-full h-full object-cover rounded-full" />`
            : senderAlias;

          return `
          <div class="flex ${isSent ? "justify-end" : "justify-start"}">
            <div class="flex items-end space-x-2 max-w-md ${
              isSent ? "flex-row-reverse space-x-reverse" : ""
            }">
              ${
                !isSent
                  ? `<div class="w-8 h-8 ${
                      senderIsImageUrl
                        ? ""
                        : "bg-gradient-to-br from-blue-500 to-purple-500"
                    } rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 overflow-hidden">
                      ${senderAvatarHTML}
                    </div>`
                  : ""
              }
              <div>
                <div class="px-4 py-2 rounded-2xl ${
                  isSent
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-200 text-gray-900"
                } ${isSent ? "rounded-br-sm" : "rounded-bl-sm"}">
                  <p class="text-sm">${msg.content}</p>
                </div>
                <p class="text-xs text-gray-400 mt-1 ${
                  isSent ? "text-right" : "text-left"
                }">
                  ${formatChatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          </div>
        `;
        })
        .join("")}
    </div>
  `;

  // Scroll to bottom
  messagesArea.scrollTop = messagesArea.scrollHeight;
}

// Update unread count
function updateUnreadCount() {
  const count = getTotalUnreadCount();
  const badge = document.getElementById("sidebar-unread");
  if (badge) {
    badge.textContent = count;
    if (count === 0) {
      badge.classList.add("hidden");
    } else {
      badge.classList.remove("hidden");
    }
  }
}

// Setup event listeners
function setupEventListeners() {
  // Send message
  const sendBtn = document.getElementById("send-message-btn");
  const messageInput = document.getElementById("message-input");

  if (sendBtn && messageInput) {
    sendBtn.addEventListener("click", handleSendMessage);

    messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSendMessage();
      }
    });
  }

  // New message button
  const newMessageBtn = document.getElementById("new-message-btn");
  const newMessageModal = document.getElementById("new-message-modal");
  const closeNewMessage = document.getElementById("close-new-message");

  if (newMessageBtn && newMessageModal) {
    newMessageBtn.addEventListener("click", () => {
      newMessageModal.classList.remove("hidden");
      loadPeopleList();
    });
  }

  if (closeNewMessage && newMessageModal) {
    closeNewMessage.addEventListener("click", () => {
      newMessageModal.classList.add("hidden");
    });

    newMessageModal.addEventListener("click", (e) => {
      if (e.target === newMessageModal) {
        newMessageModal.classList.add("hidden");
      }
    });
  }

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

  // Search people
  const searchPeople = document.getElementById("search-people");
  if (searchPeople) {
    searchPeople.addEventListener("input", (e) => {
      filterPeopleList(e.target.value);
    });
  }
}

// Handle sending message
function handleSendMessage() {
  const messageInput = document.getElementById("message-input");
  const content = messageInput.value.trim();

  if (!content || !currentChatUser) return;

  // Send the message
  sendMessage(currentChatUser.id, content);

  // Clear input
  messageInput.value = "";

  // Reload messages
  loadMessages(currentChatUser.id);

  // Reload conversations
  loadConversations();

  // Focus back on input
  messageInput.focus();
}

// Load people list for new message
function loadPeopleList() {
  const currentUser = getCurrentUser();
  const allUsers = getAllUsers().filter((u) => u.id !== currentUser.id);
  const peopleList = document.getElementById("people-list");

  peopleList.innerHTML = allUsers
    .map((user) => {
      const alias = user.alias || user.profilePicture;
      const isImageUrl =
        user.profilePicture && user.profilePicture.startsWith("http");
      const avatarHTML = isImageUrl
        ? `<img src="${user.profilePicture}" alt="${user.fullName}" class="w-full h-full object-cover rounded-full" />`
        : alias;

      return `
    <div 
      class="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors person-item"
      data-user-id="${user.id}"
    >
      <div class="w-12 h-12 ${
        isImageUrl ? "" : "bg-gradient-to-br from-blue-500 to-purple-500"
      } rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
        ${avatarHTML}
      </div>
      <div>
        <p class="font-semibold text-gray-900">${user.fullName}</p>
        <p class="text-sm text-gray-500">@${user.username}</p>
      </div>
    </div>
  `;
    })
    .join("");

  // Attach listeners
  document.querySelectorAll(".person-item").forEach((item) => {
    item.addEventListener("click", function () {
      const userId = parseInt(this.getAttribute("data-user-id"));
      document.getElementById("new-message-modal").classList.add("hidden");
      openChat(userId);
    });
  });
}

// Filter people list
function filterPeopleList(query) {
  const currentUser = getCurrentUser();
  const allUsers = getAllUsers().filter((u) => u.id !== currentUser.id);
  const filtered = allUsers.filter(
    (user) =>
      user.fullName.toLowerCase().includes(query.toLowerCase()) ||
      user.username.toLowerCase().includes(query.toLowerCase())
  );

  const peopleList = document.getElementById("people-list");

  if (filtered.length === 0) {
    peopleList.innerHTML = `
      <div class="text-center py-8">
        <p class="text-gray-500">No users found</p>
      </div>
    `;
    return;
  }

  peopleList.innerHTML = filtered
    .map((user) => {
      const alias = user.alias || user.profilePicture;
      const isImageUrl =
        user.profilePicture && user.profilePicture.startsWith("http");
      const avatarHTML = isImageUrl
        ? `<img src="${user.profilePicture}" alt="${user.fullName}" class="w-full h-full object-cover rounded-full" />`
        : alias;

      return `
    <div 
      class="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors person-item"
      data-user-id="${user.id}"
    >
      <div class="w-12 h-12 ${
        isImageUrl ? "" : "bg-gradient-to-br from-blue-500 to-purple-500"
      } rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
        ${avatarHTML}
      </div>
      <div>
        <p class="font-semibold text-gray-900">${user.fullName}</p>
        <p class="text-sm text-gray-500">@${user.username}</p>
      </div>
    </div>
  `;
    })
    .join("");

  // Reattach listeners
  document.querySelectorAll(".person-item").forEach((item) => {
    item.addEventListener("click", function () {
      const userId = parseInt(this.getAttribute("data-user-id"));
      document.getElementById("new-message-modal").classList.add("hidden");
      openChat(userId);
    });
  });
}

// Handle logout
function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    logoutUser();
    window.location.href = "login.html";
  }
}
