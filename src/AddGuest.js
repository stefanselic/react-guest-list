import React, { useEffect, useState } from 'react';
import Guest from './Guest';

const baseUrl =
  'https://express-guest-list-api-memory-data-store--stefanselic.repl.co';

export default function AddGuest() {
  const [firstName, setFirstName] = useState(''); // Value of firstName input is stored here

  const [lastName, setLastName] = useState(''); // Value of LastName input is stored here

  const [guests, setGuests] = useState([]); // Store here the values of firstName and lastName
  const [disabledInputs, setDisabledInputs] = useState(true);

  // State variable is set to guest is not attending by default

  useEffect(() => {
    const fetchGuests = async () => {
      const data = await fetch(`${baseUrl}/guests`);
      const guestsData = await data.json();
      setGuests(guestsData);
      setDisabledInputs(false);
    };

    fetchGuests().catch((e) => console.error(e));
  }, []);

  // Function accepts two arguments required for creating a guest. We call setGuests with an update function that accepts prevState (previous guests), and add new guest to the
  // guests state array.
  // more here: https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state
  const submitGuest = async (firstNameArg, lastNameArg) => {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstNameArg, lastName: lastNameArg }),
    });

    try {
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
    } catch (error) {
      console.error(error);
    }
    setFirstName('');
    setLastName('');
  };

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
    <div>
      <header>
        <h1>Guest List Manager</h1>
      </header>
      <div>
        <h2>Add Guests</h2>
        <div>
          <form>
            <label>
              First name
              <input
                disabled={disabledInputs}
                placeholder="First name*"
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
              />
            </label>
            <label>
              Last name
              <input
                placeholder="Last name*"
                disabled={disabledInputs}
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
                onKeyDown={async (e) => {
                  if (
                    e.key === 'Enter' &&
                    firstName !== '' &&
                    lastName !== ''
                  ) {
                    await submitGuest(firstName, lastName);
                  }
                }}
              />
            </label>
          </form>
        </div>
        <br />
        <br />
        <div>
          <button
            onClick={async () => {
              if (firstName !== '' && lastName !== '') {
                await submitGuest(firstName, lastName);
              }
            }}
          >
            Add Guest
          </button>
        </div>
        <div>
          <h2>Guest List</h2>
          {guests.length > 0 ? (
            guests.map((g) => (
              <div
                key={`guest_${g.id}`}
                data-test-id="guest"
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Guest guest={g} />
                <button
                  aria-label={`Remove ${g.firstName} ${g.lastName}`}
                  onClick={async () => {
                    await deleteGuest(g);
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
      <br />
      <br />
    </div>
  );
}

//  onClick={() => {
//         // 1. create a copy
//         const newPeople = [...users];

//         // 2. update the value
//         newPeople.length = newPeople.length - 1;

//         // 3. set new state
//         setUsers(newPeople);
//       }}
//     >
//       Delete the last user
