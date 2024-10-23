"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Calendar,
	CircleGauge,
	MapPinHouse,
	Moon,
	SunSnow,
	Thermometer,
	Wind,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function WeatherForecast() {
	const [dataDzis, setDataDzis] = useState(null);
	const [dataPrzewidywanie, setDataPrzewidywanie] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await fetch(
					"https://api.openweathermap.org/data/2.5/weather?lat=52.237049&lon=21.017532&lang=pl&appid=07bf0aa66592a5f05be1020a41fe073a&units=metric"
				);
				const dataJson = await response.json();
				setDataDzis(dataJson);
			} catch (error) {
				setError(true);
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		getData();
	}, []);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await fetch(
					"https://api.openweathermap.org/data/2.5/forecast?lat=52.237049&lon=21.017532&lang=pl&appid=07bf0aa66592a5f05be1020a41fe073a&units=metric"
				);
				const dataJson = await response.json();
				setDataPrzewidywanie(dataJson);
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

	function getNightWeather(data, date) {
		const dateStr = date;
		const dailyWeather = data.list.filter((item) =>
			item.dt_txt.includes(dateStr)
		);
		const nightWeather = dailyWeather.find((item) =>
			item.dt_txt.includes("00:00:00")
		);
		if (nightWeather && nightWeather.main) {
			return `${nightWeather.main.temp}℃`;
		}
	}

	if (loading) {
		return <p>Ładowanie...</p>;
	}

	if (error) {
		return <p>Błąd wczytywania danych pogodowych.</p>;
	}

	return (
		<div>
			<div className="flex justify-center mb-8">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center justify-center gap-2">
							<Thermometer />
							Temperatura:
							{dataDzis.main.temp}℃
						</CardTitle>
					</CardHeader>
					<CardContent className="text-center space-y-4">
						Data: {new Date().toISOString().slice(0, 10)}
						<div className="text-lg flex items-center justify-center gap-2">
							<SunSnow />
							Opis Pogody: {dataDzis.weather[0].description}
						</div>
						<div className="text-lg flex items-center justify-center gap-2">
							<Wind />
							Prędkość Wiatru: {dataDzis.wind.speed} km/h
						</div>
						<div className="text-lg flex items-center justify-center gap-2">
							<MapPinHouse />
							Miejsce: {dataDzis.name}
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="flex flex-wrap justify-center gap-4">
				{dataPrzewidywanie &&
					dataPrzewidywanie.list.map(
						(weather, idx) =>
							idx % 8 === 0 &&
							idx !== 0 && (
								<Card key={idx}>
									<CardHeader>
										<CardTitle className="text-xl flex items-center justify-center gap-2">
											<Thermometer />
											Temperatura: {weather.main.temp}℃
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4 text-center">
										<div className="text-lg flex items-center justify-center gap-2">
											<Calendar />
											Data: {weather.dt_txt.slice(0, 10)}
										</div>
										<div className="text-lg flex items-center justify-center gap-2">
											<Moon />
											Temperatura Nocą:
											{getNightWeather(
												dataPrzewidywanie,
												weather.dt_txt.slice(0, 10)
											)}
										</div>
										<div className="text-lg flex items-center justify-center gap-2">
											<CircleGauge />
											Ciśnienie: {weather.main.pressure} hPa
										</div>
									</CardContent>
								</Card>
							)
					)}
			</div>
		</div>
	);
}
