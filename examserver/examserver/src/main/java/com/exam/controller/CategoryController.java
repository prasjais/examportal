package com.exam.controller;

import com.exam.model.exam.Category;
import com.exam.service.impl.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    //to add category
    @PostMapping("/")
    public ResponseEntity<Category> addCategory(@RequestBody Category category)
    {
        Category category1 = this.categoryService.addCategory(category);
        return ResponseEntity.ok(category1);
    }

    //to get category
    @GetMapping("/{categoryId}")
    public Category getCategory(@PathVariable("categoryId") long categoryId )
    {
        return this.categoryService.getCategory(categoryId);
    }

    //to get all category
    @GetMapping("/")
    public ResponseEntity<?> getCategories()
    {
        return ResponseEntity.ok(this.categoryService.getCategories());
    }

    //to update category
    @PutMapping("/")
    public Category updateCategory(@RequestBody Category category)
    {
        return this.categoryService.updateCategory(category);
    }

    //to delete category
    @DeleteMapping("/{categoryId}")
    public void deleteCategory(@PathVariable("categoryId") long categoryId)
    {
        this.categoryService.deleteCategory(categoryId);
    }

}
