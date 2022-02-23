module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
    { postId: DataTypes.INTEGER, categoryId: DataTypes.INTEGER },
    { timestamps: false });
  
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreingKey: 'categoryId',
      otherKey: 'postId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: PostCategory,
      foreingKey: 'postId',
      otherKey: 'categoryId',
    });
  };
  
  return PostCategory;
};
