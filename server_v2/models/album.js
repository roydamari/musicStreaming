'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.artist, {
        foreignKey: 'artistId'
      });
      this.hasMany(models.song, {
        foreignKey: 'albumId'
      });
    }
  };
  album.init({
    artistId: {
      type: DataTypes.INTEGER,
      field: 'artist_id'
    },
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
    modelName: 'album',
  });
  return album;
};