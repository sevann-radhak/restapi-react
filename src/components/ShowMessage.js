import React, { Component } from 'react';

class ShowMessage extends Component {

    render(message) {
        return (
            <div className="card mt-4">
                <div className="card-header title-message">Mensaje enviado</div>

                <div className="card-header body-message">
                    <p>{this.props.message}</p>
                </div>


            </div>
        );
    }
}

export default ShowMessage;