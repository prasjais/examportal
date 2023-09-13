package com.exam.service.impl;

import com.exam.model.exam.Category;

import java.util.Set;

public interface CategoryService {

    public Category addCategory(Category category);

    public Category updateCategory(Category category);

    public Set<Category> getCategories();

    public Category getCategory(long categoryId);

    public void deleteCategory(long categoryId);
}
