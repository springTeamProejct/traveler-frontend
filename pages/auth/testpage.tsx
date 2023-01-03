import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function Testpage() {
    const mutation = useMutation(() => {
        const authPhoneTest = { type: 'PHONE', phoneNum: '01098598222' };
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const body = JSON.stringify(authPhoneTest);
        console.log("🚀 ~ file: testpage.tsx:17 ~ mutation ~ body", body)

        return fetch(
            `http://localhost:8000/users/signup/authcode`,
            {
                method: 'POST',
                headers,
                body,
            }
        ).then(res => res.json())
    });


    return (
        <div>
            {mutation.isLoading ? (
                'creating article...'
            ) : (
                <>
                    {mutation.isError ? (
                        <div>An error occurred: {JSON.stringify(mutation?.error)}</div>
                    ) : null}

                    {mutation.isSuccess ? <div>article created!</div> : null}

                    <button
                        onClick={() => mutation.mutate()}
                    >
                        test button
                    </button>
                </>
            )}
        </div>
    );
}