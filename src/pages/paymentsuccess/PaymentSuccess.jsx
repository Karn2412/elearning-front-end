import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

function PaymentSuccess({ user }) {
  const params = useParams(); // to get the payment ID from the URL

  if (!user) return null; // don't show anything if user is not available

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-5 rounded-4 shadow-lg text-center"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <CheckCircle size={48} color="#4BB543" className="mb-3" />
        <h4 className="text-success fw-bold">Payment Successful</h4>
        <p className="text-muted mb-2">
          Your course subscription has been activated.
        </p>
        <p className="text-secondary small">
          Reference no – <code>{params.id}</code>
        </p>
        <Link
          to={`/account/course/study/${user._id}/dashboard`}
          className="btn btn-primary mt-4 px-4"
        >
          Go to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}

export default PaymentSuccess;
