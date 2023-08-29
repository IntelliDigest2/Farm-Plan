import React, { useState, useEffect } from "react";

const Image = ({ imageUrl }) => {
	const [imageSrc, setImageSrc] = useState("");

	useEffect(() => {
		const fetchImage = async () => {
			const response = await fetch(imageUrl);
			const blob = await response.blob();
			const url = URL.createObjectURL(blob);
			setImageSrc(url);
		};
		fetchImage();
	}, [imageUrl]);

	return <img src={imageSrc} alt=" for product" />;
};

export default Image;
