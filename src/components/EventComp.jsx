import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReadContract } from 'wagmi';
import { contractAddress, abi } from '../utils/contract';
import SingleEvent from './SingleEvent';
import { formatEther } from 'viem';

const EventComp = () => {
  const navigate = useNavigate();
  const { data: events } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'getAllEvent',
  });

  const eventData = events?.map((event, inede) => ({
    eventID: Number(event.eventID),
    image: event.imageHash,
    title: event.title,
    description: event.description,
    startDate: new Date(Number(event.startDate) * 1000).toLocaleDateString(),
    endDate: new Date(Number(event.endDate) * 1000).toLocaleDateString(),
    price: Number(formatEther(event.price)).toFixed(6),
    totalAmount: Number(formatEther(event?.totalAmount)).toFixed(6),

    owner: event.owner,
    Participante:
      Number(event.raimainTicket) + '/' + Number(event.totaleTicket),
  }));
  console.log(eventData);
  return (
    <div className="grid  max-w-7xl p-3 w-full mx-auto gap-4 my-6 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4">
      {eventData?.map((item, index) => (
        <SingleEvent item={item} key={index} />
      ))}
    </div>
  );
};

export default EventComp;
