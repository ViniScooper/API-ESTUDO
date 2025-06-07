# Frontend Application

This project is a simple frontend application that interacts with a backend API to manage user data. It consists of an HTML file, a CSS file for styling, and a JavaScript file for handling API requests and user interactions.

## Project Structure

```
frontend-app
├── index.html        # Main HTML document
├── styles            # Folder containing CSS styles
│   └── style.css     # CSS styles for the application
├── scripts           # Folder containing JavaScript files
│   └── app.js        # JavaScript code for API interactions
└── README.md         # Project documentation
```

## Getting Started

To run this application, follow these steps:

1. **Clone the repository** (if applicable):
   ```
   git clone <repository-url>
   cd frontend-app
   ```

2. **Open the `index.html` file** in your web browser. You can do this by double-clicking the file or by using a local server.

3. **Ensure your backend API is running** on the specified port (default is 3000). The frontend will make requests to this API.

## API Endpoints

The application interacts with the following API endpoints:

- `POST /usuarios`: Create a new user.
- `GET /usuarios`: Retrieve a list of users.

## Customization

You can customize the styles in the `styles/style.css` file and modify the JavaScript logic in `scripts/app.js` to fit your needs.

## License

This project is licensed under the MIT License.