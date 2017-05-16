import React from 'react';

class Home extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount() {
        if(typeof window !== 'undefined'){
            const script = document.createElement("script");

            script.src = "/service-worker/register-worker.js";
            script.async = true;

            document.body.appendChild(script);
        }
    }

    render() {
        return (
            <div>
                <h2>Home</h2>
                <p>Welcome to the site!</p>
                <p className="js">We have Javascript.</p>
                <p className="no-js">Yes, we have no Javascript.</p>
            </div>

        );
    }
}



export default Home;
    