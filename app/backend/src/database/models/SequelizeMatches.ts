import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';
import SequelizeTeams from './SequelizeTeams';

class SequelizeMatches extends
  Model<InferAttributes<SequelizeMatches>, InferCreationAttributes<SequelizeMatches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
  declare homeTeam?: CreationOptional<{ teamName: string }>;
}

SequelizeMatches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  tableName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeMatches.belongsTo(SequelizeTeams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
SequelizeMatches.belongsTo(SequelizeTeams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

SequelizeTeams.hasMany(SequelizeMatches, { foreignKey: 'homeTeamId', as: 'homeMatch' });
SequelizeTeams.hasMany(SequelizeMatches, { foreignKey: 'awayTeamId', as: 'awayMatch' });

export default SequelizeMatches;
