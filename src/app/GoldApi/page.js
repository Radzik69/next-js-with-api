"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

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
		<div className="flex flex-wrap justify-center gap-4">
			{data &&
				data.map((day, idx) => {
					const prevPrice = idx < data.length - 1 ? data[idx + 1].cena : null;
					const currentPrice = day.cena;
					let arrowIcon = null;
					if (prevPrice !== null) {
						arrowIcon =
							currentPrice > prevPrice ? (
								<ArrowUp size={40} color="green" />
							) : (
								<ArrowDown size={40} color="red" />
							);
					}

					return (
						<Card key={idx} className="w-64">
							<CardContent>
								<div className="flex justify-between items-center">
									<h2 className="text-xl font-semibold">
										{currentPrice.toFixed(2)} zł
									</h2>
									{arrowIcon}
								</div>
								<p>{day.data}</p>
							</CardContent>
						</Card>
					);
				})}
		</div>
	);
}
