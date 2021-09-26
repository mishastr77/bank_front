import React, { Component } from "react";
import PropTypes from "prop-types";
import Section from "../Section";
import shortid from "shortid";
import styles from "./form.module.css";

class Form extends Component {
  state = {
    name: "",
    country: "",
    currency: "",
    interestRate: "",
    maxLoan: "",
    minDownPayment: "",
    loanTerm: "",
  };

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      name: "",
      country: "",
      currency: "",
      interestRate: 0,
      maxLoan: 0,
      minDownPayment: 0,
      loanTerm: 0,
    });
  };

  inputNameId = shortid.generate();
  inputCountryId = shortid.generate();
  inputCurrencyId = shortid.generate();
  inputInterestRateId = shortid.generate();
  inputMaxLoanId = shortid.generate();
  inputMinDownPaymentId = shortid.generate();
  inputLoanTermId = shortid.generate();

  render() {
    const {
      name,
      country,
      currency,
      interestRate,
      maxLoan,
      minDownPayment,
      loanTerm,
    } = this.state;
    return (
      <Section title="New bank">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor={this.inputNameId}>
            Name
            <input
              className={styles.inputForm}
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              required
              id={this.inputNameId}
            />
          </label>
          <label htmlFor={this.inputCountryId}>
            Country
            <input
              className={styles.inputForm}
              type="text"
              name="country"
              required
              value={country}
              onChange={this.handleChange}
              id={this.inputCountryId}
            />
          </label>
          <label htmlFor={this.inputCurrencyId}>
            Currency
            <input
              className={styles.inputForm}
              type="text"
              name="currency"
              required
              value={currency}
              onChange={this.handleChange}
              id={this.inputCurrencyId}
            />
          </label>
          <label htmlFor={this.inputInterestRateId}>
            Interest rate
            <input
              className={styles.inputForm}
              type="number"
              name="interestRate"
              required
              min="1"
              max="100"
              value={interestRate}
              onChange={this.handleChange}
              id={this.inputInterestRateId}
            />
          </label>
          <label htmlFor={this.inputMaxLoanId}>
            Max loan
            <input
              className={styles.inputForm}
              type="number"
              name="maxLoan"
              required
              min="1000"
              max="1000000"
              value={maxLoan}
              onChange={this.handleChange}
              id={this.inputMaxLoanId}
            />
          </label>
          <label htmlFor={this.inputMinDownPaymentId}>
            min downpayment
            <input
              className={styles.inputForm}
              type="number"
              name="minDownPayment"
              required
              min="1"
              max="100"
              value={minDownPayment}
              onChange={this.handleChange}
              id={this.inputMinDownPaymentId}
            />
          </label>
          <label htmlFor={this.inputLoanTermId}>
            loan term
            <input
              className={styles.inputForm}
              type="number"
              name="loanTerm"
              required
              min="60"
              max="60"
              value={loanTerm}
              onChange={this.handleChange}
              id={this.inputLoanTermId}
            />
          </label>
          <button className={styles.buttonForm} type="submit">
            Add bank
          </button>
        </form>
      </Section>
    );
  }
}

export default Form;

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
