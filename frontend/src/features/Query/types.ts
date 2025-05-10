// Define interfaces for the key objects in the component
interface User {
    id: number;
    first_name: string;
    last_name: string;
  }
  
  interface Tag {
    id: number;
    name: string;
  }
  
  interface Response {
    id: number;
    user: User;
    content: string;
    created_at: string;
    upvotes: number;
    downvotes: number;
    likes: number;
    approval: boolean;
    flagged: boolean;
  }
  
  interface Query {
    id: number;
    title: string;
    content: string;
    user: User;
    created_at: string;
    updated_at: string;
    status: boolean;
    flagged: boolean;
    tags?: Tag[];
    responses?: Response[];
  }