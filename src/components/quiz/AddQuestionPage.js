import React, { Component } from 'react';

import {connect } from 'react-redux'
import { startAddQuestion } from '../../actions/questions'

export class AddQuestionPage extends Component {

  handleAddQuestion = (e) => {
    e.preventDefault()
    const question = {
      question: e.target.question.value,
      answers: [
        e.target.answer1.value,
        e.target.answer2.value,
        e.target.answer3.value,
        e.target.answer4.value
      ],
      correctAnswer: e.target.correctAnswer.value
    }
    this.props.startAddQuestion(question)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddQuestion}>
          <textarea type='text' id='question' placeholder='Information' ></textarea>
          <textarea type='text' id='question' placeholder='Question' ></textarea>
          <input type='text' id='answer1' placeholder='Answer 1' />
          <input type='text' id='answer2' placeholder='Anwser 2' />
          <input type='text' id='answer3' placeholder='Anwser 3' />
          <input type='text' id='answer4' placeholder='Answer 4' />
          <input type='number' id='correctAnswer'  placeholder='Correct answer' />
          <input type='submit' value='Submits' />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddQuestion: question => dispatch(startAddQuestion(question))
})

export default connect(undefined, mapDispatchToProps)(AddQuestionPage)
