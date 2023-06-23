'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../models/index';

export interface projectAssignmentAttributes {
  id?: number;
  ProjectId: number;
  UserId: string;
}
class projectAssignment extends Model<projectAssignmentAttributes> implements projectAssignmentAttributes {
  id!: number;
  UserId!: string;
  ProjectId!: number;
}
projectAssignment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
    sequelize: db.sequelize,
    modelName: 'projectAssignment',
  }
);

export default projectAssignment;
