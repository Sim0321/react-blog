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
  comments?: CommentsInterface[];
}

export interface CommentsInterface {
  content: string;
  uid: string;
  email: string;
  createdAt: string;
}
