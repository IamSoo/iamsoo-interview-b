import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

class PhoneNoValidationForm extends Component {

    constructor(props) {
        super(props);

        this.history = [];

        this.state = {
            phoneNo: "",
            history: this.history,
        }
        this.validatePhoneNo = this.validatePhoneNo.bind(this);
    }

    validatePhoneNo() {
        axios.get('http://apilayer.net/api/validate?access_key=ecddb4a256cc0427abc5f44d65d9d433&number=' + this.state.phoneNo + '&country_code=HK&format=1')
            .then(response => {
                var isValid = response.data.valid
                if (isValid === false) {
                    alert("The phone number is Invalid !")
                } else {
                    alert("The phone number is Valid !")
                }
                
            })
            .then(json => {
                console.log(json)
            })
            .catch(error => (
                console.log(error)
            ));
    }


    handlePhoneNoChange = (event) => {
        var joined = this.state.history.concat(event.target.value);
        this.setState({
            phoneNo: event.target.value,
            history: joined 
        })
    }

    handleSelectOnChange = (event) => {
        var joined = this.state.history.concat(event.target.value);
        this.setState({
            phoneNo: event.target.value,
            history: joined 
        })
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Phone Number Validation App</h1>
                    <p>This APP helps to validate Hong Kong phone numbers.</p>
                </div>

                <div className="row">
                    <div className="col">
                        <form>
                            <div className="form-group col-md-4" >
                                <label>Phone No:</label>
                                <input
                                    id="phoneNo"
                                    className="form-control"
                                    value={this.state.phoneNo}
                                    onChange={this.handlePhoneNoChange} />
                            </div>
                            <div className="form-group col-md-4" >
                                <label>History :</label>
                                <select
                                    id="history"
                                    multiple={false}
                                    className="form-control"
                                    value={this.state.history}
                                    onChange={this.handlePhoneNoChange} />
                            </div>
                        </form>
                    </div>
                    </div>
               
                <div className="row col-md-4">
                    <button className="btn btn-primary" onClick={this.validatePhoneNo}>Validate</button>
                </div>
                <p className="h2 text-lg-left">Phone number Validation History</p>
                <div className="col">
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">PhoneNo</th>
                                    <th scope="col">ValidStatus</th>
                                    <th scope="col">Exception</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
            </div>
        )
    }

}

export default PhoneNoValidationForm;