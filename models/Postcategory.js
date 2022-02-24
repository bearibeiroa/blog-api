module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {},
    // { postId: DataTypes.INTEGER, categoryId: DataTypes.INTEGER },
    { timestamps: false, tableName: 'PostsCategories' });
  
  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategory,
      foreingKey: 'postId',
      otherKey: 'categoryId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreingKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  
  return PostCategory;
};
