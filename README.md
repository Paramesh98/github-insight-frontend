# Github Insight

### **Description**

This is the frontend of the web application built with React. The app retrieves and displays the following details for a Github user based on their username:

- Repositories
- Gists
- Organizations

### **Technologies Used**

- React 
- Bootstrap for styling
- TypeScript

### **Features**

1. A search input field to enter the Github username.
2. Display areas for:
   - User repositories
   - User gists
   - User organizations
3. Responsive UI using Bootstrap.

### **Setup and Installation**

1. **Clone the repository:**
   ```bash
   git clone <FRONTEND_REPO_URL>
   ```
2. **Navigate to the project directory:**
   ```bash
   cd frontend
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Run the development server:**
   ```bash
   npm start
   ```

5. **Access the application:** Open `http://localhost:3000` in your web browser.

### **Configuration**

- API calls for retrieving repositories, gists, and organizations are made via the backend service.

```

### **Build for Production**

To create a production build of the app:
```bash
npm run build
```

### **Docker Setup (Optional)**

1. **Build the Docker image:**
   ```bash
   docker build -t github-frontend .
   ```
2. **Run the container:**
   ```bash
   docker run -p 3000:3000 github-frontend
   ```

---
