import React, {Component} from 'react';

import Client from '../front-end';
import Question from './Question';
import EmptyBoard from './EmptyBoard';
import AddQuestion from './AddQuestion';

import io from 'socket.io-client';

class QuestionBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
          questionBoard: [],
          master: this.props.route.master,
          masterKey: this.props.location.query.key
        };

        Client.getQuestionBoard(this.props.params.id, (questionB) => {
              if (questionB.doesNotExist) {
                console.log("Question Board does not exist!");
              } else {
                this.setState({
                  questionBoard: questionB.questionBoard
                })
              }
            });

        this.socket = io('/');
    }

    componentDidMount() {

      this.socket.on('connect', data => {
        this.socket.emit('joinB', this.props.params.id);
      });

    }

    render() {

      const questionBoard = this.state.questionBoard.map((question, i) => (
        <Question
          key={question._id}
          question ={question}
          index={i}
          socket={this.socket}
          qId={this.props.params.id}
        />
      ));

        return (
            <div id='questionQueue'>
                <div className='container'>
                  <div className='col-md-7 col-md-push-5'>
                    <div className='col-md text-center'>
                      <AddQuestion socket={this.socket} qId={this.props.params.id}/>
                    </div>
                  </div>

                  <div className='col-md-5 col-md-pull-7'>
                    <div className='col-md text-center'>
                        {(this.state.questionBoard.length !== 0) ? (questionBoard) : (<EmptyBoard key='emptyBoard'/>)}
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}

export default QuestionBoard;
