import React, { Component } from 'react';
import axios from 'axios';

// components
import ShowMessage from './ShowMessage';

// ES6 Modules or TypeScript
// import Swal from 'sweetalert2';

class Message extends Component {
    // state
    state = {
        message: null
    }

    // create the ref
    messageRef = React.createRef();

    // function to send the request to the API
    sendMessage = (e) => {
        // prevent to refresh page
        e.preventDefault();

        // read ref
        const message = {
            message: this.messageRef.current.value
        }

        try {
            var self = this;

            // axios to get the API service
            axios.post(`http://localhost:3100/api/message`, { message })
                .then(res => {
                    if (res.status === 200) {
                        // Alert
                        // Swal.fire({
                        //     position: 'top-end',
                        //     type: 'success',
                        //     title: 'Mensaje enviado correctamente a la API',
                        //     showConfirmButton: false,
                        //     timer: 1500
                        // })

                        // set new state value
                        this.setState({
                            message: res.data.message
                        });
                    }
                    else {
                        // Alert
                        alert(`Ocurrió un error inesperado con la API. Respuesta obtenida: ${res.status}`);

                        // Swal.fire({
                        //     type: 'error',
                        //     title: 'Oops...',
                        //     text: 'Algo salió mal.'
                        // })

                        // set new state value
                        self.setState({
                            message: null
                        });
                    }

                })
                .catch(function (error) {
                    // handle error
                    console.log(`Ocurrió un error con la API.`);
                    console.log(error);

                    // alert error
                    alert(`Ocurrió un error con la API. ${error}`);
                });

        } catch (error) {
            // handle error
                    console.log(`Ocurrió un error con la API.`);
        }

        // reset the form
        e.target.reset();
    }

    render() {
        const { message } = this.state;
        let messageToShow;

        // show if message was sent
        if (message !== null) {
            messageToShow = <ShowMessage message={message} />
        }

        return (
            <React.Fragment>
                <form onSubmit={this.sendMessage} className="col-8">
                    <legend className="text-center">Envía tu mensaje a la API</legend>
                    <div className="form-group">
                        <input type="text" ref={this.messageRef} className="form-control" placeholder="Escribe tu mensaje aquí..." />
                    </div>

                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
                {messageToShow}
            </React.Fragment>
        );
    }
}

export default Message;