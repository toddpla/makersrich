import React, { Component } from 'react';

import {connect } from 'react-redux'
import { startAddQuestion } from '../../actions/questions'

class AddQuestionPage extends Component {

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
    console.log('here')
    this.props.startAddQuestion(question)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddQuestion}>
          <input type='text' id='question' placeholder='question' />
          <input type='text' id='answer1' placeholder='answer 1' />
          <input type='text' id='answer2' placeholder='answer 2' />
          <input type='text' id='answer3' placeholder='answer 3' />
          <input type='text' id='answer4' placeholder='answer 4' />
          <input type='text' id='correctAnswer'  placeholder='correct answer' />
          <input type='submit' value='submit' />
        </form>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => ({
  startAddQuestion: question => dispatch(startAddQuestion(question))
})

export default connect(undefined, mapDispatchToProps)(AddQuestionPage)
