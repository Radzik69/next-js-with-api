import SeasonSelector from "./[season]/selector";

export default async function FootballApiPage({ params }) {
	const apiKey = "1573eff4a57244bf830e69cb32663363";
	const url = `https://api.football-data.org/v4/competitions/${params.competition}/standings?season=2023`;

	const res = await fetch(url, {
		headers: {
			"X-Auth-Token": apiKey,
		},
	});

	if (!res.ok) {
		console.error("Error fetching data:", res.status);
		throw new Error("Failed to fetch data");
	}

	const data = await res.json();
	const standings = data.standings[0].table;

	return (
		<div className="p-8 bg-gray-50 min-h-screen">
			<h1 className="text-4xl font-bold mb-4 text-blue-800">
				{params.competition} Standings
			</h1>
			<SeasonSelector competition={params.competition} />
			<ul className="mt-4 bg-white shadow-lg rounded-lg p-4">
				{standings.map((team) => (
					<li
						key={team.team.id}
						className="flex justify-between border-b last:border-b-0 py-2"
					>
						<span className="text-lg">
							{team.position}. {team.team.name}
						</span>
						<span className="font-semibold">{team.points} points</span>
					</li>
				))}
			</ul>
		</div>
	);
}
