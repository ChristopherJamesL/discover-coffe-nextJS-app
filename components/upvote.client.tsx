"use client";

import { upvoteAction } from "@/actions";
import Image from "next/image";
import { useActionState } from "react";

type State = {
  voting: number;
  id: string;
};

export default function Upvote({ voting, id }: State) {
  const initialState = { voting, id };
  const [state, formAction, isPending] = useActionState(
    upvoteAction as (state: State, formData: FormData) => Promise<State>,
    initialState
  );

  return (
    <form action={formAction}>
      <div className="mb-6 flex">
        <Image
          className="border border-black bg-red-700"
          src="/static/icons/star.svg"
          width="24"
          height="24"
          alt="star icon"
        />
        <p className="pl-2">{state.voting}</p>
      </div>
      <button
        disabled={isPending}
        className="min-w-[120px] disabled:opacity-50 disabled:min-w-[120px]"
      >
        {isPending ? "voting..." : "Up vote!"}
      </button>
    </form>
  );
}
