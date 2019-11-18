import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

class PhoneNoValidationForm extends Component {

    constructor() {
        super();

        this.state = {
            phoneNo: "",
            history: [{ value: '', display: 'Select phone number' }],
            selectedItem: "",
            tableData: [],
            //we should read it from some REST endpoint
            countryCode: "HK"

        }
        this.validatePhoneNo = this.validatePhoneNo.bind(this);
    }

    validatePhoneNo() {
        axios.get('http://apilayer.net/api/validate?access_key=ecddb4a256cc0427abc5f44d65d9d433&number=' + this.state.phoneNo
            + '&country_code=' + this.state.countryCode + '&format=1')
            .then(response => {
                var isValid = response.data.valid
                if (isValid === false) {
                    alert("Failure : The phone number is Invalid !")
                } else {
                    alert("Success : The phone number is Valid !")
                    this.setState({ tableData: this.state.tableData.concat(response.data) })
                }
                let dataForSelect = { value: response.data.local_format === "" ? this.state.phoneNo : response.data.local_format, display: response.data.valid };
                this.setState({ history: this.state.history.concat(dataForSelect) })
            })
            .catch(error => (
                console.log(error)
            ));
    }



    handlePhoneNoChange = (event) => {
        this.setState({
            phoneNo: event.target.value
        })
    }

    handleCountryCodeOnchange = (event) => {
        this.setState({
            countryCode: event.target.value
        })
    }

    handleSelectOnChange = (event) => {
        this.setState({
            selectedItem: event.target.value,
            phoneNo: event.target.value
        })
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Phone Number Validation App</h1>
                    <p>This APP helps to validate Phone numbers.</p>
                </div>
                <div className="row">
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
                            <div className="form-group col-sm-2" >
                                <label>Country Code:</label>
                                <input
                                    id="countryCode"
                                    className="form-control"
                                    value={this.state.countryCode}
                                    onChange={this.handleCountryCodeOnchange} />
                            </div>

                            <div className="form-group col-md-4">
                                <label>History :</label>
                                <select className="form-control" value={this.state.selectedItem} onChange={this.handleSelectOnChange}>
                                    {this.state.history.map((hist, i) => <option key={i} value={hist.value}>{hist.value}</option>)}
                                </select>
                            </div>
                        </form>
                    </div>

                </div>
                <div className="row col-md-12">
                    <button className="btn btn-primary col-md-1" onClick={this.validatePhoneNo}>Validate</button>
                </div>
                <div class="row form-group"></div>
                <div className="col">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Phone No</th>
                                <th scope="col">Validation Status</th>
                                <th scope="col">Local Format</th>
                                <th scope="col">International Format</th>
                                <th scope="col">Country Prefix</th>
                                <th scope="col">Country Code</th>
                                <th scope="col">Country Name</th>
                                <th scope="col">Carrier</th>
                                <th scope="col">Line Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tableData.map((data, i) =>
                                <tr key={i}>
                                    <td>{data.number}</td>
                                    <td>{data.valid === true ? "Valid" : "Invalid"}</td>
                                    <td>{data.local_format}</td>
                                    <td>{data.international_format}</td>
                                    <td>{data.country_prefix}</td>
                                    <td>{data.country_code}</td>
                                    <td>{data.country_name}</td>
                                    <td>{data.carrier}</td>
                                    <td>{data.line_type}</td>
                                </tr>)}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default PhoneNoValidationForm;