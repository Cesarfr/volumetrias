$(document).ready(function(){
		// Defining the local dataset
		var cars = ['Audi', 'BMW', 'Bugatti', 'Ferrari', 'Ford', 'Lamborghini', 'Mercedes Benz', 'Porsche', 'Rolls-Royce', 'Volkswagen'];
		
		// Constructing the suggestion engine
		var cars = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.whitespace,
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			local: cars
		});
		
		// Initializing the typeahead
		$('#group_inp').typeahead({
			hint: true,
			highlight: true, /* Enable substring highlighting */
			minLength: 1 /* Specify minimum characters required for showing result */
		},
		{
			name: 'cars',
			source: cars
		});
	});  