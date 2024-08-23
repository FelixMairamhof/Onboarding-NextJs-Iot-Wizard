"use client";

import React, { useEffect, useState } from 'react';
import Select from '@/components/Select';
import Image from 'next/image';
import { getCustomer, getManufactor, getType, getImageUrl, submitSensorSelection } from './actions';

// Define the form data type
interface FormData {
    customer: string;
    manufactor: string;
    type: string;
}

export default function Onboarding() {
    const [customer, setCustomer] = useState('');
    const [manufactor, setManufactor] = useState('');
    const [type, setType] = useState('');

    const [customerOptions, setCustomerOptions] = useState<string[]>([]);
    const [manufactorOptions, setManufactorOptions] = useState<string[]>([]);
    const [typeOptions, setTypeOptions] = useState<string[]>([]);
    
    // State to manage image URL
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    // Fetch customers when the component mounts
    useEffect(() => {
        const fetchCustomers = async () => {
            const fetchedCustomerOptions = await getCustomer();
            setCustomerOptions(fetchedCustomerOptions);
        };

        fetchCustomers();
    }, []);

    const handleCustomerChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCustomer = event.target.value;
        setCustomer(selectedCustomer);
        
        // Query the database or API to get manufactor options based on selected customer
        const fetchedManufactorOptions = await getManufactor();
        setManufactorOptions(fetchedManufactorOptions);
    };

    const handleManufactorChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedManufactor = event.target.value;
        setManufactor(selectedManufactor);

        // Query the database or API to get type options based on selected manufactor
        const fetchedTypeOptions = await getType(selectedManufactor);
        setTypeOptions(fetchedTypeOptions);
    };

    const handleTypeChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = event.target.value;
        setType(selectedType);

        if (selectedType) {
            // Fetch the image URL as soon as a type is selected
            const imageUrl = await getImageUrl(customer, manufactor, selectedType);
            setImageUrl(imageUrl);
        } else {
            // Clear the image URL if no type is selected
            setImageUrl(null);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Call the server action to submit the data
        await submitSensorSelection(customer, manufactor, type);

        // Optionally, handle post-submission actions like navigation or resetting the form
        console.log('Form submitted with:', { customer, manufactor, type });
    };

    return (
        <form onSubmit={handleSubmit} className="flex min-h-screen flex-col gap-20 bg-neutral items-center p-24">
            <Select
                question="Type in your Customer"
                label="Customer"
                options={customerOptions}
                value={customer}
                onChange={handleCustomerChange}
                disabled={customerOptions.length === 0} // Disabled until customers are loaded
            />
            <Select
                question="Type in your Manufactor"
                label="Manufactor"
                options={manufactorOptions}
                value={manufactor}
                onChange={handleManufactorChange}
                disabled={!customer} // Disabled until a customer is selected
            />
            <Select
                question="Type in your Type"
                label="Type"
                options={typeOptions}
                value={type}
                onChange={handleTypeChange}
                disabled={!manufactor} // Disabled until a manufactor is selected
            />
            {/* Conditionally render the image */}
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt="Onboarding Image"
                    width={200}
                    height={200}
                />
            )}
            <button type="submit" className="btn btn-outline w-full max-w-xs" disabled={!type}>
                Weiter
            </button>
        </form>
    );
}
