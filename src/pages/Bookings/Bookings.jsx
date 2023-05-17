/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import BookingsRow from './BookingsRow';

const Bookings = () => {
    const { user } = useContext(AuthContext);

    const [bookings, setBookings] = useState([]);

    // const url =;
    useEffect(() => {
        fetch(`http://localhost:3000/bookings?email=${user?.email}`, {
            method: "GET",
            headers:{
                authorization: `Bearer ${localStorage.getItem('car-access-token ')}`
            }
        })
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [])




    const handelDelete = id => {
        const proceed = confirm("are you sure you want to delete");
        if (proceed) {
            fetch(`http://localhost:3000/bookings/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert("deleted successfully")
                        const remaining = bookings.filter(booking => bookings._id !== id)
                        setBookings(remaining);
                    }
                })
        }
    }

    const handelBookingConfirm = id => {
        fetch(`http://localhost:3000/bookings/${id}`, {
            method: "PATCH",
            headers:{
                'content-type': 'application/josn'
            },
            body: JSON.stringify({status: 'confirm'})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    // update state
                    const remaining = bookings.filter(booking => booking._id !==id)
                    const update = bookings.find(booking=> booking._id ===id)
                    update.status = 'confirm';

                    const newBooking = [update, ...remaining];
                    setBookings(newBooking);
                }
            })
    }

    return (
        <div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>stuts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingsRow
                                key={booking._id}
                                booking={booking}
                                handelDelete={handelDelete}
                                handelBookingConfirm={handelBookingConfirm}
                            ></BookingsRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;