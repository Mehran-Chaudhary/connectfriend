// Messages Data & Management

// Sample conversations and messages
const SAMPLE_CONVERSATIONS = [
  {
    id: 1,
    participantId: 2, // Fatima Zahra
    lastMessage: "That sounds great! Let's schedule it for next week.",
    lastMessageTime: new Date(Date.now() - 300000).toISOString(), // 5 min ago
    unreadCount: 2,
    isTyping: false,
  },
  {
    id: 2,
    participantId: 3, // Abdullah Rahman
    lastMessage: "Thanks for the workout tips!",
    lastMessageTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    unreadCount: 0,
    isTyping: false,
  },
  {
    id: 3,
    participantId: 4, // Aisha Malik
    lastMessage: "Love the new design work!",
    lastMessageTime: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    unreadCount: 1,
    isTyping: true,
  },
  {
    id: 4,
    participantId: 5, // Omar Hassan
    lastMessage: "When is the next video coming out?",
    lastMessageTime: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    unreadCount: 0,
    isTyping: false,
  },
  {
    id: 5,
    participantId: 8, // Hamza Sheikh
    lastMessage: "The photography session was amazing!",
    lastMessageTime: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    unreadCount: 0,
    isTyping: false,
  },
];

const SAMPLE_MESSAGES = {
  2: [
    // Conversation with Fatima Zahra
    {
      id: 1,
      senderId: 1,
      receiverId: 2,
      content: "Hey Fatima! How's the marketing campaign going?",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true,
    },
    {
      id: 2,
      senderId: 2,
      receiverId: 1,
      content: "Hi Mehran! It's going really well, thanks for asking!",
      timestamp: new Date(Date.now() - 7000000).toISOString(),
      read: true,
    },
    {
      id: 3,
      senderId: 1,
      receiverId: 2,
      content: "Would love to collaborate on a tech project sometime",
      timestamp: new Date(Date.now() - 6800000).toISOString(),
      read: true,
    },
    {
      id: 4,
      senderId: 2,
      receiverId: 1,
      content: "That sounds great! Let's schedule it for next week.",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      read: false,
    },
    {
      id: 5,
      senderId: 2,
      receiverId: 1,
      content: "How about Tuesday afternoon?",
      timestamp: new Date(Date.now() - 240000).toISOString(),
      read: false,
    },
  ],
  3: [
    // Conversation with Abdullah Rahman
    {
      id: 6,
      senderId: 1,
      receiverId: 3,
      content: "Hey Abdullah! Can you share that workout routine?",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true,
    },
    {
      id: 7,
      senderId: 3,
      receiverId: 1,
      content: "Sure! I'll send it over in a bit",
      timestamp: new Date(Date.now() - 5400000).toISOString(),
      read: true,
    },
    {
      id: 8,
      senderId: 1,
      receiverId: 3,
      content: "Thanks for the workout tips!",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: true,
    },
  ],
  4: [
    // Conversation with Aisha Malik
    {
      id: 9,
      senderId: 4,
      receiverId: 1,
      content: "Check out this new design I made for the client!",
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      read: true,
    },
    {
      id: 10,
      senderId: 1,
      receiverId: 4,
      content: "Love the new design work!",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true,
    },
  ],
  5: [
    // Conversation with Omar Hassan
    {
      id: 11,
      senderId: 5,
      receiverId: 1,
      content: "When is the next video coming out?",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true,
    },
  ],
  8: [
    // Conversation with Hamza Sheikh
    {
      id: 12,
      senderId: 8,
      receiverId: 1,
      content: "The photography session was amazing!",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      read: true,
    },
  ],
};

// Initialize messages in localStorage
function initializeMessages() {
  if (!localStorage.getItem("connecfriend_conversations")) {
    localStorage.setItem(
      "connecfriend_conversations",
      JSON.stringify(SAMPLE_CONVERSATIONS)
    );
  }
  if (!localStorage.getItem("connecfriend_messages")) {
    localStorage.setItem(
      "connecfriend_messages",
      JSON.stringify(SAMPLE_MESSAGES)
    );
  }
  console.log("Messages initialized");
}

// Get all conversations for current user
function getConversations() {
  const conversations = localStorage.getItem("connecfriend_conversations");
  return conversations ? JSON.parse(conversations) : SAMPLE_CONVERSATIONS;
}

// Get messages for a specific conversation
function getMessages(participantId) {
  const allMessages = localStorage.getItem("connecfriend_messages");
  const messages = allMessages ? JSON.parse(allMessages) : SAMPLE_MESSAGES;
  return messages[participantId] || [];
}

// Send a message
function sendMessage(receiverId, content) {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  const allMessages = localStorage.getItem("connecfriend_messages");
  const messages = allMessages ? JSON.parse(allMessages) : SAMPLE_MESSAGES;

  if (!messages[receiverId]) {
    messages[receiverId] = [];
  }

  const newMessage = {
    id: Date.now(),
    senderId: currentUser.id,
    receiverId: receiverId,
    content: content,
    timestamp: new Date().toISOString(),
    read: false,
  };

  messages[receiverId].push(newMessage);
  localStorage.setItem("connecfriend_messages", JSON.stringify(messages));

  // Update conversation
  updateConversation(receiverId, content);

  return newMessage;
}

// Update conversation with new message
function updateConversation(participantId, lastMessage) {
  const conversations = getConversations();
  const existingConv = conversations.find(
    (c) => c.participantId === participantId
  );

  if (existingConv) {
    existingConv.lastMessage = lastMessage;
    existingConv.lastMessageTime = new Date().toISOString();
  } else {
    conversations.push({
      id: conversations.length + 1,
      participantId: participantId,
      lastMessage: lastMessage,
      lastMessageTime: new Date().toISOString(),
      unreadCount: 0,
      isTyping: false,
    });
  }

  localStorage.setItem(
    "connecfriend_conversations",
    JSON.stringify(conversations)
  );
}

// Get total unread count
function getTotalUnreadCount() {
  const conversations = getConversations();
  return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
}

// Mark conversation as read
function markAsRead(participantId) {
  const conversations = getConversations();
  const conv = conversations.find((c) => c.participantId === participantId);
  if (conv) {
    conv.unreadCount = 0;
    localStorage.setItem(
      "connecfriend_conversations",
      JSON.stringify(conversations)
    );
  }
}

// Format message time
function formatMessageTime(timestamp) {
  const now = new Date();
  const messageDate = new Date(timestamp);
  const diffMs = now - messageDate;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d`;

  return messageDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// Format chat timestamp
function formatChatTime(timestamp) {
  const messageDate = new Date(timestamp);
  return messageDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// Initialize messages
initializeMessages();

console.log("Messages.js loaded successfully");
