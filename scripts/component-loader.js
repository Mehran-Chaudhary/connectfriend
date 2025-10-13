// Component Loader - Loads HTML components dynamically

async function loadComponent(containerId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error(
        `Failed to load ${componentPath}: ${response.statusText}`
      );
    }
    const html = await response.text();
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = html;
    } else {
      console.warn(`Container #${containerId} not found`);
    }
  } catch (error) {
    console.error(`Error loading component ${componentPath}:`, error);
  }
}

// Load all components when DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
  // Load components in parallel for better performance
  await Promise.all([
    loadComponent("navbar-container", "components/navbar.html"),
    loadComponent("hero-container", "components/hero.html"),
    loadComponent("features-container", "components/features.html"),
    loadComponent("footer-container", "components/footer.html"),
  ]);

  // After components are loaded, initialize navbar functionality
  // The navbar.js script will handle its own initialization
  console.log("All components loaded successfully!");
});
