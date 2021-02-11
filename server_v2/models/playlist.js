'use strict';
const {
  Model
} = require('sequelize');
const playlist_songs = require('./playlist_songs');
module.exports = (sequelize, DataTypes) => {
  class playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.playlist_songs, {
        foreignKey: 'id'
      });
    }
  };
  playlist.init({
    name: DataTypes.STRING,
    coverImg: {
      type: DataTypes.STRING,
      field: 'cover_img'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    uploadAt: {
      type: DataTypes.DATE,
      field: 'upload_at'
    },
  }, {
    sequelize,
    modelName: 'playlist',
  });
  return playlist;
};