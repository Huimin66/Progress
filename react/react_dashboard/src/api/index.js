import ajax from './ajax'

export const reqLogin  =(username, password)=>ajax('/login', {username, password}, 'Post');

export const reqAddUser = (user)=>ajax('/manage/user/add', user, 'Post');

// get category and subcategory
export const reqCategories = (parentId) =>
  ajax("/manage/category/list", { parentId });

  // add category
export const reqAddCategory = (categoryName, parentId) =>
  ajax("/manage/category/add", { categoryName, parentId }, "post");

  // update category
export const reqUpdateCategory = (categoryId, categoryName) =>
  ajax("/manage/category/update", { categoryId, categoryName }, "post");