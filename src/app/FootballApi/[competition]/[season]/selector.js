"use client"; // This will make the component a Client Component
import { useRouter } from "next/navigation";

const SeasonSelector = ({ competition }) => {
	const router = useRouter();

	const handleSeasonChange = (season) => {
		router.push(`/FootballApi/${competition}/${season}`); // Navigate to the selected season
	};

	return (
		<div className="bg-white p-4 shadow-md rounded-lg mb-6">
			<h2 className="text-xl font-semibold mb-2">Select a Season:</h2>
			<ul className="space-y-2">
				<li
					className="cursor-pointer text-blue-600 hover:underline"
					onClick={() => handleSeasonChange("2024")}
				>
					2024/2025
				</li>
				<li
					className="cursor-pointer text-blue-600 hover:underline"
					onClick={() => handleSeasonChange("2023")}
				>
					2023/2024
				</li>
				<li
					className="cursor-pointer text-blue-600 hover:underline"
					onClick={() => handleSeasonChange("2022")}
				>
					2022/2023
				</li>
			</ul>
		</div>
	);
};

export default SeasonSelector;
