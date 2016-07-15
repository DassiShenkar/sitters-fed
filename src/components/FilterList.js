import React from "react";
import StarRatingComponent from 'react-star-rating-component';
import SitterList from '../components/SitterList';
import '../styles/components/filters.scss';

export default class FilterList extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedFilter: "availableNow",
            subFilter: "",
            rating: 5,
            workingHours: "mornings",
            gender: "male",
            availableSitters: null,
            favoriteSitters: null,
            topSitters: null,
            sittersByGender: null,
            sittersByHours: null,
            allSitters: null
        }
    }
    
    loadAllSittersFromServer() {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getAllSitters',
            dataType: 'json',
            success: function (data) {
                this.setState({allSitters: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    loadAvailableSittersFromServer() {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getAvailableNowSitters',
            dataType: 'json',
            success: function (data) {
                this.setState({availableSitters: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    loadTopSittersFromServer() {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getTopRatedSitters',
            dataType: 'json',
            success: function (data) {
                this.setState({topSitters: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    loadParentFavoriteSittersFromServer() {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getParentFavoriteSitters',
            dataType: 'json',
            type : 'post',
            contentType: 'application/json',
            data: JSON.stringify({ 'email': localStorage.email}),
            success: function (data) {
                this.setState({favoriteSitters: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString()); //TODO: remove console.log
            }.bind(this)
        });
    }

    loadByWorkingHours(workingHours) {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getSittersByWorkingHours',
            dataType: 'json',
            type : 'post',
            contentType: 'application/json',
            data: JSON.stringify({ 'workingHours': workingHours}),
            success: function (data) {
                this.setState({sittersByHours: data});
                console.log(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString()); //TODO: remove console.log
            }.bind(this)
        });
    }

    loadSittersByGender(gender) {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getSitterByGender',
            dataType: 'json',
            type : 'post',
            contentType: 'application/json',
            data: JSON.stringify({ 'gender': gender}),
            success: function (data) {
                this.setState({sittersByGender: data});
                console.log(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString()); //TODO: remove console.log
            }.bind(this)
        });
    }

    onChange(filterName) {
        switch (filterName) {
            case "availableNow":
                this.setState({selectedFilter: "availableNow"});
                if(!this.state.availableSitters) {
                    this.loadAvailableSittersFromServer();
                }
                break;
            case "rating":
                this.setState({selectedFilter: "topSitters"});
                this.loadTopSittersFromServer();
                break;
            case "workingHours":
                this.setState({selectedFilter: "workingHours"});
                this.loadByWorkingHours("All day");
                break;
            case "favorites":
                this.setState({selectedFilter: "favorites"});
                break;
            case "gender":
                this.setState({selectedFilter: "gender"});
                this.loadSittersByGender("male");
                break;
            case "seeAll":
                this.setState({selectedFilter: "seeAll"});
                this.loadAllSittersFromServer();
                break;
            case "mornings":
                this.setState({subFilter: "mornings"});
                this.loadByWorkingHours("Mornings");
                break;
            case "evenings":
                this.setState({subFilter: "evenings"});
                this.loadByWorkingHours("Evenings");
                break;
            case "allDay":
                this.setState({subFilter: "allDay"});
                this.loadByWorkingHours("All day");
                break;
            case "male":
                this.setState({subFilter: "male"});
                this.loadSittersByGender("male");
                break;
            case "female":
                this.setState({subFilter: "female"});
                this.loadSittersByGender("female");
                break;
        }

    }

    onStarClick(name, value) {
        this.setState({rating: value});
    }

    render() {
        let available, favorites, topRated, workingHours, gender, seeAll;
        if(this.state.availableSitters && this.state.selectedFilter === "availableNow") {
            available = <SitterList className="sitters-available-now" title="AVAILABLE NOW" sittersData={this.state.availableSitters}/>;
        }
        if(this.state.topSitters && this.state.selectedFilter === "topSitters") {
            topRated = <SitterList className="sitters-top-rated" title="TOP RATED" sittersData={this.state.topSitters}/>;
        }
        if(this.state.sittersByHours && this.state.selectedFilter === "workingHours") {
            workingHours = <SitterList className="sitters-working-hours" title="WORKING HOURS" sittersData={this.state.sittersByHours}/>;
        }
        if(this.state.favoriteSitters && this.state.selectedFilter === "favorites") {
            favorites = <SitterList className="sitters-favorites" title="MY FAVORITES" sittersData={this.state.favoriteSitters}/>;
        }
        if(this.state.sittersByGender && (this.state.selectedFilter === "gender" || this.state.subFilter === "male" || this.state.subFilter === "female")) {
            gender = <SitterList className="sitters-gender" title="GENDER" sittersData={this.state.sittersByGender}/>;
        }
        if(this.state.allSitters && this.state.selectedFilter === "seeAll") {
            seeAll = <SitterList className="sitters-see-all" title="ALL" sittersData={this.state.allSitters}/>;
        }
        return (
            <div className="filter-list" onChange={this.onChange.bind(this)}>
                <h1>Sort by</h1>
                <div>
                    <label htmlFor="available-now">Available Now
                        <input id="available-now" value="available-now" type="radio" name="filter" onChange={this.onChange.bind(this, "availableNow")}/>
                    </label>
                </div>
                <div>
                    <label htmlFor="rating">Rating
                        <input id="rating" value="rating" type="radio" name="filter" onChange={this.onChange.bind(this, "rating")}/>
                    </label>
                </div>
                <div>
                    <label htmlFor="working-hours">Working Hours
                        <input id="working-hours" value="available-now" type="radio" name="filter" onChange={this.onChange.bind(this, "workingHours")}/>
                    </label>
                </div>
                <div>
                    <label htmlFor="favorites">Favorites
                        <input id="favorites" value="favorites" type="radio" name="filter" onChange={this.onChange.bind(this, "favorites")}/>
                    </label>
                </div>
                <div>
                    <label htmlFor="gender">Gender
                        <input id="gender" value="gender" type="radio" name="filter" onChange={this.onChange.bind(this, "gender")}/>
                    </label>
                </div>
                <div>
                    <label htmlFor="see-all">See All
                        <input id="see-all" value="see-all" type="radio" name="filter" onChange={this.onChange.bind(this, "seeAll")}/>
                 </label>
                </div>
                {this.state.selectedFilter === "topSitters"? <section className="sub-filter"><h3>Rating</h3><StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={this.state.rating}
                    onStarClick={this.onStarClick.bind(this)}
                /></section> : null}
                {this.state.selectedFilter === "workingHours"? <section className="sub-filter"><h3>Working Hours</h3>
                    <div>
                        <label htmlFor="morning">Mornings
                            <input id="morning" value="morning" type="radio" name="working-hours-radio" onChange={this.onChange.bind(this, "mornings")}/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="evening">Evenings
                            <input id="evening" value="evening" type="radio" name="working-hours-radio" onChange={this.onChange.bind(this, "evenings")}/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="all-day">All day
                            <input id="all-day" value="all-day" type="radio" name="working-hours-radio" onChange={this.onChange.bind(this, "allDay")}/>
                        </label>
                    </div>
                </section> : null}
                {this.state.selectedFilter === "gender"? <section className="sub-filter"><h3>Gender</h3>
                    <div>
                        <label htmlFor="male">Male
                            <input id="male" value="male" type="radio" name="gender-radio" onChange={this.onChange.bind(this, "male")}/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="female">Female
                            <input id="female" value="female" type="radio" name="gender-radio" onChange={this.onChange.bind(this, "female")}/>
                        </label>
                    </div>
                </section> : null}
                {available}
                {favorites}
                {topRated}
                {workingHours}
                {seeAll}
            </div>
        );
    }
}