export type User = {
  login: boolean;
  name?: string;
  address?: string;
};

export type HeroType = {
  type: string;
  image?: string;
  images?: string;
  videoUrl?: string;
} | null;
