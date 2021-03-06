import React from 'react';
import ReviewList from "../components/ReviewList";
import '../styles/components/sitterPage.scss';
import Dollar from '../styles/icons/Dollar';
import Star from '../styles/icons/Star';
import Family from '../styles/icons/Family';
import Envelope from '../styles/icons/Envelope';

export default class SitterProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {reviews: [], email: this.props.params.sitter, name: "", minAge: 0, hourFee: "",
            maxAge: 5, rating: "", sitterEmail: "", sitterPicture: ""};
    }

    componentDidMount() {
        this.loadSitterFromServer();
    }

    loadSitterFromServer() {
        $.ajax({
            url: "https://sitters-ws.herokuapp.com/getSitterByEmail",
            dataType: 'json',
            contentType: "application/json",
            type: 'POST',
            data: JSON.stringify({email : this.state.email}),
            success: function (data) {
                this.setState({reviews: data.reviews, name: data.name, minAge: data.minAge, hourFee: data.hourFee,
                    maxAge: data.maxAge, rating: data.rating, siiterEmail: data.email, sitterPicture: data.fullPictureURL});
                localStorage.sitterEmail = data.email;
                localStorage.sitterName = data.name;
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        const css = {background: 'url('+this.state.sitterPicture+') no-repeat center center ' + '/cover'};
        const mailto = "mailto:" + this.state.email;
        const firstNameLower = this.state.name.split(' ')[0];
        const firstName = firstNameLower.toUpperCase();
        const inviteLink = '/sendInvite';
        return (
            <div className="sitter-wrapper">
                <header style={css}>
                    <section className="profilePicture">
                        <section className="hello">
                            <p >Say Hello to</p>
                            <h3 className="sitter-name">{this.state.name}</h3>
                        </section>
                        <section className="knowMore">
                            <p >GET TO KNOW {firstName}</p>
                            <a href="#"><i>See more</i></a>
                        </section>
                    </section>
                </header>
                <section className="invite-icon-list" id="sitter-profile-icons">
                    <section className="invite-icon">
                        <Dollar/>
                        <p className="invite-address">{this.state.hourFee}$</p>
                        <p className="invite-address">Hour fee</p>
                    </section>
                    <section className="invite-icon">
                        <Star/>
                        <p className="invite-address">{this.state.rating}</p>
                        <p className="invite-address">Rating</p>
                    </section>
                    <section className="invite-icon">
                        <Family/>
                        <p className="invite-address">{this.state.minAge}-{this.state.maxAge}</p>
                        <p className="invite-address">Years</p>
                    </section>
                </section>
                 <ReviewList allReviews={this.state.reviews}/>
                 <section className="contact-sitter">
                     <Envelope/>
                    <p>Have a question?<a href={mailto}>Contact {firstNameLower}</a></p>
                </section>
                <a className="submit-invite" href={inviteLink}>Book now</a>
            </div>
        );
    }
}










