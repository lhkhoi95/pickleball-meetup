interface User {
  id: string;
  name: string;
  email: string;
  skillLevel: string;
  frequency: string;
  location: string;
  created_at: string;
  updated_at: string;
}

interface UserCreate {
  id: string;
  name: string;
  email: string;
  skillLevel: string;
  frequency: string;
  location: string;
}
