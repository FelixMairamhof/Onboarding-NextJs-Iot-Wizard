import React from 'react';

interface SelectProps {
    question: string;
    options: string[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled: boolean;
    label: string;
}

export default function Select({ question, options, value, onChange, disabled, label }: SelectProps) {
    return (
        <div className={`${disabled ?  'hidden' : 'bg-neutral text-neutral-content' } flex flex-col gap-2 select-bordered w-full max-w-xs`}>
            <label className='px-2' htmlFor="select">{label}</label>
            <select
                className="select bg-neutral text-neutral-content select-bordered w-full max-w-xs"
                value={value}
                onChange={onChange}
                disabled={disabled}
                defaultValue=""
            >
                <option value="" disabled>
                    {question}
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
