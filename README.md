Wiremit: Send Pocket Money App
Project Brief
This project is a technical interview assignment to build a web application for Zimbabwean parents to send pocket money to their children studying in the UK or South Africa. The app includes a mock account creation and login system, a dashboard with money transfer functionality, a mock ad carousel, and a transaction history section.

The application is built with a focus on clean UI/UX, mobile responsiveness, and client-side validation, as outlined in the project requirements.

Features
Mock Account Creation: A sign-up form to create a mock user account with a username, email, and password.

Mock Login: A login form to authenticate users based on their mock credentials.

Multi-page Routing: The app is structured with separate pages for login and the dashboard using react-router-dom.

Dashboard: A central hub with three main sections:

Top Cards: Three cards to display key financial information.

Send Money: A form to calculate currency conversions and fees.

Mock Transaction History: A list of past transactions with pagination.

Responsive Design: The layout is built to be responsive and usable on various screen sizes, from mobile phones to desktop computers.

Technology Stack
Frontend Framework: React

Routing: react-router-dom

Styling: Custom CSS

API Integration: Fetching FX rates from a mock API endpoint.

Installation and Running the Project
Clone the repository:

git clone [your-repo-link]
cd wiremit-app

Install dependencies:

npm install

Start the development server:

npm start

The application will be available at http://localhost:3000.

Design & Technical Decisions
UI/UX: The design uses a clean, modern aesthetic with a light theme and a white form card. The visual style is centered around the Wiremit brand's green, blue-gray, and secondary gray colors. The wave background adds a unique and dynamic touch to the authentication pages.

Routing: react-router-dom was chosen for its simplicity and efficiency in creating a Single Page Application (SPA) with distinct "pages" for a better user experience.

State Management: For this project's scale, React's built-in useState and useEffect hooks are a suitable choice for managing local component state.

Mock Account Storage: Mock user credentials will be stored in the browser's localStorage for persistence between reloads. In a real-world scenario, this would be handled by a secure backend and database. This decision was made to meet the "no persistence" requirement in the brief while also providing a functional demonstration.

Client-Side Validation: Form inputs will be validated on the client side to provide immediate feedback to the user, improving the overall user experience.

Future Enhancements
User Authentication: Transition from mock authentication to a real backend service for secure user management.

Dashboard Features: Implement the FX rates API to perform live calculations and build a fully functional carousel and pagination for the transaction history.

Security: Enhance security by handling API keys securely and implementing more robust protection against common vulnerabilities.

Scalability: The component-based architecture is designed to easily scale for more countries, currencies, and additional dashboard features in the future.