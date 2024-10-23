"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function Goldprice() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getPnbData = async () => {
			try {
				const response = await fetch(
					"https://api.nbp.pl/api/cenyzlota/last/30"
				);
				const dataJson = await response.json();
				setData(dataJson.reverse());
			} catch (error) {
				setError(true);
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		getPnbData();
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>There was an error fetching the data.</p>;

	return (
		<div className="flex flex-wrap justify-center gap-6 p-6 bg-gray-100">
			{data &&
				data.map((day, idx) => {
					const prevPrice = idx < data.length - 1 ? data[idx + 1].cena : null;
					const currentPrice = day.cena;
					let arrowIcon = null;
					let priceChange = currentPrice - prevPrice;

					if (prevPrice !== null) {
						arrowIcon =
							currentPrice > prevPrice ? (
								<div className="flex justify-center items-center text-green-500">
									<TrendingUp size={50} />
								</div>
							) : (
								<div className="flex justify-center items-center text-red-500">
									<TrendingDown size={50} />
								</div>
							);
					}

					return (
						<Card
							key={idx}
							className="w-64 bg-white rounded-lg transition-transform transform hover:scale-105"
						>
							<CardContent className="p-6">
								<div className="flex justify-between">
									<div>
										<h2 className="text-2xl font-bold text-gray-800">
											{currentPrice.toFixed(2)} zł
										</h2>
										<p className="text-sm text-gray-500 mt-2">
											{new Date(day.data).toLocaleDateString()}
										</p>
										<p
											className={`font-medium mt-2 ${
												priceChange > 0 ? "text-green-500" : "text-red-500"
											}`}
										>
											{priceChange > 0
												? `+${priceChange.toFixed(2)} zł`
												: `${priceChange.toFixed(2)} zł`}
										</p>
									</div>

									<div className="flex flex-col items-end justify-between">
										{arrowIcon}
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
		</div>
	);
}
