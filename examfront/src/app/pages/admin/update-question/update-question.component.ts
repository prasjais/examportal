import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent  implements OnInit{

  quesId: '' | undefined ;
  quesTitle: '' | undefined;

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

  constructor(private _route:ActivatedRoute, private _ques:QuestionService, private _router:Router) {}

  ngOnInit(): void {

    this.quesId = this._route.snapshot.params['id'];
    this.quesTitle = this._route.snapshot.params['title'];
    console.log(this.quesId);
    console.log(this.quesTitle);

    this._ques.getSingleQuestion(this.quesId).subscribe(
      (data:any)=>
      {
        this.questions = data;
        console.log(this.questions);
      },
      (error:any)=>
      {
        Swal.fire("Error !!",'error while upadting','error');
      }
    );
  }

  public updateQuestion()
  {
    this._ques.updateQuestion(this.questions).subscribe(
      (data:any)=>
      {
        Swal.fire("Success !!", "Updated Successfully", 'success').then(
          (e)=>{
            this._router.navigate(['/admin/view-questions/'+this.quesId+'/'+this.quesTitle]);
          }
        );
      },
      (error:any)=>
      {
        Swal.fire("Error !!", "Error while updating", 'error');
      }
    );
  }



}
