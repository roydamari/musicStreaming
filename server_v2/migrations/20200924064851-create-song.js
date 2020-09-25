'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      youtube_link: {
        type: Sequelize.STRING
      },
      album_id: {
        type: Sequelize.INTEGER
      },
      artist_id: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      lyrics: {
        type: Sequelize.STRING
      },
      track_number: {
        type: Sequelize.INTEGER
      },
      created_at: {
        type: Sequelize.DATE
      },
      upload_at: {
        type: Sequelize.DATE
      },
      likes: {
        type: Sequelize.BIGINT
      },
      play_count: {
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('songs');
  }
};