import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PaystackButton } from 'react-paystack';
import HomeHeader from 'menu-items/header';
import HomeFooter from './footer';
import { API_CONFIG } from '../../config/api';
import { formatPetAge } from '../../utils/formatPetAge';
import './virtual-adoption.css';

const naira = (amount) => `₦${Number(amount || 0).toLocaleString()}`;

const VirtualAdoption = () => {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const [dogs, setDogs] = useState([]);
  const [monthlyFeedPrice, setMonthlyFeedPrice] = useState(3000);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [supporterName, setSupporterName] = useState('');
  const [email, setEmail] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const loadDogs = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.baseURL}/virtual-adoption`);
        setDogs(response.data.dogs || []);
        setMonthlyFeedPrice(response.data.monthlyFeedPrice || 3000);
      } catch (error) {
        console.error('Error loading virtual adoptions:', error);
        setNotice('We could not load the dogs right now. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadDogs();
  }, []);

  const closeModal = () => {
    setSelected(null);
    setSupporterName('');
    setEmail('');
  };

  const canPay = supporterName.trim() && email.includes('@') && selected && publicKey;

  return (
    <>
      <HomeHeader />
      <main className="virtual-page">
        <div className="virtual-inner">
          <div className="virtual-hero">
            <p className="virtual-kicker">Virtual adoption</p>
            <h1>
              Feed a dog <span>every month</span>
            </h1>
            <p>
              You do not take the dog home. Your {naira(monthlyFeedPrice)} a month covers feeding. If a dog needs extra
              care, such as an operation, that amount is added to their price.
            </p>
          </div>

          {notice && <p className="virtual-empty">{notice}</p>}

          {loading ? (
            <p className="virtual-empty">Loading dogs…</p>
          ) : dogs.length === 0 ? (
            <p className="virtual-empty">No dogs are available for virtual adoption right now.</p>
          ) : (
            <div className="virtual-grid">
              {dogs.map((dog) => (
                <article className="virtual-card" key={dog._id}>
                  <img src={dog.imageUrl} alt={dog.name} />
                  <div className="virtual-card-body">
                    <h2>{dog.name}</h2>
                    <p className="virtual-meta">
                      {dog.breed || 'Mixed'} · {formatPetAge(dog.age)}
                    </p>
                    <p className="virtual-price">
                      {naira(dog.totalPrice)} <span>/ month</span>
                    </p>
                    <ul className="virtual-breakdown">
                      <li>
                        <span>Monthly feeding</span>
                        <span>{naira(dog.monthlyFeedPrice)}</span>
                      </li>
                      {dog.challenges.map((challenge) => (
                        <li key={challenge._id}>
                          <span>{challenge.title}</span>
                          <span>{naira(challenge.amount)}</span>
                        </li>
                      ))}
                    </ul>
                    <button type="button" onClick={() => setSelected(dog)}>
                      Virtually adopt {dog.name}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      {selected && (
        <div className="virtual-modal" role="dialog" aria-modal="true">
          <div className="virtual-modal-card">
            <h2>Support {selected.name}</h2>
            <p>
              {naira(selected.totalPrice)} this month
              {selected.challenges.length
                ? `, including ${selected.challenges.map((challenge) => challenge.title).join(', ')}`
                : ' for feeding'}
              .
            </p>
            <label htmlFor="supporter-name">
              Your name
              <input
                id="supporter-name"
                value={supporterName}
                onChange={(event) => setSupporterName(event.target.value)}
              />
            </label>
            <label htmlFor="supporter-email">
              Email
              <input
                id="supporter-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <div className="virtual-modal-actions">
              {canPay ? (
                <PaystackButton
                  className="paystack-button"
                  email={email.trim()}
                  amount={selected.totalPrice * 100}
                  publicKey={publicKey}
                  text={`Pay ${naira(selected.totalPrice)}`}
                  metadata={{
                    custom_fields: [
                      { display_name: 'Dog', variable_name: 'dog', value: selected.name },
                      { display_name: 'Supporter', variable_name: 'supporter', value: supporterName.trim() }
                    ]
                  }}
                  onSuccess={async (response) => {
                    try {
                      await axios.post(`${API_CONFIG.baseURL}/virtual-adoption/sponsorships`, {
                        petId: selected._id,
                        supporterName: supporterName.trim(),
                        email: email.trim(),
                        amount: selected.totalPrice,
                        paymentReference: response.reference || response.trxref
                      });
                      setNotice(`Thank you. Your monthly support for ${selected.name} was received.`);
                    } catch (error) {
                      console.error(error);
                      setNotice('Payment succeeded, but we could not save it. Please contact Haven with your receipt.');
                    }
                    closeModal();
                  }}
                  onClose={() => {}}
                />
              ) : (
                <button type="button" className="paystack-button" disabled>
                  Enter your name and email
                </button>
              )}
              <button type="button" className="virtual-modal-close" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <HomeFooter />
    </>
  );
};

export default VirtualAdoption;
