import React from "react";
import PropTypes from "prop-types";
import "./banksList.module.css";

const BanksList = ({ banks, onDeleteBank }) => (
  <ul>
    {banks.map(
      ({
        id,
        name,
        country,
        currency,
        interestRate,
        maxLoan,
        minDownPayment,
        loanTerm,
      }) => (
        <li key={id}>
          <p>
            Name: {name}, Country: {country}
          </p>
          <p>
            Currency: {currency}, interestRate: {interestRate},
          </p>
          <p>
            maxLoan: {maxLoan}, minDownPayment: {minDownPayment},
          </p>
          <p>loanTerm: {loanTerm} </p>
          <button type="button" onClick={() => onDeleteBank(name)}>
            Delete
          </button>
        </li>
      )
    )}
  </ul>
);

export default BanksList;

BanksList.propTypes = {
  banks: PropTypes.array.isRequired,
  onDeleteBank: PropTypes.func.isRequired,
};
