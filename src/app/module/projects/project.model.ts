import { Schema, model } from 'mongoose';
import { IProject, ProjectModel } from './project.interface';


export const projectSchema = new Schema<IProject, ProjectModel>(
  {
    
 
    projectName: {
      type: String,
      required: true,
      
    },
    projectType:{
      type: String,
      required: true,
    },
    liveProjectLink:{
      type: String,
      required: true,
    },
    
    projectImageUrl: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    githubClientLink: {
      type: String,
    },
    githubServerLink: {
      type: String,
    },


  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);



export const Project = model<IProject, ProjectModel>('Project', projectSchema);
