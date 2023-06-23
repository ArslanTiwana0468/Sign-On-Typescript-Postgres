'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../models/index';
export interface ProjectAttributes {
  id?: number;
  title: string;
  status: string;
  description: string;
}
class Project extends Model<ProjectAttributes> implements ProjectAttributes {
  id!: number;
  title!: string;
  status!: string;
  description!: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static associate(models: any) {
    // define association here
    Project.belongsToMany(models.User, {
      through: 'projectAssignment',
    });
  }
}
Project.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    status: DataTypes.STRING,
    description: DataTypes.STRING,
  },
  {
    sequelize: db.sequelize,
    modelName: 'Project',
  }
);
export default Project;
