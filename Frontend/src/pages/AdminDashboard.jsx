import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showEventForm, setShowEventForm] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        category: '',
        totalSeats: '',
        ticketPrice: '',
        imageUrl: ''
    });

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
            return;
        }

        fetchData();
    }, [user, navigate]);

    // ==============================
    // FETCH EVENTS + BOOKINGS
    // ==============================
    const fetchData = async () => {
        try {
            setLoading(true);

            const [eventsRes, bookingsRes] = await Promise.all([
                api.get('/events'),
                api.get('/booking/my')
            ]);

            console.log('Events:', eventsRes.data);
            console.log('Bookings:', bookingsRes.data);

            setEvents(eventsRes.data);
            setBookings(bookingsRes.data);

        } catch (error) {
            console.error(
                'Error fetching admin data:',
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    // ==============================
    // CREATE EVENT
    // ==============================
    const handleCreateEvent = async (e) => {
        e.preventDefault();

        try {
            await api.post('/events', formData);

            alert('Event created successfully!');

            setShowEventForm(false);

            setFormData({
                title: '',
                description: '',
                date: '',
                location: '',
                category: '',
                totalSeats: '',
                ticketPrice: '',
                imageUrl: ''
            });

            fetchData();

        } catch (error) {
            console.error('Create event error:', error);

            alert(
                error.response?.data?.message ||
                'Error creating event'
            );
        }
    };

    // ==============================
    // DELETE EVENT
    // ==============================
    const handleDeleteEvent = async (id) => {

        if (!window.confirm('Are you sure you want to delete this event?')) {
            return;
        }

        try {
            await api.delete(`/events/${id}`);

            alert('Event deleted successfully!');

            fetchData();

        } catch (error) {
            console.error('Delete event error:', error);

            alert(
                error.response?.data?.message ||
                'Error deleting event'
            );
        }
    };

    // ==============================
    // CONFIRM BOOKING
    // ==============================
    const handleConfirmBooking = async (id, paymentStatus) => {

        try {
            console.log('Confirming booking:', id);

            const response = await api.put(
                `/booking/${id}/confirm`,
                {
                    paymentStatus
                }
            );

            console.log('Booking confirmed:', response.data);

            alert('Booking confirmed successfully!');

            fetchData();

        } catch (error) {
            console.error(
                'Confirm booking error:',
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                'Error confirming booking'
            );
        }
    };

    // ==============================
    // CANCEL BOOKING
    // ==============================
    const handleCancelBooking = async (id) => {

        if (!window.confirm("Cancel this user's booking request?")) {
            return;
        }

        try {
            await api.delete(`/booking/${id}`);

            alert('Booking cancelled successfully!');

            fetchData();

        } catch (error) {
            console.error(
                'Cancel booking error:',
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                'Error cancelling booking'
            );
        }
    };

    // ==============================
    // LOADING
    // ==============================
    if (loading) {
        return (
            <div className="text-center py-20 text-xl font-semibold">
                Loading admin panel...
            </div>
        );
    }

    // ==============================
    // DASHBOARD
    // ==============================
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">

            {/* ================= HEADER ================= */}
            <div className="bg-black text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">

                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
                        Admin Dashboard
                    </h1>

                    <p className="text-gray-300">
                        Manage events and manually confirm bookings.
                    </p>
                </div>

                <button
                    onClick={() => setShowEventForm(!showEventForm)}
                    className="w-full md:w-auto bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition shadow-md"
                >
                    {showEventForm
                        ? 'Cancel Creation'
                        : '+ Create New Event'}
                </button>

            </div>


            {/* ================= STATS ================= */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                {/* Revenue */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">

                    <div>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">
                            Total Revenue
                        </p>

                        <h3 className="text-3xl font-black text-green-600">
                            ₹
                            {bookings.reduce(
                                (sum, b) =>
                                    b.paymentStatus === 'paid' &&
                                    b.status === 'confirmed'
                                        ? sum + b.amount
                                        : sum,
                                0
                            )}
                        </h3>
                    </div>

                    <div className="w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xl font-bold">
                        ₹
                    </div>

                </div>


                {/* Paid Clients */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">

                    <div>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">
                            Paid Clients
                        </p>

                        <h3 className="text-3xl font-black text-blue-600">
                            {
                                new Set(
                                    bookings
                                        .filter(
                                            b =>
                                                b.paymentStatus === 'paid' &&
                                                b.status === 'confirmed'
                                        )
                                        .map(b => b.userId?._id)
                                ).size
                            }
                        </h3>
                    </div>

                    <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-xl font-bold">
                        👤
                    </div>

                </div>


                {/* Pending */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">

                    <div>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">
                            Pending Requests
                        </p>

                        <h3 className="text-3xl font-black text-yellow-600">
                            {
                                bookings.filter(
                                    b => b.status === 'pending'
                                ).length
                            }
                        </h3>
                    </div>

                    <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xl font-bold">
                        ⏳
                    </div>

                </div>

            </div>


            {/* ================= CREATE EVENT FORM ================= */}

            {showEventForm && (

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">

                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Create New Event
                    </h2>

                    <form
                        onSubmit={handleCreateEvent}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >

                        <input
                            required
                            type="text"
                            placeholder="Event Title"
                            className="border px-4 py-3 rounded-lg"
                            value={formData.title}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value
                                })
                            }
                        />

                        <input
                            required
                            type="text"
                            placeholder="Category"
                            className="border px-4 py-3 rounded-lg"
                            value={formData.category}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    category: e.target.value
                                })
                            }
                        />

                        <input
                            required
                            type="date"
                            className="border px-4 py-3 rounded-lg"
                            value={formData.date}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    date: e.target.value
                                })
                            }
                        />

                        <input
                            required
                            type="text"
                            placeholder="Location"
                            className="border px-4 py-3 rounded-lg"
                            value={formData.location}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    location: e.target.value
                                })
                            }
                        />

                        <input
                            required
                            type="number"
                            placeholder="Total Seats"
                            className="border px-4 py-3 rounded-lg"
                            value={formData.totalSeats}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    totalSeats: e.target.value
                                })
                            }
                        />

                        <input
                            required
                            type="number"
                            placeholder="Ticket Price"
                            className="border px-4 py-3 rounded-lg"
                            value={formData.ticketPrice}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    ticketPrice: e.target.value
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Image URL"
                            className="border px-4 py-3 rounded-lg md:col-span-2"
                            value={formData.imageUrl}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    imageUrl: e.target.value
                                })
                            }
                        />

                        <textarea
                            required
                            placeholder="Event Description"
                            className="border px-4 py-3 rounded-lg md:col-span-2 h-32"
                            value={formData.description}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value
                                })
                            }
                        />

                        <button
                            type="submit"
                            className="md:col-span-2 bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black"
                        >
                            Publish Event
                        </button>

                    </form>

                </div>

            )}


            {/* ================= EVENTS + BOOKINGS ================= */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* ================= EVENTS ================= */}

                <div>

                    <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">

                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 text-sm">
                            {events.length}
                        </span>

                        All Events

                    </h2>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                        <ul className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">

                            {events.length === 0 ? (

                                <li className="p-6 text-gray-500 text-center">
                                    No events created yet.
                                </li>

                            ) : (

                                events.map(event => (

                                    <li
                                        key={event._id}
                                        className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                                    >

                                        <div>

                                            <h4 className="font-bold text-gray-900 mb-1">
                                                {event.title}
                                            </h4>

                                            <div className="text-sm text-gray-500">

                                                {new Date(
                                                    event.date
                                                ).toLocaleDateString()}

                                                {' • '}

                                                {event.availableSeats}/
                                                {event.totalSeats} seats

                                            </div>

                                        </div>

                                        <button
                                            onClick={() =>
                                                handleDeleteEvent(event._id)
                                            }
                                            className="text-red-500 border border-red-200 px-4 py-2 rounded-lg text-sm font-bold"
                                        >
                                            Delete
                                        </button>

                                    </li>

                                ))

                            )}

                        </ul>

                    </div>

                </div>


                {/* ================= BOOKINGS ================= */}

                <div>

                    <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">

                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 text-sm font-bold">
                            {bookings.length}
                        </span>

                        Booking Requests

                    </h2>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                        <ul className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">

                            {bookings.length === 0 ? (

                                <li className="p-6 text-gray-500 text-center">
                                    No bookings yet.
                                </li>

                            ) : (

                                bookings.map(booking => (

                                    <li
                                        key={booking._id}
                                        className="p-6 border-l-4 border-l-yellow-400"
                                    >

                                        {/* Event */}
                                        <div className="flex justify-between items-start mb-3">

                                            <h4 className="font-bold text-gray-900 text-lg">
                                                {booking.eventId?.title ||
                                                    'Deleted Event'}
                                            </h4>

                                            <span className="px-2 py-1 text-xs font-bold rounded bg-yellow-100 text-yellow-700 uppercase">
                                                {booking.status}
                                            </span>

                                        </div>


                                        {/* User Details */}
                                        <div className="bg-gray-50 rounded-lg p-3 mb-3 text-sm">

                                            <p className="text-gray-700 mb-1">
                                                <strong>User:</strong>{' '}
                                                {booking.userId?.name}
                                            </p>

                                            <p className="text-gray-700 mb-1">
                                                <strong>Email:</strong>{' '}
                                                {booking.userId?.email}
                                            </p>

                                            <p className="text-gray-700 mb-1">
                                                <strong>Amount:</strong>{' '}
                                                ₹{booking.amount}
                                            </p>

                                            <p className="text-gray-700">
                                                <strong>Payment:</strong>{' '}
                                                {booking.paymentStatus}
                                            </p>

                                        </div>


                                        {/* ADMIN BUTTONS */}

                                        {booking.status === 'pending' && (

                                            <div className="flex flex-wrap gap-2">

                                                <button
                                                    onClick={() =>
                                                        handleConfirmBooking(
                                                            booking._id,
                                                            'paid'
                                                        )
                                                    }
                                                    className="flex-1 bg-green-600 text-white font-bold py-2 px-3 rounded-lg"
                                                >
                                                    ✓ Approve as Paid
                                                </button>


                                                <button
                                                    onClick={() =>
                                                        handleConfirmBooking(
                                                            booking._id,
                                                            'not_paid'
                                                        )
                                                    }
                                                    className="flex-1 bg-gray-800 text-white font-bold py-2 px-3 rounded-lg"
                                                >
                                                    ✓ Approve Undecided
                                                </button>


                                                <button
                                                    onClick={() =>
                                                        handleCancelBooking(
                                                            booking._id
                                                        )
                                                    }
                                                    className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg"
                                                >
                                                    ✕ Reject
                                                </button>

                                            </div>

                                        )}

                                    </li>

                                ))

                            )}

                        </ul>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AdminDashboard;