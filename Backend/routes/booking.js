const express=require('express');
const router=express.Router();
const { bookEvent, confirmBooking, getMyBookings, cancelBooking, sendBookingOTP } = require('../controller/bookingController');
const {protect,admin}=require('../middleware/auth');

router.post('/',protect,bookEvent);
router.post('/send-otp',protect,sendBookingOTP);
router.get('/my',protect,getMyBookings);
router.put('/:id/confirm',protect,admin,confirmBooking);
router.delete('/:id',protect,cancelBooking);

module.exports=router;

