import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Testpage() {
    const getValidationNumber = async () => {
        axios({
            method: "post",
            url: "http://localhost:8000/users/signup/authcode",
            data: {
                type: "phone",
                phoneNum: "01098598222"
            },
        }).then((res) => {
            console.log(res); // 에러코드같은거 보려고 일부로 넣는 편이다.
        });
    };

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
                'Loading...'
            ) : (
                <>
                    {mutation.isError ? (
                        <div>An error occurred: {JSON.stringify(mutation?.error)}</div>
                    ) : null}

                    {mutation.isSuccess ? <div>article created!</div> : null}

                    <button
                        onClick={() => {
                            mutation.mutate();
                            getValidationNumber();
                        }}
                    >
                        test button
                    </button>
                </>
            )}
        </div>
    );
}