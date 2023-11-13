# Easy-Tracker: A Hierarchical Todo List App

Easy-Tracker is a simple, yet powerful todo list application that allows users to create and manage hierarchical todo lists. With a clean and intuitive interface, users can easily organize their tasks, create subtasks, and track their progress.

## Demo

Check out this quick demo of Easy-Tracker in action:

[Video Demo](https://www.loom.com/share/1b976a5771b945ada1534c7fcfc0bfb2?sid=8bdf4045-d299-4812-85d2-e2891951a41a)

## Technologies Used

- **Frontend**: React
- **Backend**: Flask
- **Database**: SQLite

For a detailed look at the project structure, [click here](#folder-structure).

## Features

- **User Authentication**: Sign up, log in, and manage your account.
- **Multiple Todo Lists**: Create and manage multiple todo lists.
- **Hierarchical Tasks**: Organize your tasks with subtasks and nested subtasks.
- **Task Management**: Add, edit, delete, and mark tasks as complete.



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

List any prerequisites, libraries, OS version, etc., needed before installing the project. For example:

- Node.js (v14 or later)
- npm (v6 or later)
- Python (v3.8 or later)

### Installing

#### Backend Setup

1. **Extract the ZIP file to your desired location**.

Open a terminal and navigate to the `backend` directory inside the extracted folder:

   ```bash
   cd path/to/extracted/folder/backend
   ```

2. **create and activate a virtual environment:**
    
    ```bash
    python -m venv venv
    source venv/bin/activate
    ``` 


3. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

5. **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

6. **Set environment variables:**
   
   Create a `.env` file in the backend directory and update the necessary environment variables.

    ```dotenv
    DATABASE_URL=your_database_url
    SECRET_KEY=your_secret_key
    ```

#### Frontend Setup

1. **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

2. **Install NPM packages:**

    ```bash
    npm install
    ```
3. **Set environment variables:**
   
   Create a `.env` file in the frontend directory and update the necessary environment variables.

    ```dotenv
    REACT_APP_BASE_API_URL=http://127.0.0.1:5000
    ```

### Starting the Application

#### Running the Backend

- In the main project directory, run the following command:

    ```bash
    python main.py
    ```

  This will start the backend server on `http://127.0.0.1:5000`.

#### Running the Frontend

- In a new terminal, navigate to the frontend directory:

    ```bash
    npm start
    ```

  This will start the React app and should automatically open `http://localhost:3000/` in your web browser.

## Testing

In the project root directory, run the following command:

```bash
python -m unittest discover
```

## Folder Structure

```
Easy-Tracker-App
│
├── backend/                  # Backend API developed with Flask
│   ├── __init__.py           # Initialization of the Flask app
│   ├── app/                  # Main application package
│   │   ├── models.py         # Database models
│   │   ├── routes.py         # API routes
│   │   └── ...               # Other backend files
│   ├── db.sqlite3            # SQLite database file
│   ├── requirements.txt      # Dependencies for the backend
│   ├── run.py                # Main entry point for the Flask application
│   └── test/                 # Tests for the backend
│       ├── test_models.py    # Tests for database models
│       └── test_routes.py    # Tests for API routes
│
├── frontend/                 # Frontend developed using React
│   ├── public/               # Public assets like HTML, logo, etc.
│   │   ├── favicon.ico       # Favicon
│   │   ├── index.html        # Entry HTML file
│   │   ├── logo192.png       # App logo (small)
│   │   ├── logo512.png       # App logo (large)
│   │   ├── manifest.json     # Web app manifest file
│   │   └── robots.txt        # Instructions for web robots
│   ├── src/                  # Source files for React components
│   │   ├── components/       # Reusable React components
│   │   │   ├── LoginForm.js  # Login form component
│   │   │   ├── NavigationBar.js # Navigation bar component
│   │   │   ├── TaskForm.js   # Task form component
│   │   │   ├── TaskItem.js   # Task item component
│   │   │   └── TaskList.js   # Task list component
│   │   ├── views/            # React components for different views/pages
│   │   │   ├── HomePage.js   # Home page view
│   │   │   ├── LoginPage.js  # Login page view
│   │   │   ├── RegisterPage.js # Register page view
│   │   │   └── TaskPage.js   # Task page view
│   │   ├── App.css           # Main CSS file
│   │   ├── App.js            # Main React application component
│   │   ├── index.css         # CSS file for index.js
│   │   ├── index.js          # Entry point for React app
│   │   ├── logo.svg          # SVG logo
│   │   ├── api.js            # API client for backend communication
│   │   └── useDebouncedCallback.js # Custom hook for debounced callback
│   ├── package-lock.json     # Locked versions of npm dependencies
│   ├── package.json          # NPM package configuration
│   └── ...
│
├── .gitignore                # Ignored files and directories for Git
├── README.md                 # General documentation for the entire project
└── ...

```
