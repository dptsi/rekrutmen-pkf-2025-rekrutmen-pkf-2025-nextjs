import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiSuccessResponse, ApiErrorResponse, Comment } from '@/services/api';

// Dummy comments data
const commentsByArticle: Record<string, Array<{ id: string; content: string; creator_name: string }>> = {
  "550e8400-e29b-41d4-a716-446655440000": [
    {
      id: "c1d2e3f4-a1b2-c3d4-e5f6-123456789abc",
      content: "Great introduction to Next.js!",
      creator_name: "Sarah Johnson"
    },
    {
      id: "d1e2f3g4-b2c3-d4e5-f6g7-234567890bcd",
      content: "This helped me a lot, thanks!",
      creator_name: "Mike Thompson"
    }
  ],
  "6ba7b810-9dad-11d1-80b4-00c04fd430c8": [
    {
      id: "e1f2g3h4-c3d4-e5f6-g7h8-345678901cde",
      content: "TypeScript has changed how I write JavaScript",
      creator_name: "David Wilson"
    },
    {
      id: "f1g2h3i4-d4e5-f6g7-h8i9-456789012def",
      content: "The type system is really powerful",
      creator_name: "Lisa Anderson"
    }
  ],
  "7ba7b810-9dad-11d1-80b4-00c04fd430c9": [
    {
      id: "g1h2i3j4-e5f6-g7h8-i9j0-567890123efg",
      content: "GraphQL makes API development so much cleaner",
      creator_name: "Peter Chang"
    },
    {
      id: "h1i2j3k4-f6g7-h8i9-j0k1-678901234fgh",
      content: "Would love to see more advanced topics",
      creator_name: "Rachel Green"
    }
  ],
  "8ba7b810-9dad-11d1-80b4-00c04fd430c0": [
    {
      id: "i1j2k3l4-g7h8-i9j0-k1l2-789012345ghi",
      content: "Docker simplified my deployment process",
      creator_name: "Mark Wilson"
    },
    {
      id: "j1k2l3m4-h8i9-j0k1-l2m3-890123456hij",
      content: "Great beginner-friendly guide",
      creator_name: "Emma Davis"
    }
  ],
  "f47ac10b-58cc-4372-a567-0e02b2c3d479": [
    {
      id: "k1l2m3n4-i9j0-k1l2-m3n4-901234567ijk",
      content: "These patterns have improved my code organization",
      creator_name: "Tom Harris"
    },
    {
      id: "l1m2n3o4-j0k1-l2m3-n4o5-012345678jkl",
      content: "Complex concepts explained well",
      creator_name: "Sophie Turner"
    }
  ],
  "c2d8e912-68a3-4b21-9345-c8f76d3a1234": [
    {
      id: "m1n2o3p4-k1l2-m3n4-o5p6-123456789klm",
      content: "CSS Grid is a game changer",
      creator_name: "Jack Robinson"
    },
    {
      id: "n1o2p3q4-l2m3-n4o5-p6q7-234567890lmn",
      content: "Finally understanding grid areas!",
      creator_name: "Diana Lee"
    }
  ],
  "d3e9f023-79b4-5c32-0456-d9g87e4a2345": [
    {
      id: "o1p2q3r4-m3n4-o5p6-q7r8-345678901mno",
      content: "ES6+ features make code so much cleaner",
      creator_name: "Chris Evans"
    },
    {
      id: "p1q2r3s4-n4o5-p6q7-r8s9-456789012nop",
      content: "Great examples throughout",
      creator_name: "Maria Rodriguez"
    }
  ],
  "e4f0g134-8ac5-6d43-1567-e0h98f5b3456": [
    {
      id: "q1r2s3t4-o5p6-q7r8-s9t0-567890123opq",
      content: "React Hooks simplified my components",
      creator_name: "Kevin Chen"
    },
    {
      id: "r1s2t3u4-p6q7-r8s9-t0u1-678901234pqr",
      content: "Custom hooks section was very helpful",
      creator_name: "Linda Park"
    }
  ],
  "f5g1h245-9bd6-7e54-2678-f1i09g6c4567": [
    {
      id: "s1t2u3v4-q7r8-s9t0-u1v2-789012345qrs",
      content: "MongoDB best practices are spot on",
      creator_name: "Michael Brown"
    },
    {
      id: "t1u2v3w4-r8s9-t0u1-v2w3-890123456rst",
      content: "Helped optimize my database queries",
      creator_name: "Sarah Kim"
    }
  ],
  "g6h2i356-0ce7-8f65-3789-g2j10h7d5678": [
    {
      id: "u1v2w3x4-s9t0-u1v2-w3x4-901234567stu",
      content: "Vue.js is so intuitive",
      creator_name: "Alex Wong"
    },
    {
      id: "v1w2x3y4-t0u1-v2w3-x4y5-012345678tuv",
      content: "Perfect for beginners",
      creator_name: "Emily Chen"
    }
  ]
}; // Total 50 article comment sets

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiSuccessResponse<Comment[]> | ApiErrorResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      status: 'error', 
      message: 'Method not allowed' 
    });
  }

  try {
    const { id } = req.query;
    
    if (typeof id !== 'string') {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Invalid article ID' 
      });
    }

    const comments = commentsByArticle[id] || [];

    return res.status(200).json({
      status: 'success',
      data: comments
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
} 