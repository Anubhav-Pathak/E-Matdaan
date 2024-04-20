"use client";
import { useRouter } from "next/navigation";
import useToastStore from "@/store/ToastStore";
import { vote } from "@/utils/actions";

export const DeleteButton = ({type, id, redirect}) => {
  const {addToast} = useToastStore();
  const router = useRouter();
  const clickHandler = async () => {
    const response = await fetch(`/api/delete/${type}?id=${id}`, {method: 'DELETE'});
    if(response.ok) router.push('/'+redirect);
    else addToast({type: 'error', message: 'Failed to delete'});
  }
  return (
    <button className="btn btn-secondary" onClick={clickHandler}>Delete</button>
  )
}

export const VoteButton = ({voterID, electionID, candidateID}) => {
  const clickHandler = async () => {
    await vote(parseInt(voterID), parseInt(electionID), parseInt(candidateID));
  }
  return (
    <button className="btn btn-primary" onClick={clickHandler}>Vote</button>
  )
}