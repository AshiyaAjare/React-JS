// src/features/Responses/types.ts
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  role: string; 
}

export interface Query {
  id: number;
  title: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Response {
  id: number;
  user_id: number;
  query_id: number;
  content: string;
  upvotes: number;
  downvotes: number;
  likes: number;
  approval: boolean;
  flagged: boolean;
  created_at: string;
  updated_at: string;
  discarded_at: string | null;
  tags: Tag[];
  query: Query;
  user: User;
}