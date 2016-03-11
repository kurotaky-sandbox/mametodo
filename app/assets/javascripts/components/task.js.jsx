var TaskApp = React.createClass({
  handleTaskSubmit: function(task) {
    this.setState({data: this.state.data.concat([task])});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: task,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  loadTaskFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(result) {
        this.setState({data: result});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadTaskFromServer();
    setInterval(this.loadTaskFromServer, this.props.pollInterval);
  },
  foo: function() {
    console.log('fooooo');
  },
  render: function() {
    return (
      <div className="taskApp">
        <h1>Listing Tasks</h1>
          <TaskForm onTaskSubmit={this.handleTaskSubmit} />
        <table>
          <thead>
            <tr>
              <th>Content</th>
              <th>Status</th>
              <th colSpan="3"></th>
            </tr>
          </thead>
          <TaskList data={this.state.data} foo={this.foo}/>
        </table>
      </div>
    );
  }
});

var TaskForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var content = ReactDOM.findDOMNode(this.refs.content).value.trim();
    if (!content) {
      return;
    }
    this.props.onTaskSubmit({task: {content: content, status: 'todo'}});
    ReactDOM.findDOMNode(this.refs.content).value = '';
    return;
  },
  render: function() {
    return (
      <form className="todoForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="ToDoをここに入力" ref="content" />
        <input type="submit" value="登録" />
      </form>
    );
  }
});

var TaskList = React.createClass({
  render: function() {
    var tasks = this.props.data.map(function (task) {
      return (
        <Task content={task.content} status={task.status}>
        </Task>
      );
    });
    return (
      <tbody>
        {tasks}
      </tbody>
    );
  }
});

var Task = React.createClass({
  onChangeSelectValue: function(e) {
    // this.setState({status: e.target.value});
    // this.props.onChangeStatus({status: e.target.value});
    console.log(this.props.content);
  },
  render: function() {
    return (
      <tr>
        <td>
          <input type="text" value={this.props.content} />
        </td>
        <td>
          <select value={this.props.status} onChange={this.onChangeSelectValue}>
            <option value="todo" key="todo">todo</option>
            <option value="doing" key="doing">doing</option>
            <option value="done" key="done">done</option>
          </select>
        </td>
        <td>Destroy</td>
      </tr>
    );
  }
});
