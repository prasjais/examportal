import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{

  qId = '';
  qTitle = '';

  questions = 
    {
      quesId: '',
      content: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
      quiz: {
        qId: '',
        title: '',
      }
    };

  constructor(private _route:ActivatedRoute, private _question:QuestionService) {}

  ngOnInit(): void {

    this.qId = this._route.snapshot.params['id'];
    this.qTitle = this._route.snapshot.params['title'];
    console.log(this.qId);
    console.log(this.qTitle);

    this.questions.quiz['qId'] = this.qId;
    this.questions.quiz['title'] = this.qTitle;
    
    
    //throw new Error('Method not implemented.');
  }

  formSubmit()
  {
    this._question.addQuestion(this.questions).subscribe(
      (data:any)=>
      {
        this.questions = data;
        Swal.fire("Success", "Question successfully added !!", 'success');
        this.questions.content='';
        this.questions.option1='';
        this.questions.option2='';
        this.questions.option3='';
        this.questions.option4='';
        this.questions.answer='';
      },
      (error:any)=>
      {
        Swal.fire("Error", "Error while loading data ", 'error');
      }
    );
  }

}
