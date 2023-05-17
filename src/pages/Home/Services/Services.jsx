/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ServicesCard from './ServicesCard';

const Services = () => {

    const [services, setServices] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:3000/services")
        .then(res => res.json())
        .then(data => setServices(data))
    }, [])

    console.log(services);
    return (
        <div className="">
            <div className="text-center">
                <h1 className="text-3xl text-orange-500" >Our services</h1>
                <h1 className="text-5xl ">Our Service Area</h1>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-col-3 gap-6">
               {
                services.map(service => <ServicesCard
                     key={service._id}
                     service={service}
                     ></ServicesCard>)
               }
            </div>
        </div>
    );
};

export default Services;