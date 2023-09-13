import { Component } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent {

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

  constructor(private _quiz:QuizService){}

  ngOnInit(): void{

    this._quiz.quizzes().subscribe(
      (data: any)=>
      {this.quizzes = data;
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !! ','Error loading in server', 'error');
      }

      );
  }

  deleteQuiz(qId:any)
  {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }
    ).then((result)=>{

      if(result.isConfirmed)
      {
        this._quiz.deleteQuiz(qId).subscribe(
          (data:any)=>{
          this.quizzes = this.quizzes.filter((quiz)=>quiz.qId!=qId);   //to remove the quiz in that page only
          Swal.fire("Success","deleted successfully", 'success');
          },
          (error:any)=>{
            Swal.fire("Error !!", 'error while deleteing data', 'error');
          }
        );
      }
    }
    
    );
  }




}
