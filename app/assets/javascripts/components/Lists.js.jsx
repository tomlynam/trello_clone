class Lists extends React.Component {
	constructor(props) {
		super(props);
		this.state = { lists: this.props.lists };
    this.addList = this.addList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.updateList = this.updateList.bind(this);
    this.baseUrl = `/boards/${this.props.id}/lists`;
	}

	addList(list) {
		this.setState({ lists: [list, ...this.state.lists ]});
	}

	updateList(id, list) {
		$.ajax({
			url: `${this.baseUrl}/${id}`,
			type: 'PUT',
			data: { list: {...list} }
		}).done( list => {
			let lists = this.state.lists;
			let editList = lists.find( b => b.id === list.id );
			editList.name = list.name;
			editList.description = list.description;
			this.setState({lists: lists});
		});
	}

	deleteList(id) {
		$.ajax({
			url: `/boards/${this.props.boardId}/lists/${id}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done( data => {
			let lists = this.state.lists;
			let index = lists.findIndex( l => l.id === id);
			this.setState({
				lists: [ ...lists.slice(0, index), ...lists.slice(index + 1, lists.length) ]
			})
		}).fail( data => {
			// TODO: handle this better
			alert('list not deleted');
		})
	}

	render() {
  	let lists = this.state.lists.map( list => {
    	return(<List key={`list-${list.id}`} {...list} />);
  	});
  	return(
    	<div className="row">
      	<NewList id={this.props.id} addList={this.addList} />
      	<h2 className="center">Lists</h2>
        {lists}
    	</div>
  	);
  }
}
