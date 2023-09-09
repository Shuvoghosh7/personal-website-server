import { Model } from "mongoose";

export type IProject = {
  projectName: string;
  projectType:string;
  liveProjectLink:string;
  projectImageUrl:string; 
  projectDescription:string;
  githubClientLink?:string;
  githubServerLink?:string;
};

export type ProjectModel = Model<IProject, Record<string, unknown>>;

export type IProjectFilters = {
  searchTerm?: string;
  projectName?: string;
};
