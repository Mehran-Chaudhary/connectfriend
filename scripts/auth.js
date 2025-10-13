// Authentication Script

// Check if user is already logged in
if (isLoggedIn()) {
  window.location.href = "home.html";
}

// Get form elements
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const rememberMeCheckbox = document.getElementById("remember-me");
const togglePasswordBtn = document.getElementById("toggle-password");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");
const errorText = document.getElementById("error-text");

// Toggle password visibility
togglePasswordBtn.addEventListener("click", () => {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // Toggle eye icon
  const eyeIcon = document.getElementById("eye-icon");
  if (type === "password") {
    eyeIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
    `;
  } else {
    eyeIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
    `;
  }
});

// Function to fill credentials (for demo accounts)
window.fillCredentials = function (username, password) {
  usernameInput.value = username;
  passwordInput.value = password;
  usernameInput.focus();
};

// Function to show error message
function showError(message) {
  errorText.textContent = message;
  errorMessage.classList.remove("hidden");
  successMessage.classList.add("hidden");

  // Hide after 5 seconds
  setTimeout(() => {
    errorMessage.classList.add("hidden");
  }, 5000);
}

// Function to show success message
function showSuccess() {
  successMessage.classList.remove("hidden");
  errorMessage.classList.add("hidden");
}

// Handle form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  const rememberMe = rememberMeCheckbox.checked;

  // Validate inputs
  if (!username || !password) {
    showError("Please fill in all fields");
    return;
  }

  // Validate credentials
  const user = validateCredentials(username, password);

  if (user) {
    // Successful login
    showSuccess();

    // Set current user
    setCurrentUser(user);

    // Handle "Remember me"
    if (!rememberMe) {
      localStorage.removeItem("connecfriend_current_user");
    }

    // Redirect to home page after 1 second
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  } else {
    // Failed login
    showError("Invalid username or password. Please try again.");
    passwordInput.value = "";
    passwordInput.focus();
  }
});

// Auto-focus on username field
usernameInput.focus();

// Handle Enter key on inputs
[usernameInput, passwordInput].forEach((input) => {
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      loginForm.dispatchEvent(new Event("submit"));
    }
  });
});
