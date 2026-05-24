export interface Character {
  id: string;
  name: string;
  gender: '여' | '남';
  age: number;
  role: string;
  alignment: string;
  keywords: string[];
  features: string;
  appearance: string;
  outfit: string;
  background: string;
  rumorText: string;
  imageUrl?: string;
}
