const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Job = require('./models/Job');
const User = require('./models/User');

const sampleJobs = [
  {
    title: 'Senior React Developer',
    description: 'We are looking for an experienced React Developer to join our team. You will work on building scalable web applications using React, Redux, and modern JavaScript. Must have 5+ years of experience.',
    company: 'Tech Innovations India',
    location: 'Bangalore',
    salary: { min: 1200000, max: 1800000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'IT',
    skills: ['React', 'JavaScript', 'Redux', 'Node.js', 'REST APIs'],
    requirements: [
      '5+ years of React experience',
      'Strong JavaScript knowledge',
      'Experience with state management',
      'Git version control',
      'Agile development experience'
    ],
    featured: true,
  },
  {
    title: 'Full Stack JavaScript Developer',
    description: 'Join our dynamic team as a Full Stack Developer. Build and maintain web applications using Node.js and React. Work with MongoDB, REST APIs, and cloud technologies.',
    company: 'WebDev Solutions',
    location: 'Hyderabad',
    salary: { min: 900000, max: 1400000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'IT',
    skills: ['JavaScript', 'Node.js', 'React', 'MongoDB', 'Express'],
    requirements: [
      '3+ years of full-stack development',
      'Proficiency in Node.js and React',
      'Experience with RESTful APIs',
      'Database management skills',
      'Problem-solving mindset'
    ],
    featured: true,
  },
  {
    title: 'UI/UX Designer',
    description: 'We are seeking a creative UI/UX Designer to create beautiful and intuitive user interfaces. Work on mobile and web platforms using Figma, Adobe XD, and modern design tools.',
    company: 'Design Studio Pro',
    location: 'Mumbai',
    salary: { min: 700000, max: 1100000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'Design',
    skills: ['Figma', 'Adobe XD', 'UI Design', 'UX Research', 'Prototyping'],
    requirements: [
      '3+ years of UI/UX design experience',
      'Proficiency in design tools',
      'Portfolio of previous work',
      'Understanding of user research',
      'Communication skills'
    ],
    featured: true,
  },
  {
    title: 'Data Scientist',
    description: 'Looking for a talented Data Scientist to analyze complex datasets and build predictive models. Work with Python, Machine Learning, and big data technologies.',
    company: 'Data Analytics Corp',
    location: 'Remote',
    salary: { min: 1300000, max: 1800000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'IT',
    skills: ['Python', 'Machine Learning', 'R', 'SQL', 'TensorFlow'],
    requirements: [
      '4+ years of data science experience',
      'Strong Python and SQL skills',
      'Machine learning expertise',
      'Statistical analysis knowledge',
      'Data visualization skills'
    ],
    featured: true,
  },
  {
    title: 'Marketing Manager',
    description: 'Lead our marketing initiatives and strategy. Manage campaigns, analyze market trends, and drive business growth. Great opportunity for career advancement.',
    company: 'Growth Marketing Co',
    location: 'Delhi',
    salary: { min: 800000, max: 1200000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'Marketing',
    skills: ['Digital Marketing', 'Analytics', 'SEO', 'Content Strategy', 'Leadership'],
    requirements: [
      '5+ years of marketing experience',
      'Digital marketing expertise',
      'Analytics and data interpretation',
      'Project management skills',
      'Leadership experience'
    ],
    featured: false,
  },
  {
    title: 'Backend Developer (Node.js)',
    description: 'Build robust and scalable backend systems using Node.js and TypeScript. Work with MongoDB, Redis, and microservices architecture.',
    company: 'CloudTech Systems',
    location: 'Pune',
    salary: { min: 1100000, max: 1600000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'IT',
    skills: ['Node.js', 'TypeScript', 'MongoDB', 'Redis', 'Docker'],
    requirements: [
      '4+ years of backend development',
      'Strong Node.js expertise',
      'Database design knowledge',
      'API development experience',
      'Microservices understanding'
    ],
    featured: true,
  },
  {
    title: 'Product Manager',
    description: 'Shape the future of our products! Lead product strategy, roadmap development, and cross-functional collaboration.',
    company: 'Innovation Labs',
    location: 'Bangalore',
    salary: { min: 1000000, max: 1500000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'Marketing',
    skills: ['Product Strategy', 'Agile', 'Analytics', 'Leadership', 'Communication'],
    requirements: [
      '4+ years of product management',
      'Executive communication skills',
      'Agile methodology knowledge',
      'Data-driven decision making',
      'Stakeholder management'
    ],
    featured: false,
  },
  {
    title: 'DevOps Engineer',
    description: 'Join our infrastructure team. Manage cloud platforms, CI/CD pipelines, and ensure system reliability and performance.',
    company: 'Cloud Infrastructure Co',
    location: 'Chennai',
    salary: { min: 1000000, max: 1400000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'IT',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux'],
    requirements: [
      '3+ years of DevOps experience',
      'Docker and Kubernetes expertise',
      'Cloud platform knowledge',
      'Script automation skills',
      'Linux proficiency'
    ],
    featured: false,
  },
  {
    title: 'Mobile iOS Developer',
    description: 'Develop high-quality iOS applications using Swift. Work on native apps for iPhone and iPad platforms.',
    company: 'Mobile First Apps',
    location: 'Gurgaon',
    salary: { min: 1100000, max: 1600000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'IT',
    skills: ['Swift', 'iOS', 'Objective-C', 'Xcode', 'CoreData'],
    requirements: [
      '3+ years of iOS development',
      'Swift expertise',
      'App Store deployment experience',
      'UI/UX implementation skills',
      'Testing and debugging skills'
    ],
    featured: false,
  },
  {
    title: 'Sales Executive',
    description: 'Excellent sales opportunity! Generate leads, manage client relationships, and achieve sales targets. Competitive commission structure.',
    company: 'Enterprise Solutions Ltd',
    location: 'Kolkata',
    salary: { min: 500000, max: 900000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'Sales',
    skills: ['Sales', 'Client Relations', 'Negotiation', 'CRM', 'Communication'],
    requirements: [
      '2+ years of sales experience',
      'CRM software knowledge',
      'Excellent communication',
      'Target-driven mindset',
      'Relationship building skills'
    ],
    featured: false,
  },
  {
    title: 'Android Developer',
    description: 'Build amazing Android applications using Kotlin and Java. Work with Material Design, Firebase, and modern Android development practices.',
    company: 'MobileApp Studios',
    location: 'Bangalore',
    salary: { min: 900000, max: 1500000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'IT',
    skills: ['Kotlin', 'Java', 'Android', 'Firebase', 'REST APIs'],
    requirements: [
      '3+ years of Android development',
      'Kotlin expertise',
      'Experience with Material Design',
      'Firebase integration knowledge',
      'Google Play Store deployment'
    ],
    featured: true,
  },
  {
    title: 'Python Developer',
    description: 'Join our Python development team to build scalable backend systems and automation tools using Django and FastAPI.',
    company: 'CodeForce Technologies',
    location: 'Pune',
    salary: { min: 800000, max: 1300000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'IT',
    skills: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'AWS'],
    requirements: [
      '3+ years of Python experience',
      'Django or FastAPI expertise',
      'Database design skills',
      'REST API development',
      'Deployment experience'
    ],
    featured: false,
  },
  {
    title: 'Content Writer',
    description: 'Create engaging and SEO-optimized content for our digital platforms. Work on blogs, social media, and marketing materials.',
    company: 'ContentHub Media',
    location: 'Remote',
    salary: { min: 400000, max: 700000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'Marketing',
    skills: ['Content Writing', 'SEO', 'Copywriting', 'Social Media', 'Research'],
    requirements: [
      '2+ years of content writing experience',
      'SEO knowledge',
      'Strong writing skills',
      'Research abilities',
      'Web analytics familiarity'
    ],
    featured: false,
  },
  {
    title: 'QA Engineer',
    description: 'Ensure software quality through manual and automated testing. Develop test strategies and identify bugs before deployment.',
    company: 'Quality Assurance Pro',
    location: 'Hyderabad',
    salary: { min: 600000, max: 1000000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'IT',
    skills: ['Manual Testing', 'Automation Testing', 'Selenium', 'Test Management', 'Bug Tracking'],
    requirements: [
      '3+ years of QA experience',
      'Test automation framework knowledge',
      'Selenium expertise',
      'JIRA proficiency',
      'API testing knowledge'
    ],
    featured: false,
  },
  {
    title: 'Business Analyst',
    description: 'Analyze business requirements and translate them into technical specifications. Work cross-functionally with stakeholders.',
    company: 'Business Systems Inc',
    location: 'Delhi',
    salary: { min: 700000, max: 1200000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'Marketing',
    skills: ['Requirements Analysis', 'Documentation', 'Stakeholder Management', 'SQL', 'Vishio'],
    requirements: [
      '3+ years of business analysis',
      'Requirements gathering skills',
      'Process mapping knowledge',
      'Documentation expertise',
      'Communication skills'
    ],
    featured: false,
  },
  {
    title: 'Java Backend Developer',
    description: 'Develop enterprise-level Java applications using Spring Boot and microservices architecture. Work with relational databases.',
    company: 'EnterpriseApp Solutions',
    location: 'Bangalore',
    salary: { min: 1000000, max: 1600000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'IT',
    skills: ['Java', 'Spring Boot', 'Microservices', 'SQL', 'Docker'],
    requirements: [
      '4+ years of Java development',
      'Spring Boot expertise',
      'Microservices architecture knowledge',
      'OOP principles understanding',
      'Database design skills'
    ],
    featured: true,
  },
  {
    title: 'Cloud Architect',
    description: 'Design and implement cloud infrastructure solutions using AWS and Azure. Ensure scalability, security, and cost optimization.',
    company: 'Cloud Solutions Global',
    location: 'Mumbai',
    salary: { min: 1400000, max: 2000000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'IT',
    skills: ['AWS', 'Azure', 'Cloud Architecture', 'Security', 'Infrastructure as Code'],
    requirements: [
      '5+ years of cloud experience',
      'AWS/Azure architect certification preferred',
      'Infrastructure design expertise',
      'Security best practices knowledge',
      'Cost optimization skills'
    ],
    featured: true,
  },
  {
    title: 'Graphic Designer',
    description: 'Create stunning visual designs for digital and print media. Work with modern design tools and collaborate with creative teams.',
    company: 'Creative Minds Studio',
    location: 'Mumbai',
    salary: { min: 500000, max: 900000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'Design',
    skills: ['Adobe Creative Suite', 'Graphic Design', 'Branding', 'Animation', 'Typography'],
    requirements: [
      '2+ years of graphic design experience',
      'Adobe Creative Suite proficiency',
      'Design software expertise',
      'Portfolio of previous work',
      'Attention to detail'
    ],
    featured: false,
  },
  {
    title: 'Database Administrator',
    description: 'Manage and optimize database systems. Ensure data security, backup, and high availability of databases.',
    company: 'DataManage Pro',
    location: 'Gurgaon',
    salary: { min: 800000, max: 1400000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'IT',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Database Optimization', 'Security'],
    requirements: [
      '4+ years of DBA experience',
      'Multiple database platform knowledge',
      'Backup and recovery expertise',
      'Performance tuning skills',
      'Security management'
    ],
    featured: false,
  },
  {
    title: 'Social Media Manager',
    description: 'Manage company social media accounts and build online community. Create engaging content and analyze social metrics.',
    company: 'Digital Marketing Hub',
    location: 'Bangalore',
    salary: { min: 450000, max: 800000, currency: 'INR' },
    jobType: 'Full-time',
    category: 'Marketing',
    skills: ['Social Media Management', 'Content Creation', 'Analytics', 'Community Management', 'Copywriting'],
    requirements: [
      '2+ years of social media management',
      'Content creation skills',
      'Analytics tool proficiency',
      'Community engagement experience',
      'Knowledge of social platforms'
    ],
    featured: false,
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Create a default employer user for jobs
    let employer = await User.findOne({ email: 'admin@jobboard.com' });
    
    if (!employer) {
      employer = await User.create({
        name: 'Job Board Admin',
        email: 'admin@jobboard.com',
        password: 'admin123',
        role: 'employer',
        company: 'Job Board',
      });
      console.log('Created admin employer account');
    }

    // Clear existing jobs
    await Job.deleteMany({});
    console.log('Cleared existing jobs');

    // Add employer ID to each job
    const jobsToAdd = sampleJobs.map(job => ({
      ...job,
      employer: employer._id,
    }));

    // Insert sample jobs
    const insertedJobs = await Job.insertMany(jobsToAdd);
    console.log(`✅ Successfully added ${insertedJobs.length} jobs to the database!`);

    // Display job titles
    console.log('\nAdded Jobs:');
    insertedJobs.forEach((job, index) => {
      console.log(`${index + 1}. ${job.title} - ${job.company} (${job.location})`);
    });

    console.log('\n📝 You can now login with:');
    console.log('Email: admin@jobboard.com');
    console.log('Password: admin123');
    console.log('Role: Employer');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
