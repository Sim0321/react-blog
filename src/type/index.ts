export type CategoryType = "Frontend" | "Backend" | "Web" | "Native";

export interface PostState {
  id?: string;
  title: string;
  summary: string;
  content: string;
  createAt: string;
  email: string;
  imgUrl: string[] | [];
  updatedAt?: string;
  uid: string;
  category?: CategoryType;
}
