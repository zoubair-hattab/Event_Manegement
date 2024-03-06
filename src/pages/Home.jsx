import { Button, Card } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import EventComp from '../components/EventComp';

const Home = () => {
  return (
    <div className="h-screen">
      <EventComp />
    </div>
  );
};

export default Home;
