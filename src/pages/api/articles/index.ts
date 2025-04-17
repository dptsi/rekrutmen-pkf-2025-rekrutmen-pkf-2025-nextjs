import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiSuccessResponse, ApiErrorResponse, Article } from '@/services/api';

const articles = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    title: "Getting Started with Next.js",
    creator_name: "John Doe",
    comments_count: 5
  },
  {
    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    title: "Why TypeScript is Awesome",
    creator_name: "Jane Smith",
    comments_count: 3
  },
  {
    id: "7ba7b810-9dad-11d1-80b4-00c04fd430c9",
    title: "Understanding GraphQL Basics",
    creator_name: "Emma Wilson",
    comments_count: 4
  },
  {
    id: "8ba7b810-9dad-11d1-80b4-00c04fd430c0",
    title: "Docker for Beginners",
    creator_name: "James Brown",
    comments_count: 6
  },
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    title: "Advanced React Patterns",
    creator_name: "Sophie Chen",
    comments_count: 8
  },
  {
    id: "c2d8e912-68a3-4b21-9345-c8f76d3a1234",
    title: "CSS Grid Mastery",
    creator_name: "Alex Turner",
    comments_count: 7
  },
  {
    id: "d3e9f023-79b4-5c32-0456-d9g87e4a2345",
    title: "JavaScript ES6+ Features",
    creator_name: "Maria Garcia",
    comments_count: 9
  },
  {
    id: "e4f0g134-8ac5-6d43-1567-e0h98f5b3456",
    title: "React Hook Patterns",
    creator_name: "Chris Wilson",
    comments_count: 12
  },
  {
    id: "f5g1h245-9bd6-7e54-2678-f1i09g6c4567",
    title: "MongoDB Best Practices",
    creator_name: "Linda Chen",
    comments_count: 6
  },
  {
    id: "g6h2i356-0ce7-8f65-3789-g2j10h7d5678",
    title: "Vue.js for Beginners",
    creator_name: "David Kim",
    comments_count: 4
  },
  {
    id: "h7i3j467-1df8-9g76-4890-h3k21i8e6789",
    title: "Python Data Science",
    creator_name: "Sarah Johnson",
    comments_count: 8
  },
  {
    id: "i8j4k578-2eg9-0h87-5901-i4l32j9f7890",
    title: "AWS Cloud Architecture",
    creator_name: "Michael Lee",
    comments_count: 10
  },
  {
    id: "j9k5l689-3fh0-1i98-6012-j5m43k0g8901",
    title: "DevOps Pipeline Setup",
    creator_name: "Rachel White",
    comments_count: 5
  },
  {
    id: "k0l6m790-4gi1-2j09-7123-k6n54l1h9012",
    title: "Angular vs React",
    creator_name: "Tom Brown",
    comments_count: 15
  },
  {
    id: "l1m7n801-5hj2-3k10-8234-l7o65m2i0123",
    title: "Mobile App Development",
    creator_name: "Jessica Lee",
    comments_count: 7
  },
  {
    id: "m2n8o912-6ik3-4l21-9345-m8p76n3j1234",
    title: "Kubernetes in Production",
    creator_name: "Kevin Zhang",
    comments_count: 9
  },
  {
    id: "n3o9p023-7jl4-5m32-0456-n9q87o4k2345",
    title: "Web Security Basics",
    creator_name: "Emily Davis",
    comments_count: 11
  },
  {
    id: "o4p0q134-8km5-6n43-1567-o0r98p5l3456",
    title: "Redux State Management",
    creator_name: "Andrew Wilson",
    comments_count: 8
  },
  {
    id: "p5q1r245-9ln6-7o54-2678-p1s09q6m4567",
    title: "Node.js Performance",
    creator_name: "Sofia Rodriguez",
    comments_count: 6
  },
  {
    id: "q6r2s356-0mo7-8p65-3789-q2t10r7n5678",
    title: "SQL Database Design",
    creator_name: "William Chen",
    comments_count: 7
  },
  {
    id: "r7s3t467-1np8-9q76-4890-r3u21s8o6789",
    title: "Machine Learning Basics",
    creator_name: "Emma Thompson",
    comments_count: 13
  },
  {
    id: "s8t4u578-2oq9-0r87-5901-s4v32t9p7890",
    title: "Git Advanced Commands",
    creator_name: "Daniel Kim",
    comments_count: 9
  },
  {
    id: "t9u5v689-3pr0-1s98-6012-t5w43u0q8901",
    title: "REST API Design",
    creator_name: "Olivia Brown",
    comments_count: 8
  },
  {
    id: "u0v6w790-4qs1-2t09-7123-u6x54v1r9012",
    title: "Microservices Architecture",
    creator_name: "Lucas Martinez",
    comments_count: 11
  },
  {
    id: "v1w7x801-5rt2-3u10-8234-v7y65w2s0123",
    title: "Frontend Testing",
    creator_name: "Isabella Clark",
    comments_count: 6
  },
  {
    id: "w2x8y912-6su3-4v21-9345-w8z76x3t1234",
    title: "CI/CD Best Practices",
    creator_name: "Ethan Wright",
    comments_count: 7
  },
  {
    id: "x3y9z023-7tv4-5w32-0456-x9a87y4u2345",
    title: "Serverless Computing",
    creator_name: "Ava Johnson",
    comments_count: 5
  },
  {
    id: "y4z0a134-8uw5-6x43-1567-y0b98z5v3456",
    title: "Web Accessibility",
    creator_name: "Noah Wilson",
    comments_count: 8
  },
  {
    id: "z5a1b245-9vx6-7y54-2678-z1c09a6w4567",
    title: "Progressive Web Apps",
    creator_name: "Sophia Lee",
    comments_count: 9
  },
  {
    id: "a6b2c356-0wy7-8z65-3789-a2d10b7x5678",
    title: "Data Structures",
    creator_name: "Mason Taylor",
    comments_count: 12
  },
  {
    id: "b7c3d467-1xz8-9a76-4890-b3e21c8y6789",
    title: "Blockchain Basics",
    creator_name: "Ella Anderson",
    comments_count: 7
  },
  {
    id: "c8d4e578-2ya9-0b87-5901-c4f32d9z7890",
    title: "UI/UX Principles",
    creator_name: "Liam Martin",
    comments_count: 10
  },
  {
    id: "d9e5f689-3zb0-1c98-6012-d5g43e0a8901",
    title: "Cloud Security",
    creator_name: "Aria White",
    comments_count: 8
  },
  {
    id: "e0f6g790-4ac1-2d09-7123-e6h54f1b9012",
    title: "GraphQL Advanced",
    creator_name: "Jackson Brown",
    comments_count: 6
  },
  {
    id: "f1g7h801-5bd2-3e10-8234-f7i65g2c0123",
    title: "System Design",
    creator_name: "Victoria Chen",
    comments_count: 14
  },
  {
    id: "g2h8i912-6ce3-4f21-9345-g8j76h3d1234",
    title: "WebSocket Programming",
    creator_name: "Sebastian Lee",
    comments_count: 7
  },
  {
    id: "h3i9j023-7df4-5g32-0456-h9k87i4e2345",
    title: "Code Review Best Practices",
    creator_name: "Mia Garcia",
    comments_count: 9
  },
  {
    id: "i4j0k134-8eg5-6h43-1567-i0l98j5f3456",
    title: "Database Optimization",
    creator_name: "Alexander Kim",
    comments_count: 11
  },
  {
    id: "j5k1l245-9fh6-7i54-2678-j1m09k6g4567",
    title: "API Security",
    creator_name: "Chloe Wilson",
    comments_count: 8
  },
  {
    id: "k6l2m356-0gi7-8j65-3789-k2n10l7h5678",
    title: "Responsive Design",
    creator_name: "Owen Martinez",
    comments_count: 6
  },
  {
    id: "l7m3n467-1hj8-9k76-4890-l3o21m8i6789",
    title: "Testing Strategies",
    creator_name: "Zoe Thompson",
    comments_count: 7
  },
  {
    id: "m8n4o578-2ik9-0l87-5901-m4p32n9j7890",
    title: "Performance Optimization",
    creator_name: "Gabriel Davis",
    comments_count: 10
  },
  {
    id: "n9o5p689-3jl0-1m98-6012-n5q43o0k8901",
    title: "Design Patterns",
    creator_name: "Scarlett Wright",
    comments_count: 12
  },
  {
    id: "o0p6q790-4km1-2n09-7123-o6r54p1l9012",
    title: "Web Components",
    creator_name: "Leo Anderson",
    comments_count: 5
  },
  {
    id: "p1q7r801-5ln2-3o10-8234-p7s65q2m0123",
    title: "Functional Programming",
    creator_name: "Luna Parker",
    comments_count: 8
  },
  {
    id: "q2r8s912-6mo3-4p21-9345-q8t76r3n1234",
    title: "Backend Architecture",
    creator_name: "Felix White",
    comments_count: 9
  },
  {
    id: "r3s9t023-7np4-5q32-0456-r9u87s4o2345",
    title: "Software Architecture",
    creator_name: "Ruby Martin",
    comments_count: 11
  },
  {
    id: "s4t0u134-8oq5-6r43-1567-s0v98t5p3456",
    title: "Clean Code Principles",
    creator_name: "Atlas Chen",
    comments_count: 13
  },
  {
    id: "t5u1v245-9pr6-7s54-2678-t1w09u6q4567",
    title: "Debugging Techniques",
    creator_name: "Nova Wilson",
    comments_count: 7
  },
  {
    id: "u6v2w356-0qs7-8t65-3789-u2x10v7r5678",
    title: "Code Documentation",
    creator_name: "Kai Johnson",
    comments_count: 6
  },
  {
    id: "v7w3x467-1rt8-9u76-4890-v3y21w8s6789",
    title: "Tech Leadership",
    creator_name: "Aurora Lee",
    comments_count: 15
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiSuccessResponse<Article[]> | ApiErrorResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      status: 'error', 
      message: 'Method not allowed' 
    });
  }

  try {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;

    const paginatedArticles = articles.slice(offset, offset + limit);

    return res.status(200).json({
      status: 'success',
      data: paginatedArticles
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
} 