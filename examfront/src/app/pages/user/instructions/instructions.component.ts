import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  
  qId = '';
  quiz = {
    title : '',
    description: '',
    maxMarks: '',
    numberOfQuestions:'',
    active: true,
    category:
    {
      cid: ''
    }

  };

  noOfQuestion:any;
  time : any;
  markOfEachQuestion : any;
  marks : any;

  constructor(private _route:ActivatedRoute, private _quiz:QuizService) {}
  
  ngOnInit(): void {
    
    this.qId = this._route.snapshot.params['qid'];
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>
      {
        this.quiz = data;
        this.noOfQuestion = this.quiz.numberOfQuestions;
        this.time = this.noOfQuestion*2;
        this.marks = this.quiz.maxMarks;
        this.markOfEachQuestion = this.marks / this.noOfQuestion;
        console.log(data);
      },
      (error:any)=>
      {
        Swal.fire("Error",'error while loading quiz','error');
      }
    );
    
  }

  

}
