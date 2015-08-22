var React = require('react');
var _     = require('lodash');

var QuestionPanel = require('./questionPanel');

class Winterfell extends React.Component {

  constructor(props) {
    super(props);

    var schema = this.props.schema; //@todo: Validate. Order things.

    var currentPanel = typeof schema !== 'undefined'
                         && typeof schema.formPanels !== 'undefined'
                         ? _.find(schema.formPanels,
                               panel => panel.panelId == this.props.panelId)
                         : undefined;


    this.state = {
      schema          : schema,
      currentPanel    : currentPanel,
      action          : this.props.action,
      questionAnswers : this.props.questionAnswers
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      action          : nextProps.action,
      schema          : nextProps.schema,
      questionAnswers : nextProps.questionAnswers
    });
  }

  handleAnswerChange(questionId, questionAnswer) {
    var questionAnswers = _.chain(this.state.questionAnswers)
                           .set(questionId, questionAnswer)
                           .value();

    this.setState({
      questionAnswers : questionAnswers,
    });
  }

  render() {
    var currentPanel = _.find(this.state.schema.questionPanels,
                          panel => panel.panelId == this.state.currentPanel.panelId);

    return (
      <form method={this.props.method}
            encType={this.props.encType}
            action={this.state.action}
            ref={this.props.ref}
            className={this.props.formClass}>
        <div className={this.props.wrapperClass}>
          <QuestionPanel schema={this.state.schema}
                         panelId={currentPanel.panelId}
                         panelIndex={currentPanel.panelIndex}
                         action={currentPanel.action}
                         button={currentPanel.button}
                         questionSets={currentPanel.questionSets}
                         questionAnswers={this.state.questionAnswers}
                         onAnswerChange={this.handleAnswerChange.bind(this)} />
        </div>
      </form>
    );
  }

};

// @todo: Proptypes

Winterfell.defaultProps = {
  schema          : {
    formPanels     : [],
    questionPanels : [],
    questionSets   : []

  },
  encType         : 'application/x-www-form-urlencoded',
  method          : 'POST',
  action          : '',
  ref             : 'form',
  formClass       : '',
  panelId         : 'panel-1',
  wrapperClass    : '',
  questionAnswers : {}
};

module.exports = Winterfell;