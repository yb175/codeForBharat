export const mockData = {
  events: [
    {
      id: '1',
      title: 'Annual Tech Fest',
      description: 'Join us for the biggest tech festival of the year with workshops, competitions, and networking.',
      date: '2024-02-15',
      time: '10:00 AM',
      location: 'Main Auditorium',
      organizer: 'Tech Club',
      category: 'Technology',
      maxParticipants: 500,
      registeredUsers: ['1', '2', '3'],
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
      createdAt: '2024-01-15T10:00:00Z',
      points: 50,
      registrationLink: 'https://bits.edu.in/annual-tech-fest/'
    },
    {
      id: '2',
      title: 'Cultural Night',
      description: 'Celebrate diversity with music, dance, and cultural performances from around the world.',
      date: '2024-02-20',
      time: '7:00 PM',
      location: 'Open Air Theater',
      organizer: 'Cultural Society',
      category: 'Cultural',
      maxParticipants: 300,
      registeredUsers: ['2', '4'],
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      createdAt: '2024-01-20T09:00:00Z',
      points: 30,
      registrationLink: 'https://www.scmsnoida.ac.in/cultural_evening'
    },
    {
      id: '3',
      title: 'Career Fair 2025',
      description: 'Meet top recruiters and explore career opportunities in various industries.',
      date: '2024-02-25',
      time: '9:00 AM',
      location: 'Convention Center',
      organizer: 'Placement Cell',
      category: 'Career',
      maxParticipants: 800,
      registeredUsers: ['1', '3', '5'],
      image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg',
      createdAt: '2024-01-25T11:00:00Z',
      points: 40,
      registrationLink: 'https://rsvp.withgoogle.com/events/cloud-career-fair/home'
    }
  ],

  lostItems: [
    {
      id: '1',
      title: 'Blue Samsung Galaxy S21',
      description: 'Lost my blue Samsung Galaxy S21 near the library. Has a black case with card holder.',
      category: 'Electronics',
      location: 'Library',
      dateFound: '2024-01-20',
      reportedBy: 'John Doe',
      contact: 'john@college.edu',
      image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
      status: 'lost',
      createdAt: '2024-01-20T14:30:00Z'
    },
    {
      id: '2',
      title: 'Red Backpack',
      description: 'Found a red backpack with laptop and textbooks near the cafeteria.',
      category: 'Bags',
      location: 'Cafeteria',
      dateFound: '2024-01-22',
      reportedBy: 'Jane Smith',
      contact: 'jane@college.edu',
      image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg',
      status: 'found',
      createdAt: '2024-01-22T16:45:00Z'
    },
    {
      id: '3',
      title: 'Silver MacBook Pro',
      description: 'Lost my MacBook Pro in the computer lab. Has stickers on the back.',
      category: 'Electronics',
      location: 'Computer Lab',
      dateFound: '2024-01-25',
      reportedBy: 'Mike Johnson',
      contact: 'mike@college.edu',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
      status: 'lost',
      createdAt: '2024-01-25T13:20:00Z'
    }
  ],

  studyMaterials: [
    {
    id: '1',
    title: 'Introduction to Programming Notes',
    description: 'Basics of C programming with examples and exercises.',
    subject: 'Computer Science',
    semester: '1st',
    fileType: 'PDF',
    uploadedBy: 'Prof. A. Sharma',
    fileSize: '1.2 MB',
    downloads: 321,
    tags: ['c-language', 'basics', 'programming'],
    createdAt: '2024-01-05T10:00:00Z',
    fileUrl: 'https://drive.google.com/file/d/1E01pK6ib7eOzBiku_NSFPlbBN2olnijC/view'
  },
  {
    id: '2',
    title: 'Engineering Physics Lecture Slides',
    description: 'Complete slides for Unit 1–4 of Engineering Physics.',
    subject: 'Physics',
    semester: '1st',
    fileType: 'PPT',
    uploadedBy: 'Prof. Neha Roy',
    fileSize: '4.1 MB',
    downloads: 198,
    tags: ['optics', 'motion', 'thermodynamics'],
    createdAt: '2024-01-06T11:00:00Z',
    fileUrl: 'https://drive.google.com/file/d/1vvVlywtRaf6tJGwKQ8sGqXo9fpRAXP-w/view'
  },
  {
    id: '3',
    title: 'Basic Electrical Engineering Notes',
    description: 'Comprehensive theory notes with solved examples.',
    subject: 'Electrical',
    semester: '1st',
    fileType: 'PDF',
    uploadedBy: 'Prof. Vikram Sinha',
    fileSize: '2.6 MB',
    downloads: 267,
    tags: ['current', 'circuit', 'ohm-law'],
    createdAt: '2024-01-07T13:00:00Z',
    fileUrl: '#'
  },
  {
    id: '4',
    title: 'Maths-I Practice Set',
    description: 'Important problems with solutions for Maths-I.',
    subject: 'Mathematics',
    semester: '1st',
    fileType: 'PDF',
    uploadedBy: 'Prof. J. Mehta',
    fileSize: '1.8 MB',
    downloads: 356,
    tags: ['limits', 'differentiation', 'integration'],
    createdAt: '2024-01-08T09:30:00Z',
    fileUrl: 'https://drive.google.com/file/d/1aR1jWqbZHM-IUQwzBOTACtMVMp2j5wFB/view'
  },
  {
    id: '5',
    title: 'Workshop Practice Lab Manual',
    description: 'Step-by-step guide for practicals in workshop.',
    subject: 'Mechanical',
    semester: '1st',
    fileType: 'DOCX',
    uploadedBy: 'Prof. Rajeev Kumar',
    fileSize: '2.1 MB',
    downloads: 144,
    tags: ['lathe', 'fitting', 'carpentry'],
    createdAt: '2024-01-09T12:00:00Z',
    fileUrl: '#'
  },
  {
    id: '6',
    title: 'English Communication Workbook',
    description: 'Practice worksheets for improving grammar and writing.',
    subject: 'English',
    semester: '1st',
    fileType: 'PDF',
    uploadedBy: 'Prof. Anjali Desai',
    fileSize: '1.5 MB',
    downloads: 221,
    tags: ['writing', 'grammar', 'communication'],
    createdAt: '2024-01-10T15:00:00Z',
    fileUrl: '#'
  },
  {
    id: '7',
    title: 'Calculus I Notes',
    description: 'Detailed notes for first semester calculus.',
    subject: 'Mathematics',
    semester: '1st',
    fileType: 'PDF',
    uploadedBy: 'Prof. D. Iyer',
    fileSize: '2.3 MB',
    downloads: 280,
    tags: ['calculus', 'limits', 'derivatives'],
    createdAt: '2024-01-11T08:45:00Z',
    fileUrl: 'https://drive.google.com/file/d/1aR1jWqbZHM-IUQwzBOTACtMVMp2j5wFB/view'
  },
  {
    id: '8',
    title: 'Engineering Chemistry Notes',
    description: 'Unit-wise compiled notes for theory preparation.',
    subject: 'Chemistry',
    semester: '2nd',
    fileType: 'PDF',
    uploadedBy: 'Prof. Sujata Nair',
    fileSize: '2.7 MB',
    downloads: 203,
    tags: ['organic', 'chemical-bonding', 'acids'],
    createdAt: '2024-01-12T10:15:00Z',
    fileUrl: 'https://drive.google.com/file/d/1KFH1HejZwdEXq50bxm05A2t7mHHbXPW_/view'
  },
  {
    id: '9',
    title: 'Physics Lab Readings',
    description: 'All experiment readings and observations.',
    subject: 'Physics',
    semester: '2nd',
    fileType: 'XLSX',
    uploadedBy: 'Lab Assistant',
    fileSize: '0.9 MB',
    downloads: 178,
    tags: ['lab', 'experiments', 'readings'],
    createdAt: '2024-01-13T14:10:00Z',
    fileUrl: '#'
  },
  {
    id: '10',
    title: 'Environmental Science Guide',
    description: 'Condensed guide for EVS with important topics.',
    subject: 'EVS',
    semester: '2nd',
    fileType: 'PDF',
    uploadedBy: 'Prof. A. Chatterjee',
    fileSize: '1.4 MB',
    downloads: 239,
    tags: ['environment', 'sustainability', 'ecosystem'],
    createdAt: '2024-01-14T16:00:00Z',
    fileUrl: 'https://drive.google.com/file/d/1VTeUPm3R1g_ka1r9jBz4pDg7bPXMg_Vu/view'
  },
  {
    id: '11',
    title: 'C Programming Lab Sheet',
    description: 'All programs with output screenshots.',
    subject: 'Computer Science',
    semester: '2nd',
    fileType: 'DOCX',
    uploadedBy: 'Prof. Ankit Verma',
    fileSize: '1.9 MB',
    downloads: 311,
    tags: ['c-language', 'lab', 'programming'],
    createdAt: '2024-01-15T10:30:00Z',
    fileUrl: 'https://drive.google.com/file/d/1E01pK6ib7eOzBiku_NSFPlbBN2olnijC/view'
  },
  {
    id: '12',
    title: 'Mathematics-II Question Bank',
    description: 'Collection of previous year papers and questions.',
    subject: 'Mathematics',
    semester: '2nd',
    fileType: 'PDF',
    uploadedBy: 'Prof. Neeraj Rana',
    fileSize: '2.0 MB',
    downloads: 197,
    tags: ['matrices', 'differential', 'vector'],
    createdAt: '2024-01-16T13:20:00Z',
    fileUrl: 'https://drive.google.com/file/d/1aR1jWqbZHM-IUQwzBOTACtMVMp2j5wFB/view'
  },
  {
    id: '13',
    title: 'Engineering Graphics Sheets',
    description: 'All drawing sheets scanned and explained.',
    subject: 'Graphics',
    semester: '2nd',
    fileType: 'PDF',
    uploadedBy: 'Prof. Rakesh Kapoor',
    fileSize: '3.5 MB',
    downloads: 154,
    tags: ['orthographic', 'isometric', 'drawing'],
    createdAt: '2024-01-17T09:45:00Z',
    fileUrl: '#'
  },
  {
    id: '14',
    title: 'Chemistry Practicals',
    description: 'Observation tables and analysis for each experiment.',
    subject: 'Chemistry',
    semester: '2nd',
    fileType: 'PDF',
    uploadedBy: 'Lab Assistant',
    fileSize: '1.6 MB',
    downloads: 176,
    tags: ['practical', 'chemistry', 'observations'],
    createdAt: '2024-01-18T12:50:00Z',
    fileUrl: 'https://drive.google.com/file/d/1KFH1HejZwdEXq50bxm05A2t7mHHbXPW_/view'
  },
  {
    id: '15',
    title: 'Professional Ethics Notes',
    description: 'Key topics and case studies for ethics subject.',
    subject: 'Humanities',
    semester: '2nd',
    fileType: 'PDF',
    uploadedBy: 'Prof. Sneha Arora',
    fileSize: '1.3 MB',
    downloads: 122,
    tags: ['ethics', 'values', 'professionalism'],
    createdAt: '2024-01-19T11:10:00Z',
    fileUrl: '#'
  }
  ],

  studyGroups: [
    {
      id: '1',
      title: 'Machine Learning Study Group',
      description: 'Weekly study sessions for machine learning concepts and projects.',
      subject: 'Computer Science',
      maxMembers: 8,
      members: ['1', '2', '3'],
      createdBy: 'Alex Kumar',
      meetingTime: 'Saturdays 2:00 PM',
      location: 'Library Room 201',
      difficulty: 'Intermediate',
      goals: ['Complete ML course', 'Work on projects', 'Prepare for exams'],
      createdAt: '2024-01-10T10:00:00Z'
    },
    {
      id: '2',
      title: 'GATE Preparation Group',
      description: 'Intensive preparation group for GATE computer science examination.',
      subject: 'Computer Science',
      maxMembers: 12,
      members: ['2', '4', '5'],
      createdBy: 'Priya Sharma',
      meetingTime: 'Daily 6:00 PM',
      location: 'Study Hall A',
      difficulty: 'Advanced',
      goals: ['GATE preparation', 'Mock tests', 'Doubt clearing'],
      createdAt: '2024-01-12T08:30:00Z'
    },
    {
      id: '3',
      title: 'Interview Preparation Circle',
      description: 'Practice coding interviews and soft skills for placement preparation.',
      subject: 'Career Development',
      maxMembers: 10,
      members: ['1', '3', '4'],
      createdBy: 'Rahul Gupta',
      meetingTime: 'Tuesdays & Thursdays 7:00 PM',
      location: 'Conference Room B',
      difficulty: 'All Levels',
      goals: ['Coding practice', 'Mock interviews', 'Resume building'],
      createdAt: '2024-01-14T16:20:00Z'
    }
  ],

  mediaItems: [
    {
      id: '1',
      title: 'When you finally understand recursion',
      type: 'meme',
      imageUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
      caption: 'The moment of enlightenment every CS student experiences',
      uploadedBy: 'CodeMaster123',
      likes: 156,
      comments: [
        { id: '1', user: 'TechGuru', text: 'So relatable! 😄', createdAt: '2024-01-20T10:30:00Z' },
        { id: '2', user: 'StudentLife', text: 'Took me 3 semesters to get this', createdAt: '2024-01-20T11:45:00Z' }
      ],
      tags: ['programming', 'recursion', 'computer-science'],
      createdAt: '2024-01-20T09:15:00Z'
    },
    {
      id: '2',
      title: 'Campus Sunset Gallery',
      type: 'gallery',
      imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      caption: 'Beautiful sunset views from our campus',
      uploadedBy: 'NaturePhotographer',
      likes: 89,
      comments: [
        { id: '3', user: 'ArtLover', text: 'Stunning capture!', createdAt: '2024-01-21T14:20:00Z' }
      ],
      tags: ['photography', 'sunset', 'campus'],
      createdAt: '2024-01-21T18:45:00Z'
    },
    {
      id: '3',
      title: 'Exam week be like',
      type: 'meme',
      imageUrl: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg',
      caption: 'Coffee is the only reason I am still alive',
      uploadedBy: 'CoffeeLover',
      likes: 234,
      comments: [
        { id: '4', user: 'StudyBuddy', text: 'I felt this in my soul', createdAt: '2024-01-22T09:30:00Z' },
        { id: '5', user: 'ExamSurvivor', text: 'Same energy every semester', createdAt: '2024-01-22T10:15:00Z' }
      ],
      tags: ['exam', 'coffee', 'student-life'],
      createdAt: '2024-01-22T08:00:00Z'
    }
  ],

  reports: [
    {
      id: '1',
      title: 'Inappropriate behavior in hostel',
      description: 'Reporting incident of ragging in hostel block A',
      category: 'Ragging',
      location: 'Hostel Block A',
      incidentDate: '2024-01-18',
      reportedBy: 'Anonymous',
      severity: 'High',
      status: 'pending',
      witnesses: false,
      additionalInfo: 'Incident occurred during evening hours',
      createdAt: '2024-01-19T20:30:00Z'
    },
    {
      id: '2',
      title: 'Harassment in classroom',
      description: 'Student facing harassment from seniors',
      category: 'Harassment',
      location: 'Classroom 301',
      incidentDate: '2024-01-20',
      reportedBy: 'Anonymous',
      severity: 'Medium',
      status: 'under-review',
      witnesses: true,
      additionalInfo: 'Multiple witnesses available',
      createdAt: '2024-01-21T15:45:00Z'
    }
  ],

  notifications: [
    {
      id: '1',
      title: 'New Event: Tech Fest 2024',
      message: 'Annual Tech Fest registration is now open!',
      type: 'event',
      read: false,
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      title: 'Study Material Uploaded',
      message: 'New Data Structures notes have been uploaded',
      type: 'study-material',
      read: false,
      createdAt: '2024-01-16T14:30:00Z'
    },
    {
      id: '3',
      title: 'Study Group Invitation',
      message: 'You have been invited to join Machine Learning Study Group',
      type: 'study-group',
      read: true,
      createdAt: '2024-01-17T11:20:00Z'
    }
  ],

  users: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@college.edu',
      role: 'student',
      department: 'Computer Science',
      year: '3rd',
      points: 150,
      joinedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@college.edu',
      role: 'student',
      department: 'Electronics',
      year: '2nd',
      points: 120,
      joinedAt: '2024-01-02T00:00:00Z'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@college.edu',
      role: 'student',
      department: 'Computer Science',
      year: '4th',
      points: 200,
      joinedAt: '2024-01-03T00:00:00Z'
    },
    {
      id: '4',
      name: 'Prof. Sarah Wilson',
      email: 'sarah@college.edu',
      role: 'faculty',
      department: 'Computer Science',
      points: 0,
      joinedAt: '2024-01-01T00:00:00Z'
    }
  ]
};