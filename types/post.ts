import { ExtendedRecordMap } from "notion-types";

export type TPostStatus = "Private" | "Public" | "PublicOnDetail";
export type TPostType = "Post" | "Paper" | "Page";

export type TPost = {
  id: string;
  Name: string;
  fullWidth: boolean;
  createdTime: string;
  thumbnail: string;
  icon: string;
};

export type PostDetail = TPost & {
  recordMap: ExtendedRecordMap;
};

export type TPosts = TPost[];

export type TTags = {
  [tagName: string]: number;
};
export type TCategories = {
  [category: string]: number;
};
