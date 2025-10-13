# ConnecFriend - Project Architecture & Planning

## 📊 Project Phases

### Phase 1: Landing Page ✅ COMPLETED
**Status**: Done  
**Files Created**:
- `index.html` - Main landing page
- `styles/landing.css` - Custom animations and styles
- `scripts/landing.js` - Interactive functionality
- `login.html` - Placeholder for next phase

**Features Implemented**:
- ✅ Floating navbar with responsive design
- ✅ Hero section with CTA and statistics
- ✅ Features showcase (6 features)
- ✅ How It Works (4 steps)
- ✅ Community section
- ✅ Testimonials (3 reviews)
- ✅ Footer with navigation
- ✅ Mobile responsive
- ✅ Smooth scroll
- ✅ Custom animations

---

### Phase 2: Authentication System 🔄 NEXT
**Files to Create**:
- `login.html` - Login page (replace placeholder)
- `styles/auth.css` - Authentication styling
- `scripts/auth.js` - Login functionality
- `data/users.js` - Mock user data

**Features to Implement**:
- Login form (username/password)
- Form validation
- Error handling
- Session simulation (localStorage)
- Redirect to home after login
- "Remember me" functionality

**Design Considerations**:
- Consistent branding with landing page
- Secure-looking UI elements
- Clear error messages
- Accessible form inputs

---

### Phase 3: Profile Page 📋 PLANNED
**Files to Create**:
- `profile.html` - User profile page
- `styles/profile.css` - Profile styling
- `scripts/profile.js` - Profile interactions
- `components/friend-card.html` - Friend list component

**Features to Implement**:
- Profile information display
- Profile picture
- Personal details section
- Friends list with ratings
- Edit profile capability
- Friend rating system (Stupid/Cool/Trustworthy)

---

### Phase 4: Home/News Feed 📰 PLANNED
**Files to Create**:
- `home.html` - Main dashboard/feed
- `styles/feed.css` - Feed styling
- `scripts/feed.js` - Feed functionality
- `components/post-card.html` - Individual post
- `components/sidebar.html` - Navigation sidebar

**Features to Implement**:
- Dynamic news feed
- Post display with engagement counts
- Like/Dislike functionality
- Friend activity ordering (by login time)
- Post filtering options
- Real-time updates simulation

---

### Phase 5: Friend Management 👥 PLANNED
**Files to Create**:
- `friends.html` - Friend management page
- `styles/friends.css` - Friend list styling
- `scripts/friends.js` - Friend operations
- `components/friend-request.html` - Request card

**Features to Implement**:
- Send friend requests
- Accept/reject requests
- Ignore list functionality
- Friend rating system
- Remove friends
- Block users

---

### Phase 6: Post Creation & Sharing 📝 PLANNED
**Files to Create**:
- `components/create-post.html` - Post creation modal
- `styles/create-post.css` - Post creation styling
- `scripts/create-post.js` - Post functionality

**Features to Implement**:
- Create new posts
- Text content
- Image attachments (simulated)
- Selective sharing (all friends vs specific)
- Privacy controls
- Post preview

---

### Phase 7: Messaging System 💬 PLANNED
**Files to Create**:
- `messages.html` - Messaging interface
- `styles/messages.css` - Chat styling
- `scripts/messages.js` - Messaging functionality
- `components/chat-window.html` - Chat component
- `components/message-bubble.html` - Message component

**Features to Implement**:
- Private messaging
- Message to anyone (not just friends)
- Conversation list
- Chat interface
- Message status
- Typing indicators (simulated)

---

## 🏗️ Component Architecture

### Shared Components (To Be Created)
```
components/
├── navbar.html           # Global navigation
├── sidebar.html          # Dashboard sidebar
├── post-card.html        # Reusable post component
├── friend-card.html      # Friend list item
├── message-bubble.html   # Chat message
├── modal.html            # Generic modal
└── notification.html     # Notification component
```

### Shared Styles
```
styles/
├── landing.css          # ✅ Landing page
├── auth.css             # Authentication pages
├── global.css           # Global styles & utilities
├── components.css       # Shared component styles
├── profile.css          # Profile pages
├── feed.css             # News feed
├── friends.css          # Friend management
├── messages.css         # Messaging system
└── create-post.css      # Post creation
```

### Shared Scripts
```
scripts/
├── landing.js           # ✅ Landing page
├── auth.js              # Authentication
├── utils.js             # Utility functions
├── state.js             # State management
├── profile.js           # Profile functionality
├── feed.js              # Feed functionality
├── friends.js           # Friend operations
├── messages.js          # Messaging
└── create-post.js       # Post creation
```

### Mock Data
```
data/
├── users.js             # User profiles
├── posts.js             # Sample posts
├── friends.js           # Friend relationships
├── messages.js          # Chat messages
└── ratings.js           # Friend ratings
```

---

## 🎨 Design System

### Color Palette
```
Primary: #1877F2 (Blue)
Secondary: #8B5CF6 (Purple)
Success: #10B981 (Green)
Warning: #F59E0B (Orange)
Danger: #EF4444 (Red)
Gray-50: #F9FAFB
Gray-100: #F3F4F6
Gray-900: #111827
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold (700-900)
- **Body**: Regular (400)
- **Buttons**: Semibold (600)

### Spacing Scale (Tailwind)
- xs: 0.5rem (8px)
- sm: 1rem (16px)
- md: 1.5rem (24px)
- lg: 2rem (32px)
- xl: 3rem (48px)

### Border Radius
- Small: 0.5rem (8px)
- Medium: 1rem (16px)
- Large: 1.5rem (24px)
- XLarge: 2rem (32px)

---

## 🔄 Data Flow (Frontend Only)

### State Management Strategy
Using **localStorage** for persistence:
```javascript
// User session
localStorage.setItem('currentUser', JSON.stringify(user));

// Posts
localStorage.setItem('posts', JSON.stringify(posts));

// Friends
localStorage.setItem('friends', JSON.stringify(friends));

// Messages
localStorage.setItem('messages', JSON.stringify(messages));
```

### Event Flow
1. User action → JavaScript event listener
2. Update localStorage
3. Re-render affected components
4. Update UI

---

## 🚀 Feature Specifications

### Friend Rating System
**Ratings**:
- **Stupid** (1) - 😜 Icon: Goofy face
- **Cool** (2) - 😎 Icon: Sunglasses face
- **Trustworthy** (3) - 🤝 Icon: Handshake

**Implementation**:
- Click icon to rate
- Visual feedback on selection
- Store in localStorage
- Display in friend list

### Post Engagement
**Metrics**:
- Like count
- Dislike count
- Comment count (future)
- Share count (future)

**Rules**:
- One reaction per user per post
- Real-time count updates
- Visual state for user's reaction

### Privacy Controls
**Sharing Options**:
- Public (all friends)
- Custom (select specific friends)
- Private (only me)

**Ignore List**:
- Cannot send friend request to ignored users
- Cannot see ignored users in search
- Can manage ignore list

---

## 📱 Responsive Breakpoints

```
sm:  640px  - Small devices
md:  768px  - Tablets
lg:  1024px - Laptops
xl:  1280px - Desktops
2xl: 1536px - Large screens
```

---

## ✅ Testing Checklist (Per Phase)

- [ ] Desktop view (1920x1080)
- [ ] Tablet view (768x1024)
- [ ] Mobile view (375x667)
- [ ] Navigation works
- [ ] Forms validate correctly
- [ ] LocalStorage persists
- [ ] Smooth animations
- [ ] No console errors
- [ ] Accessible (keyboard navigation)
- [ ] Cross-browser (Chrome, Firefox, Safari)

---

## 🎯 Next Immediate Steps

1. **Build Login Page**
   - Design login form
   - Add validation
   - Implement mock authentication
   - Create session management

2. **Create Mock Data**
   - Sample users
   - User credentials
   - Profile information

3. **Build Profile Page**
   - Layout design
   - Friends list display
   - Rating system UI

---

**Current Status**: Phase 1 Complete ✅  
**Next Phase**: Phase 2 - Authentication System

