import React from "react";

export default class Envelope extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 640"><path fill="#f7a1a1" d="M512 107.6c0-13.2-10.7-24-23.9-24H23.9C10.7 83.7 0 94.4 0 107.6v296.8c0 13.2 10.7 24 23.9 24h464.1c13.2 0 23.9-10.7 23.9-24V107.6zM480.7 101.9L256 288.7 31.3 101.9H480.7zM493.8 410.1H18.2V114.7l163.1 135.6c40.3 33.5 68.2 56.7 68.8 57.2 3.3 2.8 8.3 2.7 11.6 0l232-192.8V410.1z"></path></svg>
        );
    }
}
