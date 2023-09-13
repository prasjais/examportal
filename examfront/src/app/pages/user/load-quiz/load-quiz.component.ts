import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit{

  catId: any;

  quizzes = [{
    qId : '',
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: '',
    category: 
    {
      title: ''
    }
  }
]

  constructor(private _route:ActivatedRoute, private _quiz:QuizService) {}
  ngOnInit(): void {

    this._route.params.subscribe(
      (params)=>
      {
        this.catId = params['catId'];
        if(this.catId==0)
        {
          console.log('Load all quizzes');
          this._quiz.quizzes().subscribe(
          (data:any)=>
          {
            this.quizzes = data;
            console.log(this.quizzes);
          },
          (error:any)=>
          {
          Swal.fire("Error","error while loading quizzes",'error');
          }
        );
      }
      else
      {
        console.log('Load specific category');
        this._quiz.getQuizzesOfCategory(this.catId).subscribe(
          (data:any)=>
          {
            this.quizzes = data;
          },
          (error:any)=>
          {
            Swal.fire("Error !!",'error while loading quizzes','error');
          }

        );
      }
    });
  }
}
