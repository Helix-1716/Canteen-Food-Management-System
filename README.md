# 🍔 Smart Canteen Management System

A modern, fast, and fully responsive food ordering web application designed for university/office canteens. Built with **pure HTML, CSS, and Vanilla JavaScript**, it provides a seamless "Swiggy-like" experience for students, a powerful management dashboard for admins, and a live order-tracking panel for kitchen staff.

---

## ✨ Features

### 👨‍🎓 For Students
- **Interactive Food Menu:** Browse categories (Breakfast, Lunch, Snacks, Drinks).
- **Smart Search & Filters:** Quickly find your favorite dishes.
- **Dynamic Shopping Cart:** Add items, modify quantities, and see real-time pricing.
- **Instant Ordering:** Generates a unique secure `#TOKEN` number for easy pickup.
- **Favorites & Dark Mode:** Save top picks and switch seamlessly to an elegant dark theme.

### 👨‍🍳 For Kitchen Staff
- **Live Order Queue:** Auto-updating dashboard of incoming orders.
- **Status Management:** Mark orders as "Preparing", "Ready", and "Handed Over".

### 👨‍💻 For Administrators
- **Inventory Management:** Activate/Deactivate availability of food items.
- **Data Tables:** View live metrics of total orders and active menu items.
- **Delete Items:** Easily remove discontinued items with a single click.

---

## 🛠️ Tech Stack Included
- **Core:** HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Storage:** LocalStorage API (Simulated Backend & Session Management).
- **Styling:** Custom Vanilla CSS with layout utilities and CSS Variables.
- **Icons & Typography:** FontAwesome 6 icons and Google 'Outfit' font.

---

## 📂 Project Structure

```text
canteen-system/
├── css/
│   └── style.css            # Centralized styles (Variables, Themes, Responsive Layouts)
├── js/
│   └── script.js            # Core Logic, DOM Manipulation, LocalStorage Management
├── index.html               # Landing Page with Hero section
├── login.html               # Role-based secure-feel login system
├── student-dashboard.html   # Food catalog and shopping cart frontend
├── admin-dashboard.html     # Inventory and analytics dashboard
└── kitchen-panel.html       # Live orders tracking system
```

## 🚀 Getting Started

**Option 1: Live Preview (If hosted via GitHub Pages)**
Visit the live site: [Smart Canteen Management System](https://Helix-1716.github.io/Canteen-Food-Management-System/)
*(Assuming GitHub Pages is enabled for the `main` branch)*

**Option 2: Run Local**
1. Clone the repository: 
   ```bash
   git clone https://github.com/Helix-1716/Canteen-Food-Management-System.git
   ```
2. Open the directory:
   ```bash
   cd Canteen-Food-Management-System/canteen-system
   ```
3. Launch `index.html` in any modern web browser. 
*(No npm, no backend servers, or build steps required!)*

## 💡 How to Test the Flow
1. Start at the **Landing Page** and click **Login**.
2. Role Simulation: To test different views, simply select the desired role (`Student`, `Admin`, or `Kitchen`) from the dropdown and click Sign In.
3. Order test: Add items on the Student Dashboard, complete the checkout to get a token `#xxx`.
4. Fulfillment: Log out, log back in as `Kitchen Staff`, and mark your newly created order as "Ready".

## 🎨 UI/UX Design Approach
Designed to feel like a premium startup product (akin to Swiggy/Zomato):
- Modern Card Layouts with soft, large drop shadows highlighting interactive states.
- System-wide secure **Dark/Light Theme Toggle**.
- Glassmorphism touches on sticky headers.
- Highly Responsive CSS Grid & Flexbox construction ensuring fluid scaling on mobile devices.

---

*Enjoy skipping the queue!* 🚀
