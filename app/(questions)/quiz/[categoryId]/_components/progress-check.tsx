'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

type ProgressCheckTypes = {
    questionSlug: string;
    progressSlugs: any;
    id: string;
}

export const ProgressCheck = ({
    questionSlug,
    progressSlugs,
    id
}: ProgressCheckTypes ) => {
    // STATE
    const [isCorrect, setIsCorrect] = useState(false);
    const route = useRouter();

    // EVENTS
    const doesProgressExist = useCallback(() => {
        for (const attribute in progressSlugs) {
            console.log(attribute, progressSlugs[attribute])
            if (attribute === questionSlug && progressSlugs[attribute]) {
                setIsCorrect(true);
            }
        }
    }, [progressSlugs, questionSlug]);

    const handleClick = () => {
        route.push(`/quiz/${questionSlug}`)
    }

    // useEffect
    useEffect(() =>  {
        doesProgressExist()
    }, [doesProgressExist])

    // console.log(questionSlug);

    return (
    <button
        onClick={handleClick}
        className="quiz-card"
        disabled={isCorrect}
      >
          {/* I am question-one etc. card */}
          <h3>{id}</h3>
      </button>
    // <>
    //     {isCorrect ? (<h1>Is Correct</h1>) : (<h1>Is not Correct</h1>)}
    // </>
    )
}