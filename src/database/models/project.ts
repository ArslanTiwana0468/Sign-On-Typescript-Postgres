'use strict';
import { Model } from 'sequelize';
export interface ProjectAttributes {
  id: number;
  title: string;
  status: string;
  description: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Project extends Model<ProjectAttributes> implements ProjectAttributes {
    id!: number;
    title!: string;
    status!: string;
    description!: string;

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
      sequelize,
      modelName: 'Project',
    }
  );
  return Project;
};
