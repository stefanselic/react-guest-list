import React, { useState } from 'react';
// import GuestAttending from './GuestAttendingCheckBoxComponent';

export default function Forms() {
  const [firstName, setFirstName] = useState(''); // Value of firstName input is stored here

  const [lastName, setLastName] = useState(''); // Value of LastName input is stored here

  const [guest, setGuest] = useState([]); // Store here the values of firstName and lastName

  const [isAttending, setIsAttending] = useState(false); // State variable is set to guest is not attending by default

  // console.log(guest);

  // Create a function that displays guest firstName and lastName and adds a delete button and a checkbox that says guest is attending or not
  function addGuest(e) {
    setGuest(`${firstName} + ${lastName}`);
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
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
                placeholder="First name*"
              />
            </label>
            <label>
              Last name
              <input
                onKeyDown={addGuest}
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
                placeholder="Last name*"
              />
            </label>
          </form>
        </div>
        <br />
        <br />
        <div>
          <button
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            Add Guest
          </button>
        </div>
        <div>
          <h2>Guest List</h2>
          <div>
            First Name: {firstName}
            <br />
            Last Name: {lastName}
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
}
