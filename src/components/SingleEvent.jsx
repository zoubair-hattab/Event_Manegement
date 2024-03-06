import { Button, Card } from 'flowbite-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalCom from './ModalCom';

const SingleEvent = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Card
        className=" hover:-translate-y-2 hover:scale-105 duration-100 "
        imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
        renderImage={() => (
          <div className="max-h-[160px] h-full">
            <img
              src={item.image}
              alt="image 1"
              className="h-full w-full object-fit"
            />
          </div>
        )}
      >
        <Link to="#">
          <h5 className="text-lg font-semibold tracking-tight text-gray-900  dark:text-white">
            {item.title}
          </h5>
        </Link>
        <div className=" flex flex-col gap-1">
          <p className="text-indigo-500 flex justify-between items-center dark:text-white">
            number of People
            <span className="text-gray-600">{item.Participante}</span>
          </p>

          <p className="text-indigo-500  flex justify-between items-center dark:text-white ">
            End Date <span className="text-gray-600">{item.endDate}</span>
          </p>
          <p className=" text-indigo-500 flex justify-between items-center dark:text-white">
            Price
            <span className="text-gray-600 text-xl font-bold">
              {item.price == 0 ? 'Free' : item.price + 'MATIC'}
            </span>
          </p>
        </div>

        <Button
          type="button"
          gradientDuoTone="purpleToPink"
          onClick={() => setOpenModal(true)}
          outline
        >
          View More
        </Button>
      </Card>
      {openModal && (
        <ModalCom
          openModal={openModal}
          setOpenModal={setOpenModal}
          item={item}
        />
      )}
    </>
  );
};

export default SingleEvent;
