import React, { Component } from 'react';
import { ReactComponent as Lol } from '../assets/lol.svg';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

class Voucher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            discount: '15',
            isDisabled: true,
            warningMessage: false,
            correctVouchers: [
                'contractbook2019',
                'testvoucher123',
                'kill_the_printer'
            ]
        };
        this.textInput = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    componentDidMount() {
        const voucherInput = this.textInput.current;
        const source = fromEvent(voucherInput, 'keyup');
        const correctVouchers = this.state.correctVouchers;
        const eventHandler = source.pipe(map(event => event.target.value), debounceTime(300));
        eventHandler.subscribe(val => {
            const valid = correctVouchers.some(voucher => { return val.includes(voucher) })
            console.log(val, valid);
            if (valid) {
                this.setState({ isDisabled: false, warningMessage: false })
            }
            else if (val === '') {
                this.setState({ isDisabled: true, warningMessage: false })

            } else {
                this.setState({ isDisabled: true, warningMessage: true })
            }
        });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('You have submitted the code with discount: ' + this.state.discount + '%');
        event.preventDefault();
        this.resetForm()
    }

    resetForm() {
        this.setState({ value: '' });
    }

    render() {
        return (
            <section className="section">
                <article className="article">
                    <span className="title">
                        <Lol className="icon" />
                        <h2>Voucher</h2>
                    </span>
                    <p>Create contracts from scratch or use a free template. Try it out with your voucher!</p>
                    <form className="form-basic" onSubmit={this.handleSubmit}>
                        <input
                            ref={this.textInput}
                            type="text"
                            className="input-basic"
                            name="voucher"
                            placeholder="Enter the code"
                            id="voucher-input"
                            value={this.state.value}
                            onChange={this.handleChange}
                            required />
                        <input
                            className="btn"
                            type="submit"
                            value="Let's go!"
                            disabled={this.state.isDisabled}
                        />
                    </form>
                    {this.state.warningMessage
                        ? <div id="amount-warning">Sorry, your code is incorrect! :(</div>
                        : ''}
                </article>
            </section>
        );
    }
}

export default Voucher