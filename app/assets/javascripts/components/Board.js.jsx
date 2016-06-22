class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = { edit: false };
  	this.toggleEdit = this.toggleEdit.bind(this);
  	this.updateBoard = this.updateBoard.bind(this);
  	this.showBoard = this.showBoard.bind(this);
	}

	toggleEdit() {
	  this.setState({ edit: !this.state.edit });
	}

	updateBoard() {
		let board = { name: this.refs.name.value, description: this.refs.description.value }
		this.toggleEdit();
		this.props.updateBoard(this.props.id, board);
	}

	showBoard() {
	  window.location.href = `/boards/${this.props.id}/lists`;
	}

	edit() {
	  return(
	    <div className="col s12 m4">
	      <div className="card blue-grey darken-1">
	        <div className="card-content white-text">
	          <input placeholder={this.props.name} defaultValue={this.props.name} ref="name" required={true}/>
	          <input placeholder={this.props.description} defaultValue={this.props.description} ref="description" />
	        </div>
	        <div className="card-action">
	          <button onClick={this.toggleEdit} className="btn blue">Cancel</button>
	          <button onClick={this.updateBoard} className="btn">Save</button>
	        </div>
	     </div>
	   </div>
	  );
	}

	show() {
		return(
			<div>
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text" onClick={() => this.props.showBoard(this.props)}>
              <span className="card-title">{this.props.name}</span>
              <p>{this.props.description}</p>
            </div>
            <div className="card-action">
							<button onClick={this.toggleEdit} className="btn blue">Edit</button>
              <button className='btn red' onClick={() => this.props.deleteBoard(this.props.id)}>Delete</button>
              <button onClick={this.showBoard} className="btn">Show</button>
            </div>
          </div>
        </div>
      </div>
		)
	}

	render() {
		if (this.state.edit)
			return this.edit();
		else
			return this.show();
	}
}

