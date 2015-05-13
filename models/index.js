var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tripPlanner');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Hotel, Place, ThingsToDo, Restaurant;

var Schema = mongoose.Schema;


var placeSchema = new Schema({
	address: {type: String, required: true},
	city: {type: String, required: true},
	state: String,
	phone: String,
	location: [Number]
});

var hotelSchema = new Schema({
	name: String,
	place: {type: Schema.Types.ObjectId, ref: 'Place'},
	stars: {type: Number, min:1, max:5},
	ammenities: String //csv
});

var thingToDoSchema = new Schema({
	name: String,
	place: {type: Schema.Types.ObjectId, ref: 'Place'},
	age_range: String
});

var restaurantSchema = new Schema({
	name: String,
	place: {type: Schema.Types.ObjectId, ref: 'Place'},
	cuisine: String, //csv
	price: {type: Number, min: 1, max:5}
});

hotelSchema.methods.getAmenities = function(){
	return splitter(this.ammenities);
}

restaurantSchema.methods.getCuisine = function(){
	return splitter(this.cuisine);
}

function splitter(str){
	return str.split(',')
}

var mod = mongoose.model;

Place = mongoose.model('Place', placeSchema);
Hotel = mongoose.model('Hotel', hotelSchema);
ThingToDo = mongoose.model("ThingsToDo",thingToDoSchema);
Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = {
	Hotel: Hotel,
	Place: Place,
	ThingToDo: ThingToDo,
	Restaurant: Restaurant
}