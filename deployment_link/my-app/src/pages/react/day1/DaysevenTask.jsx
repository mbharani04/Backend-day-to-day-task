
const StudentProfile = () => (
  <div>
    <h2>Student Profile</h2>
    <p>Student Name: Bharani</p>
    <p>Course: MERN Stack</p>
    <p>City: Chennai</p>
    <p>Institute: SLA Institute</p>
  </div>
);

const EmployeeCard = () => (
  <div>
    <h2>Employee Card</h2>
    <p>Employee Name: John</p>
    <p>Employee ID: EMP101</p>
    <p>Department: IT</p>
    <p>Salary: ₹50,000</p>
  </div>
);

const ProductCard = () => (
  <div>
    <h2>Product Card</h2>
    <p>Product Name: Laptop</p>
    <p>Product Price: ₹60,000</p>
    <p>Product Category: Electronics</p>
    <p>Product Description: High-performance laptop</p>
  </div>
);

const MovieDetails = () => (
  <div>
    <h2>Movie Details</h2>
    <p>Movie Name: Leo</p>
    <p>Hero Name: Vijay</p>
    <p>Director Name: Lokesh Kanagaraj</p>
    <p>Release Year: 2023</p>
  </div>
);

const CompanyInfo = () => (
  <div>
    <h2>Company Info</h2>
    <p>Company Name: Google</p>
    <p>Location: California</p>
    <p>Founder: Larry Page & Sergey Brin</p>
    <p>Established Year: 1998</p>
  </div>
);

// Task 6 Components

const Header = () => (
  <header>
    <h2>LOGO</h2>
    <h1>ABC Company</h1>
    <nav>
      <a href="#">Home</a> |{" "}
      <a href="#">About</a> |{" "}
      <a href="#">Contact</a>
    </nav>
  </header>
);

// Task 7 Components

const MainContent = () => (
  <main>
    <h2>Main Content</h2>
    <p>This is the main content section.</p>
  </main>
);

const Footer = () => (
  <footer>
    <p>© 2026 All Rights Reserved</p>
  </footer>
);

// Task 8 Components

const Navbar = () => (
  <nav>
    <h2>My Website</h2>
    <a href="#">Home</a> |{" "}
    <a href="#">Services</a> |{" "}
    <a href="#">Contact</a>
  </nav>
);

const HeroSection = () => (
  <section>
    <h1>Welcome to Our Website</h1>
    <p>We provide the best web development services.</p>
    <button>Get Started</button>
  </section>
);

const DaysevenTask = () => {
  return (
    <div>
      {/* Task 1 */}
      <StudentProfile />
      <hr />

      {/* Task 2 */}
      <EmployeeCard />
      <hr />

      {/* Task 3 */}
      <ProductCard />
      <hr />

      {/* Task 4 */}
      <MovieDetails />
      <hr />

      {/* Task 5 */}
      <CompanyInfo />
      <hr />

      {/* Task 6 */}
      <Header />
      <hr />

      {/* Task 7 */}
      <Header />
      <MainContent />
      <Footer />
      <hr />

      {/* Task 8 */}
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default DaysevenTask;