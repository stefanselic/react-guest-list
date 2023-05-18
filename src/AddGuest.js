import React, { useEffect, useState } from 'react';
import Guest from './Guest';
import styles from './AddGuest.module.scss';

const baseUrl =
  'https://express-guest-list-api-memory-data-store--stefanselic.repl.co';

export default function AddGuest() {
  const [firstName, setFirstName] = useState(''); // Value of firstName input is stored here
  const [lastName, setLastName] = useState(''); // Value of LastName input is stored here
  const [guests, setGuests] = useState([]); // Store here the values of firstName and lastName
  const [disabledInputs, setDisabledInputs] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data and set reponse to guests state.
  useEffect(() => {
    const fetchGuests = async () => {
      const response = await fetch(`${baseUrl}/guests`);
      const guestsData = await response.json();
      setGuests(guestsData);
      setIsLoading(false);
      setDisabledInputs(false);
    };

    fetchGuests().catch((e) => console.error(e));
  }, []);

  // Function accepts two arguments required for creating a guest. We call setGuests with an update function that accepts prevState (previous guests), and add new guest to the
  // guests state array.
  // more here: https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state
  const submitGuest = async (firstNameArg, lastNameArg) => {
    // wrap in try...catch . If network call failed just log the error to console,
    // if succeded update guests state.
    try {
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstNameArg,
          lastName: lastNameArg,
        }),
      });
      const data = await response.json();
      setGuests((prevState) => {
        return [
          ...prevState,
          {
            firstName: firstNameArg,
            lastName: lastNameArg,
            id: data.id,
            attending: data.attending,
          },
        ];
      });
      setFirstName('');
      setLastName('');
    } catch (error) {
      console.error(error);
    }
  };

  // Network call to delete guests and update guest state
  const deleteGuest = async (guest) => {
    try {
      await fetch(`${baseUrl}/guests/${guest.id}`, {
        method: 'DELETE',
      });

      setGuests((prevState) => {
        const shallowCopy = [...prevState];
        const filteredGuests = shallowCopy.filter((element) => {
          return element.id !== guest.id;
        });
        return filteredGuests;
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.guest}>
      <header>
        <h1>Guest List Manager</h1>
      </header>
      <div className={styles.addGuest}>
        <h2>GUEST Information</h2>
        <form>
          <label>
            <span>First name</span>
            <input
              className={styles.firstName}
              disabled={disabledInputs}
              placeholder="First name*"
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
            />
          </label>
          <label>
            Last name
            <input
              className={styles.lastName}
              placeholder="Last name*"
              disabled={disabledInputs}
              value={lastName}
              onChange={(e) => setLastName(e.currentTarget.value)}
              onKeyDown={async (e) => {
                if (e.key === 'Enter' && firstName !== '' && lastName !== '') {
                  await submitGuest(firstName, lastName);
                }
              }}
            />
          </label>
        </form>
        <br />
        <br />
        <div>
          <button
            className={styles.button}
            onClick={async () => {
              if (firstName !== '' && lastName !== '') {
                await submitGuest(firstName, lastName);
              }
            }}
          >
            Add Guest
          </button>
        </div>
      </div>
      <div>
        <h2>Guest List</h2>
        {!isLoading ? (
          guests.map((guest) => (
            <div
              key={`guest_${guest.id}`}
              data-test-id="guest"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Guest guest={guest} />
              <button
                className={styles.removeButton}
                aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
                onClick={async () => {
                  await deleteGuest(guest);
                }}
              >
                🗑
              </button>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
