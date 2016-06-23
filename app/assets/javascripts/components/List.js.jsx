class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = { cards: [] };
    this.addCard = this.addCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }

	componentWillMount() {
		$.ajax({
      url: '/cards',
      type: 'GET',
      data: { list_id: this.props.id }
    }).done( cards => {
      this.setState({ cards: cards });
    })
	}

	addCard(e) {
		e.preventDefault();
		let name = this.refs.name;
		let description = this.refs.description;
		$.ajax({
			url: "/cards",
			type: "POST",
			data: { list_id: this.props.id, card: { name: name.value, description: description.value }}
		}).done( card => {
			this.setState({ cards: [{...card}, ...this.state.cards ]});
			name.value = null;
			description.value = null;
		});
	}

	deleteCard(id) {
		$.ajax({
			url: `/cards/${id}`,
			type: 'DELETE',
			data: { list_id: this.props.id },
			dataType: 'JSON'
		}).done( data => {
			let cards = this.state.cards;
			let index = cards.findIndex( c => c.id === id);
			this.setState({
				cards: [ ...cards.slice(0, index), ...cards.slice(index + 1, cards.length) ]
			})
		}).fail( data => {
			// TODO: handle this better
			alert('card not deleted');
		})
	}

	render() {
		let cards = this.state.cards.map( card => {
			return(
				<li key={`card-${card.id}`} className="collection-item">
			  	<div>{card.name}   
			    	<div className="secondary-content">{card.description}</div>
			  	</div>
			  	<button className='btn-floating red white-text' onClick={() => this.deleteCard(card.id)}>X</button>
				</li>
			);
	  });
 
	  return(
	    <div className="col s12 m4">
				<h5 className="center">{this.props.name}</h5>
				<ul className="collection">
					{ cards }
	    	</ul>
	    	<form onSubmit={this.addCard}>
	        <input placeholder="name" ref="name" />
	        <input placeholder="description" ref="description" />
	        <button className="btn" type="submit">Add Card</button>
				</form>
	  	</div>
	  )
	}
}