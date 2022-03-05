import React from "react";
import InvoiceItem from "./invoice-item";
const InvoiceList = ({ invoices }) => {
  return (
    <div className="container p-4 lg:p-10 md:p-6">
      {invoices.map((invoice) => (
        <InvoiceItem
          key={invoice.id}
          id={invoice.id}
          accountName={invoice.customer_name}
          amountPaid={invoice.amount_paid}
          created={invoice.created}
          pdfLink={invoice.invoice_pdf}
          status={invoice.status}
          periodStart={invoice.period_start}
          periodEnd={invoice.period_end}
          billingReason={invoice.billing_reason}
        />
      ))}
    </div>
  );
};

export default InvoiceList;
