react folder structure

root
│
├── public                     # Public assets
│   ├── index.html             # Main HTML file
│   └── assets                 # Static assets (images, fonts, icons, etc.)
│
├── src                        # Main application source code
│   ├── assets                 # Non-component assets (images, fonts, etc.)
│   │   └── images
│   │   └── styles             # Global CSS, SCSS, or theming files
│   ├── components             # Reusable UI components (buttons, inputs, cards, etc.)
│   │   └── Button
│   │       ├── Button.js      # Component logic
│   │       └── Button.module.css # Component styling
│   │   └── ...
│   │
│   ├── containers             # Page-level components or smart components
│   │   └── Home
│   │       ├── Home.js        # Home page logic
│   │       └── Home.module.css # Home page styling
│   │   └── ...
│   │
│   ├── context                # React Context files
│   │   └── AuthContext.js     # Example of an authentication context
│   └── hooks                  # Custom React hooks
│   │   └── useAuth.js         # Example of an authentication hook
│   │   └── useFetch.js
│   └── layout                 # Shared layout components (e.g., header, footer)
│   │   └── Header
│   │       ├── Header.js
│   │       └── Header.module.css
│   │   └── Footer
│   │       ├── Footer.js
│   │       └── Footer.module.css
│   │   └── ...
│   │
│   ├── services               # API service and helper files
│   │   └── api.js             # Example API calls using fetch or axios
│   └── store                  # Redux or other state management files
│       ├── index.js           # Redux store configuration
│       └── slices             # Redux slices (e.g., authSlice.js, userSlice.js)
│
│   ├── App.js                 # Root component
│   ├── index.js               # Entry point of the application
│   └── routes                 # Route definitions (React Router configuration)
│       └── index.js           # Example of a route configuration file
│
└── .env                       # Environment variables
└── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation