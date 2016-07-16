import React from 'react';
import '../styles/components/listHeader.scss';

export default class Sitter extends React.Component {
    constructor() {
        super();
    }
    render() {
        const listClassName = "list-header " + this.props.className;
        const firstTitle = this.props.title.split(" ")[0];
        const secondTitle = this.props.title.split(" ")[1];
        return (
            <section className= {listClassName}>
                <div className="icon star-container"></div>
                <div className="category">
                    <h2>{firstTitle}</h2>
                    <h2>{secondTitle}</h2>
                </div>
            </section>
        );
    }
}

