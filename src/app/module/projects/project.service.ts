import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { projectSearchableFields } from "./project.constent";
import { IProject, IProjectFilters } from "./project.interface";
import { Project } from "./project.model";


const getAllProject = async (
  filters: IProjectFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IProject[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        $or: projectSearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }

    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
    const result = await Project.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Project.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const createProject = async (
  payload: IProject
): Promise<IProject | null> => {
  const result = await Project.create(payload)
  return result;
};

export const ProjectsService = {
  getAllProject,
  createProject
};
