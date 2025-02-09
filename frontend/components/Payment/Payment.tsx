import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Modal, Notification, useToaster } from "rsuite";
import { useCreatePaymentMutation, useGetUserPaymentsQuery } from "../../src/store/features/paymentApiSlice/paymentApiSlice";
import { useCreateTourMutation } from "../../src/store/features/tourApiSlice/tourApiSlice";
import "./Payment.scss";

type Props = {
  person: number;
  date: Date;
  nameSurname: string;
  email: string;
  ticket: string;
  onePrice: number;
  openPayment: boolean;
  setOpenPayment: (open: boolean) => void;
  location: string;
};

const Payment = ({
  person,
  date,
  nameSurname,
  email,
  ticket,
  onePrice,
  openPayment,
  setOpenPayment,
  location,
}: Props) => {
  const toaster = useToaster();
  const navigate = useNavigate();
  const [cardType, setCardType] = useState<"visa" | "mastercard" | null>(null);
  const [saveCard, setSaveCard] = useState(false);
  const [selectedSection, setSelectedSection] = useState<"credit" | "paypal" | null>("credit");
  const [paymentInfos, setPaymentInfos] = useState({
    cardNumber: "",
    nameSurname: "",
    email: "",
    expDate: "",
    cvv: "",
    paypalNameSurname: "",
    paypalEmail: "",
  });
  const [createTour, { isLoading }] = useCreateTourMutation();
  const [createPayment] = useCreatePaymentMutation();

  const { data: payments } = useGetUserPaymentsQuery();

  useEffect(() => {
    if (payments && payments.length > 0) {
      setPaymentInfos({
        cardNumber: payments[0].cardNumber,
        nameSurname: payments[0].nameSurname,
        email: payments[0].email,
        expDate: payments[0].expDate,
        cvv: payments[0].cvv,
        paypalNameSurname: payments[0].paypalNameSurname,
        paypalEmail: payments[0].paypalEmail,
      });
    }
  }, [payments]);

  const checkCardType = (number: string) => {
    if (/^4/.test(number)) {
      setCardType("visa");
    } else if (/^5[1-5]/.test(number)) {
      setCardType("mastercard");
    } else {
      setCardType(null);
    }
  };

  const handlePaymentSubmit = async () => {
    const isValidEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (selectedSection === "credit" && !isValidEmail.test(paymentInfos.email)) {
      toaster.push(<Notification type="error" header="Invalid Email">Please enter a valid email address.</Notification>, { placement: "topEnd", duration: 3000 });
      return;
    } else if (selectedSection === "paypal" && !isValidEmail.test(paymentInfos.paypalEmail)) {
      toaster.push(<Notification type="error" header="Invalid Email">Please enter a valid PayPal email address.</Notification>, { placement: "topEnd", duration: 3000 });
      return;
    }

    if (paymentInfos.cardNumber && paymentInfos.cvv && paymentInfos.expDate && paymentInfos.nameSurname) {
      try {
        const resTour = await createTour({
          date,
          person,
          nameSurname,
          email,
          ticket,
          location,
        }).unwrap();
        
        if (saveCard) {
          const resPayment = await createPayment({
            cardNumber: paymentInfos.cardNumber,
            nameSurname: paymentInfos.nameSurname,
            email: paymentInfos.email,
            expDate: paymentInfos.expDate,
            cvv: paymentInfos.cvv,
            paypalNameSurname: paymentInfos.paypalNameSurname,
            paypalEmail: paymentInfos.paypalEmail,
          }).unwrap();
        }

        setOpenPayment(false);
        setPaymentInfos({
          cardNumber: "",
          nameSurname: "",
          email: "",
          expDate: "",
          cvv: "",
          paypalNameSurname: "",
          paypalEmail: "",
        });

        navigate("/");
        toaster.push(<Notification>Payment Success! 🎉 Thank you for your booking.</Notification>, { placement: "topEnd" });
      } catch (error) {
        toaster.push(<Notification type="error" header="Payment Failed">Something went wrong, please try again.</Notification>, { placement: "topEnd", duration: 3000 });
      }
    }
  };

  return (
    <Modal open={openPayment} size="lg" onClose={() => setOpenPayment(false)}>
      <Modal.Header>
        <Modal.Title>Payment</Modal.Title>
        <p>Please fill in the requested information</p>
      </Modal.Header>
      <Modal.Body>
        <div className="payment-options">
          <div className="payment-section">
            <div className="payment-type">
              <input
                type="radio"
                name="paymentOption"
                value="credit"
                id="creditCard"
                checked={selectedSection === "credit"}
                onChange={() => setSelectedSection("credit")}
              />
              <label htmlFor="creditCard">Credit / Debit Card</label>
              <img src="visa-mastercard-logos.png" alt="Visa MasterCard" />
            </div>

            {selectedSection === "credit" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="credit-form">
                <Divider />
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={paymentInfos.cardNumber}
                    onChange={(e) => {
                      checkCardType(e.target.value);
                      setPaymentInfos({ ...paymentInfos, cardNumber: e.target.value });
                    }}
                    maxLength={19}
                    placeholder="5134 5678 9012 3456"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nameSurname">Name on Card</label>
                  <input
                    type="text"
                    id="nameSurname"
                    value={paymentInfos.nameSurname}
                    onChange={(e) => setPaymentInfos({ ...paymentInfos, nameSurname: e.target.value })}
                    placeholder="John Smith"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={paymentInfos.email}
                    onChange={(e) => setPaymentInfos({ ...paymentInfos, email: e.target.value })}
                    placeholder="test@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expDate">Expiration Date</label>
                  <input
                    type="text"
                    id="expDate"
                    value={paymentInfos.expDate}
                    onChange={(e) => setPaymentInfos({ ...paymentInfos, expDate: e.target.value })}
                    maxLength={5}
                    placeholder="MM/YY"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    value={paymentInfos.cvv}
                    onChange={(e) => setPaymentInfos({ ...paymentInfos, cvv: e.target.value })}
                    maxLength={3}
                    placeholder="123"
                  />
                </div>
                <div className="form-group">
                  <Button
                    appearance="primary"
                    onClick={handlePaymentSubmit}
                    disabled={ 
                      !paymentInfos.cardNumber || !paymentInfos.cvv || !paymentInfos.expDate || !paymentInfos.nameSurname || !paymentInfos.email
                    }
                  >
                    Pay Now
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Placeholder for Khalti payment integration */}
          <div className="payment-section">
            <h4>Khalti Payment (Integration Pending)</h4>
            <p>This section will integrate Khalti payment gateway. Stay tuned!</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Payment;
