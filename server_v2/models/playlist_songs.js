'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class playlist_songs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.playlist, { foreignKey: 'playlistId' });
      this.belongsTo(models.song, { foreignKey: 'songId' });
    }
  };
  playlist_songs.init({
    songId: {
      type: DataTypes.INTEGER,
      field: 'song_id'
    },
    playlistId: {
      type: DataTypes.INTEGER,
      field: 'playlist_id'
    },
  }, {
    sequelize,
    modelName: 'playlist_songs',
  });
  return playlist_songs;
};