import React, { useState, useEffect, useRef, forwardRef } from "react";
import axios from "axios";

export const LocalPriceComponent =
	// forwardRef(
	({ index, bookingCurrency, userCurrency, price, setPrice }, ref) => {
		const [localPrice, setLocalPrice] = useState(null);
		const localPriceRef = useRef(localPrice);

		useEffect(() => {}, [localPrice]);

		const convertPrice = async (currency, userCurrency, price) => {
			let convertedPrice;
			try {
				convertedPrice = await axios.get(
					`https://v6.exchangerate-api.com/v6/e286ca59c055230262d2aa60/pair/${bookingCurrency}/${userCurrency}/${price}`
				);

				return convertedPrice;
			} catch (err) {
				convertedPrice = "unavailable";
			}

			return convertedPrice;
		};

		useEffect(() => {
			async function fetchLocalPrice() {
				try {
					const response = await convertPrice(
						bookingCurrency,
						userCurrency,
						price
					);
					// if (response.data.result === "success") {
					setLocalPrice(response.data.conversion_result);
					// localPriceRef.current = response.data.conversion_result;

					setPrice(response.data.conversion_result);
					// }
					// else {
					// 	setLocalPrice("unavailable");
					// }
				} catch (error) {
					console.log(error, `this is the error the converter gave`);
					setLocalPrice("unavailable");
				}
			}

			fetchLocalPrice();
		}, [bookingCurrency, userCurrency, price]);

		return (
			<>
				{localPrice === null ? (
					<>...</>
				) : (
					<>{`${userCurrency} ${localPrice}`}</>
				)}
			</>
		);
	};
// );
