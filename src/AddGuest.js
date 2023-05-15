import React, { useEffect, useState } from 'react';
// import GuestAttending from './GuestAttendingCheckBoxComponent';
import GuestAttending from './GuestAttendingCheckBoxComponent';

export default function AddGuest() {
  const [firstName, setFirstName] = useState(''); // Value of firstName input is stored here

  const [lastName, setLastName] = useState(''); // Value of LastName input is stored here

  const [guest, setGuest] = useState([]); // Store here the values of firstName and lastName

  const [isAttending, setIsAttending] = useState(false); // State variable is set to guest is not attending by default

  // Create a function that displays guest firstName and lastName and adds a delete button and a checkbox that says guest is attending or not
  function addGuest(firstName, lastName) {
    return { firstName };
  }
  console.log(firstName, lastName);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <header>
        <h1>Guest List Manager</h1>
      </header>
      <div data-test-id="guest">
        <h2>Add Guests</h2>
        <div>
          <form>
            <label>
              First name
              <input
                placeholder="First name*"
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
              />
            </label>
            <label>
              Last name
              <input
                placeholder="Last name*"
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
                onKeyDown={() => {
                  // e.preventDefault();
                  setGuest([
                    ...guest,
                    { firstName: firstName, lastName: lastName },
                  ]);
                }}
              />
            </label>
          </form>
        </div>
        <br />
        <br />
        <div>
          <button
            onClick={() => {
              // e.preventDefault();
              setGuest([
                ...guest,
                { firstName: firstName, lastName: lastName },
              ]);
              console.log(guest);
            }}
          >
            Add Guest
          </button>
        </div>
        <div>
          <h2>Guest List</h2>
          <div>
            {guest.map((g) => {
              return (
                <div>
                  {g.firstName} {g.lastName}
                  <GuestAttending />
                </div>
              );
            })}
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
}
