import React, { useEffect } from "react";

const Toast = ({ message, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 2500);
		return () => clearTimeout(timer);
	}, [onClose]);

	return <div className="toast">{message}</div>;
};

export default Toast;
