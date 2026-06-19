export const testData = {
  user: {
    name: "Test User",
    email: `testuser${Date.now()}@example.com`,
    firstName: "Test",
    lastName: "User",
    password: "TestPassword@123",
    company: "Test Company",
    address: "123 Test Street",
    address2: "Suite 100",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    zipcode: "400001",
    mobileNumber: "9876543210",
  },
  invalidUser: {
    email: "invalid@example.com",
    password: "wrongpassword",
  },
  product: {
    searchName: "Blue Top",
  },
  contactUs: {
    name: "Test Contact",
    email: "test@example.com",
    subject: "Test Subject",
    message: "This is a test message from automation",
  },
  review: {
    name: "Test Reviewer",
    email: "reviewer@example.com",
    review: "Great product! Highly recommended.",
  },
  payment: {
    nameOnCard: "Test User",
    cardNumber: "4111111111111111",
    cvc: "123",
    expiryMonth: "12",
    expiryYear: "2025",
  },
  subscription: {
    email: `subscriber${Date.now()}@example.com`,
  },
};

export const generateUniqueEmail = () => `user${Date.now().toString().slice(-5)}${Math.random().toString(36).substr(2, 4)}@example.com`;

// Random data pool for generating diverse test data
const dataPool = {
  firstNames: [
    "Rajesh", "Priya", "Amit", "Sneha", "Vikram", "Anjali", "Arjun", "Neha",
    "Aditya", "Pooja", "Rohan", "Divya", "Harsh", "Isha", "Nikhil", "Riya",
    "Sanjay", "Zara", "Karan", "Nisha"
  ],
  lastNames: [
    "Sharma", "Patel", "Kumar", "Singh", "Gupta", "Verma", "Pandey", "Yadav",
    "Mishra", "Reddy", "Nair", "Desai", "Menon", "Iyer", "Bhat", "Dutta",
    "Banerjee", "Ghosh", "Chatterjee", "Roy"
  ],
  companies: [
    "Tech Solutions", "Digital Innovations", "Cloud Systems", "Data Analytics Corp",
    "Software House", "IT Consulting", "Web Development Ltd", "Mobile Apps Inc",
    "Cyber Security Pro", "AI Technologies", "Database Services", "Network Solutions",
    "Business Intelligence", "Enterprise Solutions", "Digital Marketing Co"
  ],
  addresses: [
    "123 MG Road", "456 Park Street", "789 Commercial Lane", "321 Business Avenue",
    "654 Tech Park", "987 Innovation Drive", "111 Silicon Valley", "222 Commerce Street",
    "333 Enterprise Road", "444 Digital Plaza", "555 Technology Hub", "666 Business Park"
  ],
  states: [
    "Maharashtra", "Karnataka", "Tamil Nadu", "Telangana", "Gujarat", "Delhi",
    "Punjab", "Haryana", "Uttar Pradesh", "West Bengal", "Kerala", "Rajasthan"
  ],
  cities: [
    "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Ahmedabad", "New Delhi",
    "Chandigarh", "Gurugram", "Noida", "Kolkata", "Kochi", "Jaipur", "Pune"
  ],
  zipcodes: [
    "400001", "560001", "600001", "500001", "380001", "110001", "160001",
    "122001", "201301", "700001", "682001", "302001", "411001"
  ],
  mobileNumbers: [
    "9876543210", "9123456789", "8765432109", "7654321098", "9988776655",
    "9876543211", "9876543212", "9876543213", "9876543214", "9876543215"
  ],
  passwords: [
    "Password@123", "Test@12345", "Secure@Pass", "MyPass@2024", "AutoTest@123"
  ],
  days: ["1", "5", "10", "15", "20", "25", "28"],
  months: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],
  years: [
    "1985", "1987", "1989", "1990", "1992", "1995", "1998", "2000", "2001", "2002"
  ]
};

// Function to get random item from array
const getRandomItem = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
};

// Generate random registration data
export const generateRandomUserData = () => {
  return {
    name: `${getRandomItem(dataPool.firstNames)} ${getRandomItem(dataPool.lastNames)}`,
    firstName: getRandomItem(dataPool.firstNames),
    lastName: getRandomItem(dataPool.lastNames),
    email: generateUniqueEmail(),
    password: getRandomItem(dataPool.passwords),
    company: getRandomItem(dataPool.companies),
    address: getRandomItem(dataPool.addresses),
    address2: `${getRandomItem(dataPool.addresses)} - Suite ${Math.floor(Math.random() * 100) + 1}`,
    country: "India",
    state: getRandomItem(dataPool.states),
    city: getRandomItem(dataPool.cities),
    zipcode: getRandomItem(dataPool.zipcodes),
    mobileNumber: getRandomItem(dataPool.mobileNumbers),
    day: getRandomItem(dataPool.days),
    month: getRandomItem(dataPool.months),
    year: getRandomItem(dataPool.years),
  };
};

// Generate multiple random users
export const generateRandomUsers = (count: number) => {
  return Array.from({ length: count }, () => generateRandomUserData());
};
