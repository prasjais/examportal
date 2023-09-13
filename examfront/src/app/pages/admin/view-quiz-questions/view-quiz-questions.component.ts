import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId = '';
  qTitle = '';

  questions = [
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
    },
  ];

  constructor(private _route:ActivatedRoute, private _question:QuestionService) {}
 
  ngOnInit(): void {

    this.qId = this._route.snapshot.params['id'];
    this.qTitle = this._route.snapshot.params['title'];
    console.log(this.qId);
    console.log(this.qTitle);
    
    //throw new Error('Method not implemented.');
    this._question.getQuestionOfQuiz(this.qId).subscribe(
      (data:any): void=>
      {
        this.questions = data;
      },
      (error:any)=>
      {
        console.log(error);
        Swal.fire("Error !!",'error while loading the questions','error');
      }
    );
  }

  public deleteQuestion(quesId: any)
  {
    Swal.fire({
      icon: 'info',
      title: "Are you sure ?",
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then(
      (result)=>{
        if(result.isConfirmed)
        {
          this._question.deleteQuestion(quesId).subscribe(
            (data:any)=>{
              this.questions = this.questions.filter((quest)=>quest.quesId!=quesId);
              Swal.fire("Success", "Deleted Successfully !!", 'success');
            },
            (error:any)=>{
              Swal.fire('Error', 'error while deleting', 'error');
            }
            
          );
        }
      }
    )
    
  }

  
}
