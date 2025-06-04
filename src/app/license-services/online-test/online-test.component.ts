import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BackBtnComponent } from "../../shared/back-btn/back-btn.component";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  imageUrl?: string;
  selectedOption?: number;
}

@Component({
  selector: 'app-online-test',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackBtnComponent],
  templateUrl: 'online-test.component.html',
  styleUrls: ['online-test.component.css'],
})
export class OnlineTestComponent implements OnInit {
  learnerForm!: FormGroup;
  learnerVerified = false;
  generatedCaptcha: string = '';

  currentQuestionIndex: number = 0;
  score: number = 0;
  testCompleted: boolean = false;
  timeLeft: number = 1800; // 30 minutes
  timer: any;
  showReview: boolean = false;

  questions: Question[] = [
    {
      id: 1,
      text: 'What is the minimum safe following distance in ideal conditions?',
      options: ['1 second', '2 seconds', '3 seconds', '4 seconds'],
      correctAnswer: 0
    },
    {
      id: 2,
      text: 'When approaching a roundabout, you should:',
      options: [
        'Speed up to merge quickly',
        'Yield to traffic already in the roundabout',
        'Come to a complete stop before entering',
        'Honk to alert other drivers'
      ],
      correctAnswer: 0
    },
    {
      id: 3,
      text: 'What does a solid yellow line on your side of the road mean?',
      options: [
        'You may pass if it is safe to do so',
        'No passing allowed',
        'Hazard ahead',
        'Pedestrian crossing'
      ],
      correctAnswer: 0
    },
    {
      id: 4,
      text: 'When driving in fog, you should use:',
      options: [
        'High beam headlights',
        'Parking lights only',
        'Low beam headlights',
        'No lights'
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      text: 'The legal blood alcohol concentration (BAC) limit for drivers in India is:',
      options: ['0.05%', '0.03%', '0.08%', '0.00% (zero tolerance)'],
      correctAnswer:0 
    },
    {
      id: 6,
      text: 'When being overtaken by another vehicle, you should:',
      options: [
        'Increase your speed',
        'Move to the left',
        'Maintain your speed and lane position',
        'Sound your horn'
      ],
      correctAnswer: 1
    },
    {
      id: 7,
      text: 'What should you do when approaching a school zone?',
      options: [
        'Speed up to pass quickly',
        'Reduce speed and watch for children',
        'Honk to alert pedestrians',
        'Ignore unless you see children'
      ],
      correctAnswer: 0
    },
    {
      id: 8,
      text: 'When your vehicle starts to skid, you should:',
      options: [
        'Brake hard',
        'Steer in the direction of the skid',
        'Accelerate quickly',
        'Turn the steering wheel sharply'
      ],
      correctAnswer: 0
    },
    {
      id: 9,
      text: 'The maximum speed limit for cars in city areas is typically:',
      options: ['40 km/h', '50 km/h', '60 km/h', '70 km/h'],
      correctAnswer: 0
    },
    {
      id: 10,
      text: 'Using a mobile phone while driving is:',
      options: [
        'Allowed only for short calls',
        'Permitted with hands-free devices',
        'Prohibited except for emergencies',
        'Allowed at any time'
      ],
      correctAnswer: 1
    }
  ];

  constructor(
    public router: Router,
    public location: Location,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.generatedCaptcha = this.generateCaptcha();
    this.learnerForm = this.fb.group({
      licenseNumber: ['', Validators.required],
      captcha: ['', Validators.required]
    });
    this.startTimer();
  }

  generateCaptcha(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: 6 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.finishTest();
      }
    }, 1000);
  }

  verifyLearnerDetails(): void {
    const llNumber = this.learnerForm.value.licenseNumber;
    const enteredCaptcha = this.learnerForm.value.captcha;

    if (enteredCaptcha !== this.generatedCaptcha) {
      alert('Invalid captcha.');
      this.generatedCaptcha = this.generateCaptcha();
      this.learnerForm.controls['captcha'].reset();
      return;
    }

    this.http.post<{ message: string }>('http://localhost:3000/api/verify-ll-test-access', { llNumber })
      .subscribe({
        next: (res) => {
          alert(res.message);
          this.learnerVerified = true;
        },
        error: (err) => {
          alert(err.error?.message || 'Verification failed');
        }
      });
  }

  selectOption(optionIndex: number): void {
    this.questions[this.currentQuestionIndex].selectedOption = optionIndex;
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  markForReview(): void {
    // Placeholder: you can add a `markedForReview` field if needed
    this.nextQuestion();
  }

  finishTest(): void {
    clearInterval(this.timer);
    this.calculateScore();
    this.testCompleted = true;

    const llNumber = this.learnerForm.value.licenseNumber;
    const totalQuestions = this.questions.length;
    const percentage = (this.score / totalQuestions) * 100;
    const status = percentage >= 70 ? 'Pass' : 'Fail';

    this.http.post('http://localhost:3000/api/save-test-result', {
      llNumber,
      score: this.score,
      totalQuestions,
      status
    }).subscribe({
      next: (res: any) => {
        console.log('Result saved:', res.message);
      },
      error: (err: any) => {
        console.error('Error saving result:', err.error?.message || err.message);
      }
    });
  }

  calculateScore(): void {
    this.score = 0;
    this.questions.forEach((q) => {
      if (q.selectedOption != null && q.selectedOption === q.correctAnswer) {
        this.score++;
      }
    });
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  restartTest(): void {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.timeLeft = 1800;
    this.testCompleted = false;
    this.questions.forEach(q => delete q.selectedOption);
    this.startTimer();
  }

  exitTest(): void {
    this.location.back();
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }
}
