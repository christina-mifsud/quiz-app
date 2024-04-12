"use client"

// REACT
import { useState, useEffect, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
// STYLES
import './quiz-form.css';
import { db, increment } from "@/firebase/config";
import { useAuth } from "@/hooks/useAuth";
import { get } from "http";

type Inputs = {
    answerInput: string
}

export default function QuizForm({
    data,
    questionId
}: any) {
    // STATE
    const { currentUser } = useAuth();
    const [countDown, setCountDown] = useState(10);
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<Inputs>();


    console.log(getValues("answerInput"));
    

    // EVENTS
    const onSubmit: SubmitHandler<Inputs> = useCallback(async ({ answerInput }) => {
        if (countDown === 0) {
            if (answerInput === data?.correctAns){
                console.log("hurray we got the correct answer");

                await db.collection('progress').doc('WhEdXBpNsITHbP1qFx6V').set({
                    [questionId]: true
                }, {
                    merge: true
                })                

                await db.collection('users').doc('WhEdXBpNsITHbP1qFx6V').set({
                    experiencePoints: increment(5)
                }, {
                    merge: true
                })
            } else {
                console.log("you got the wrong asnwer")
            }
        }
    }, [countDown, data?.correctAns, questionId]);

    // useEffect
    useEffect(() => {
        if (!countDown) {
            onSubmit({ answerInput: getValues("answerInput") });
            return;
        };

        const timer = setInterval(() => {
            setCountDown(countDown - 1); 
        }, 1000);

        onSubmit({ answerInput: getValues("answerInput") });

        return () => clearInterval(timer);

    }, [countDown, getValues, onSubmit]);

    return (
        <>
            <p>{countDown} seconds</p>
            {data?.answers.length > 0 && data?.answers.map((answer: any) => (
                <label key={answer.id} className="question-formLabel">
                    <input {...register("answerInput", {
                        required: true,
                    })} type="radio" value={answer} />
                    {answer}

                    {errors && <p>{errors["answerInput"]?.message}</p>}
                </label>                    
            ))}
        </>
    );
}