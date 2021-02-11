'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.album, {
        foreignKey: 'id'
      });
      this.hasMany(models.song, {
        foreignKey: 'artistId'
      });
    }
  };
  artist.init({
    name: DataTypes.STRING,
    coverImg: {
      type: DataTypes.STRING,
      field: 'cover_img'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
  }, {
    sequelize,
    modelName: 'artist',
  });
  return artist;
};