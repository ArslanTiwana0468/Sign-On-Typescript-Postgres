'use strict';
import { Model } from 'sequelize';
export interface projectAssignmentAttributes {
  ProjectId: number;
  UserId: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class projectAssignment extends Model<projectAssignmentAttributes> implements projectAssignmentAttributes {
    UserId!: string;
    ProjectId!: number;

    static associate(models: any) {
      // define association here
    }
  }
  projectAssignment.init(
    {
      ProjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Projects',
          key: 'id',
        },
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'projectAssignment',
    }
  );
  return projectAssignment;
};
