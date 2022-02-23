module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: { allowNull: false, type: DataTypes.STRING },
    content: { allowNull: false, type: DataTypes.STRING },
    userId: { allowNull: false, type: DataTypes.INTEGER },
  },
    {
      timestamps: true,
      createdAt: 'published',
      updatedAt: 'updated',
      tableName: 'BlogPosts',
    });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return BlogPost;
};
