import React from "react";

export default class ProfileImg extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img className="profile parent-img" src={this.props.profilePicture} alt={this.props.name} title={this.props.name}/>
        );
    }
}
