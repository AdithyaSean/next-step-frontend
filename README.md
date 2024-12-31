# Next Step 🎓

An AI-powered educational and career pathway recommendation system that helps students make informed decisions about their academic and career paths. utilizes react frontend and spring boot backend with microservices architecture

## 🌟 Features

- **Career Path Recommendation**:
Get personalized recommendations for career paths based on your interests and academic performance and goals with probability for success and failure of each path

- **Explore University Fields**:
Discover potential university fields that align with your goals

- **Responsive Web App**:
User-friendly React frontend for easy access to your profile and recommendations and Robust spring boot backend for efficient data management utilizing microservices architecture

- **AI-Powered Insights**:
Advanced machine learning models for accurate predictions which update in real-time

- **User Authentication**:
Secure user authentication and authorization for personalized access to your profile and recommendations

## 🏗️ Project Structure

```
.
├── README.md
├── docs
│   ├── architecture.md
│   └── roadmap.md
├── public
│   ├── assets
│   └── index.html
├── src
│   ├── App.js
│   ├── components
│   │   ├── Career.js
│   │   ├── Course.js
│   │   ├── Institution.js
│   │   ├── Stream.js
│   │   ├── Student.js
│   │   └── User.js
│   ├── index.js
│   └── service
│       ├── CareerService.js
│       ├── CourseService.js
│       ├── InstitutionService.js
│       ├── StreamService.js
│       ├── StudentService.js
│       └── UserService.js
├── .gitignore
├── package.json
└── package-lock.json
```

## 🚀 Getting Started

### Prerequisites
- Python 3.12+ (for AI model)
- Node.js 18+ (for frontend)
- Java 17+ (for backend)
- Firebase (for google authentication)
- PostgreSQL
- Docker
- Git

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/adithyasean/Next-Step-Frontend.git
   ```

2. Install dependencies:
   ```bash
   cd Next-Step-Frontend
   npm install
   ```

#### Firebase Setup

Here's a step-by-step guide to set up the Firebase for your project:

1. ##### Login to Firebase:**
   ```bash
   firebase login
   ```

2. ##### Initialize Firebase:**
   ```bash
   firebase init
   ```

5. ##### Verify Firebase Files:**
    Check firebase.json exists

### After Each Pull

1. **Update Dependencies:**
   ```bash

   ```

2. **Run Build Runner:**
   ```bash
   
   ```

3. **Clean and Run:**
   ```bash
   
   ```

## Troubleshooting

- If build fails:
  ```bash
  
  ```

## Important Notes
- Don't commit Firebase configuration files
- Update `.gitignore` to exclude sensitive files

## Running Components Separately

### React Frontend

```bash
cd Next-Step-Frontend
npm start
```

### Spring Boot Backend

```bash
cd Next-Step-Backend
./mvnw spring-boot:run
```

## 📚 Docs

- [Architecture](docs/architecture.md)
- [Roadmap](docs/roadmap.md) 

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

[LICENSE](LICENSE)
