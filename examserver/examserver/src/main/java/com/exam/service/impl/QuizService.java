package com.exam.service.impl;

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;

import java.util.List;
import java.util.Set;

public interface QuizService {

    public Quiz addQuiz(Quiz quiz);

    public Quiz updateQuiz(Quiz quiz);

    public Set<Quiz> getQuizzes();

    public Quiz getQuiz(long quizId);

    public void deleteQuiz(long quizId);


    public List<Quiz> getQuizzesOfCategory(Category category);
}
