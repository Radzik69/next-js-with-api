"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NewsApi() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await fetch(
					"https://newsapi.org/v2/everything?q=fortnite&apiKey=41b3c5a821c744288e5256412c6b7f5c"
				);
				const dataJson = await response.json();
				setData(dataJson);
				console.log(dataJson);
			} catch (error) {
				setError(true);
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		getData();
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading news.</p>;

	return (
		<div className="flex flex-wrap justify-center gap-5 p-5">
			{data &&
				data.articles.map((news, idx) => {
					if (news.content == "[Removed]") {
						return null;
					}
					return (
						<div key={idx} className="max-w-sm border border-gray-500">
							{news.urlToImage ? (
								<div className="mb-6">
									<Image
										src={news.urlToImage}
										alt={news.title}
										width={500}
										height={200}
										className="w-full h-auto"
									/>
								</div>
							) : (
								<div className="mb-6">
									<Image
										src="/images/ImageNotFound.png"
										alt="nie znaleziono zdjecia w artykule"
										width={500}
										height={200}
										className="w-full h-auto"
									/>
								</div>
							)}
							<h1 className="text-xl font-bold mb-3">{news.title}</h1>
							<p className="text-gray-600 mb-3">
								Date Published: {news.publishedAt.slice(0, 10)}
							</p>
							<p className="text-gray-700 mb-3">{news.description}</p>
							<Link
								href={news.url}
								className="text-blue-500 hover:underline w-screen"
								target="_blank"
							>
								MORE
							</Link>
						</div>
					);
				})}
		</div>
	);
}
