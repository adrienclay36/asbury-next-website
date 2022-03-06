import React from "react";
import PaymentItem from "./payment-item";
const InvoiceList = ({ invoices, payments }) => {
  return (
    <div className="container p-4 lg:p-10 md:p-6">
      {payments.map((payment) => (
        <PaymentItem
          key={payment.charges.data[0].id}
          amount={payment.charges.data[0].amount}
          receiptEmail={payment.charges.data[0].receipt_email}
          receiptURL={payment.charges.data[0].receipt_url}
          descriptor={payment.charges.data[0].calculated_statement_descriptor}
          description={payment.description}
          status={payment.status}
          date={payment.created}
        />
      ))}
    </div>
  );
};

export default InvoiceList;
