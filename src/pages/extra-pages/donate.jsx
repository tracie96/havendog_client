import React, { useState, useEffect, useRef } from 'react';
import { PaystackButton } from 'react-paystack';
import HomeHeader from 'menu-items/header';
import HomeFooter from './footer';
import './donate.css';

const SUGGESTED_AMOUNTS = [1000, 3000, 5000, 10000];

const DonatePage = () => {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const [values, setValues] = useState({ email: '', amount: '', firstname: '', lastname: '' });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const amountRef = useRef(null);
  const amountIsCustom = values.amount !== '' && !SUGGESTED_AMOUNTS.includes(Number(values.amount));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paystackProps = {
    email: values.email,
    amount: Number(values.amount) * 100,
    publicKey,
    text: `Donate ₦${Number(values.amount).toLocaleString()}`,
    onSuccess: () => {
      setOpenModal(true);
      setValues({ email: '', amount: '', firstname: '', lastname: '' });
      setTouched({});
      setErrors({});
    },
    onClose: () => {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (name === 'email') {
      setErrors({ ...errors, email: value && !value.includes('@') ? 'Please enter a valid email' : '' });
    } else if (name === 'amount') {
      setErrors({ ...errors, amount: value !== '' && Number(value) <= 0 ? 'Amount must be greater than 0' : '' });
    }
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const isFormValid = () => values.email && Number(values.amount) > 0 && !errors.email && !errors.amount;

  return (
    <>
      <HomeHeader />
      <main className="donate-page">
        <div className="donate-wrap">
          <div className="donate-hero">
            <p className="donate-kicker">Support the shelter</p>
            <h1>
              Help animals across <span>Nigeria</span>
            </h1>
            <p>
              Your gift goes to Haven Pet Home and Animal Care Foundation: rescue, medical care, food, and shelter
              while we find forever homes.
            </p>
          </div>

          <div className="donate-layout">
            <div>
              <div className="donate-points">
                <article className="donate-point">
                  <h2>Rescue</h2>
                  <p>Pull stray and surrendered animals off the street and into care.</p>
                </article>
                <article className="donate-point">
                  <h2>Feed and treat</h2>
                  <p>Cover daily food, vaccinations, and veterinary care at the shelter.</p>
                </article>
                <article className="donate-point">
                  <h2>Rehome</h2>
                  <p>Give each animal time and support until a family is ready.</p>
                </article>
              </div>
              <a className="donate-gofund" href="https://gofund.me/1275b0cb8" target="_blank" rel="noopener noreferrer">
                Or click here to support us on GoFundMe
              </a>
            </div>

            <form className="donate-form" onSubmit={(event) => event.preventDefault()}>
              <h2>Make a donation</h2>
              <p>Pay securely with Paystack. Any amount helps.</p>

              <div className="donate-fields">
                <div className="donate-names">
                  <label htmlFor="first-name">
                    First name
                    <input
                      id="first-name"
                      type="text"
                      name="firstname"
                      value={values.firstname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Ada"
                    />
                  </label>
                  <label htmlFor="last-name">
                    Last name
                    <input
                      id="last-name"
                      type="text"
                      name="lastname"
                      value={values.lastname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Okafor"
                    />
                  </label>
                </div>

                <label htmlFor="email-login">
                  Email address
                  <input
                    id="email-login"
                    type="email"
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="you@email.com"
                  />
                  {touched.email && errors.email && <span className="donate-error">{errors.email}</span>}
                </label>

                <label htmlFor="amount">
                  Amount (NGN)
                  <input
                    id="amount"
                    type="number"
                    min="1"
                    name="amount"
                    value={values.amount}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Any amount"
                    ref={amountRef}
                  />
                  <span className="donate-amounts">
                    {SUGGESTED_AMOUNTS.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className={Number(values.amount) === amount ? 'is-active' : ''}
                        onClick={() => {
                          setValues((current) => ({ ...current, amount: String(amount) }));
                          setErrors((current) => ({ ...current, amount: '' }));
                        }}
                      >
                        ₦{amount.toLocaleString()}
                      </button>
                    ))}
                    <button
                      type="button"
                      className={amountIsCustom ? 'is-active' : ''}
                      onClick={() => {
                        if (SUGGESTED_AMOUNTS.includes(Number(values.amount))) {
                          setValues((current) => ({ ...current, amount: '' }));
                        }
                        setErrors((current) => ({ ...current, amount: '' }));
                        amountRef.current?.focus();
                      }}
                    >
                      Or more
                    </button>
                  </span>
                  <span className="donate-hint">These are suggestions. You can type any amount.</span>
                  {touched.amount && errors.amount && <span className="donate-error">{errors.amount}</span>}
                </label>

                {isFormValid() ? (
                  <PaystackButton className="donate-pay" {...paystackProps} />
                ) : (
                  <button type="button" className="donate-pay-disabled" disabled>
                    Enter a valid email and amount
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>

      {openModal && (
        <div className="donate-modal" role="dialog" aria-modal="true" aria-labelledby="donation-success-modal">
          <div className="donate-modal-card">
            <h2 id="donation-success-modal">Thank you</h2>
            <p>Your donation was received. It helps us keep feeding, treating, and rehoming animals in our care.</p>
            <button type="button" onClick={() => setOpenModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      <HomeFooter />
    </>
  );
};

export default DonatePage;
