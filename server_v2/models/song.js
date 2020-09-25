'use strict';
const {
  Model
} = require('sequelize');
const playlist = require('./playlist');
module.exports = (sequelize, DataTypes) => {
  class song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.album, {
        foreignKey: 'albumId'
      });
      this.belongsTo(models.artist, {
        foreignKey: 'artistId'
      });
      this.hasMany(models.playlist_songs, {
        foreignKey: 'id'
      });
    }
  };
  song.init({
    youtubeLink: {
      type: DataTypes.STRING,
      field: 'youtube_link'
    },
    albumId: {
      type: DataTypes.INTEGER,
      field: 'album_id'
    },
    artistId: {
      type: DataTypes.INTEGER,
      field: 'artist_id'
    },
    title: DataTypes.STRING,
    lyrics: DataTypes.STRING,
    trackNumber: {
      type: DataTypes.INTEGER,
      field: 'track_number'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    uploadAt: {
      type: DataTypes.DATE,
      field: 'upload_at'
    },
    likes: DataTypes.BIGINT,
    playCount: {
      type: DataTypes.BIGINT,
      field: 'play_count'
    }
  }, {
    sequelize,
    modelName: 'song',
  });
  return song;
};