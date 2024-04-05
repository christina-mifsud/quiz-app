"use client"

// REACT
import { useState, useEffect, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
// STYLES
import './quiz-form.css';
import { db, increment } from "@/firebase/config";
import { useAuth } from "@/hooks/useAuth";

type Inputs = {
    answerInput: string
}

export default function QuizForm({
    data,
    questionId
}: any) {
    // STATE

    console.log(data);
    const { currentUser } = useAuth();
    const [countDown, setCountDown] = useState(10);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    

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
        if (!countDown) return;

        const timer = setInterval(() => {
            setCountDown(countDown - 1); 
        }, 1000);

        return () => clearInterval(timer);

    }, [countDown]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="question-form">
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

            <button 
                type="submit"
            >
                Check answer
            </button>
        </form>
    );
}