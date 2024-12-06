import { Component, OnInit } from '@angular/core';
import { faker } from '@faker-js/faker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule


@Component({
  selector: 'app-root',
  imports:[CommonModule, FormsModule],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corrected the property name
})

export class AppComponent implements OnInit {
  randomSentence: string = '';
  userInput: string = '';
  intervalId: any;

  ngOnInit(): void {
    this.generateSentence();

    // Change the sentence every minute
    this.intervalId = setInterval(() => {
      this.generateSentence();
    }, 60000); // 1 minute
  }

  generateSentence(): void {
    this.randomSentence = faker.lorem.sentence();
    this.userInput = ''; // Clear user input for the new sentence
  }

  compare(letter: string, enteredCharacter: string): string {
    if (!enteredCharacter) {
      return 'pending'; // Gray for untouched
    }
    return letter === enteredCharacter ? 'correct' : 'incorrect';
  }

  // Check if the user input matches the random sentence
  get isSuccess(): boolean {
    return this.userInput === this.randomSentence;
  }
  
  ngOnDestroy(): void {
    clearInterval(this.intervalId); // Clear the interval to prevent memory leaks
  }
}
