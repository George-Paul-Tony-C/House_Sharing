import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, User, CheckCircle } from 'lucide-react';

const RoomBookingHistory = () => {
    const { roomId } = useParams();
    const [bookingHistory, setBookingHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookingHistory = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.BOOKING.GET_ROOM_BOOKINGS(roomId));
                setBookingHistory(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchBookingHistory();
    }, [roomId]);

    // Format date to readable format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-xl text-gray-800 mb-4">Booking History</h3>
            
            {loading ? (
                <div className="flex justify-center py-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : bookingHistory.length > 0 ? (
                <div className="space-y-4">
                    {bookingHistory.map((booking) => (
                        <div 
                            key={booking.bookingId} 
                            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex justify-between items-start flex-wrap gap-2">
                                <div className="flex items-center">
                                    <User size={18} className="text-blue-600 mr-2" />
                                    <span className="font-medium">{booking.user.name}</span>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                                    {booking.status}
                                </div>
                            </div>
                            
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex items-center text-gray-600">
                                    <Calendar size={16} className="mr-2" />
                                    <div>
                                        <p className="text-xs text-gray-500">Start Date</p>
                                        <p>{formatDate(booking.startDate)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Calendar size={16} className="mr-2" />
                                    <div>
                                        <p className="text-xs text-gray-500">End Date</p>
                                        <p>{formatDate(booking.endDate)}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-2 text-sm text-gray-500 flex items-center">
                                <Clock size={14} className="mr-1" />
                                <span>Booked on {formatDate(booking.bookedDate)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <p>No booking history available for this room.</p>
                </div>
            )}
        </div>
    );
};

export default RoomBookingHistory;