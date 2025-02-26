import React from "react";
import { useState } from "react";

export default function ContactList({ selectedContact, contacts, onSelect }) {
    return (
        <>
            <section className="contacts-container">
                <ul>
                    {contacts.map((contact) => (
                        <li key={contact.email}>
                            <button onClick={() => onSelect(contact)}>
                                {contact.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
};