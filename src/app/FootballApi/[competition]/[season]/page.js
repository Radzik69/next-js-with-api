import SeasonSelector from "./selector";

export default async function SeasonPage({ params }) {
	const apiKey = "1573eff4a57244bf830e69cb32663363";
	const urlTable = `https://api.football-data.org/v4/competitions/${params.competition}/standings?season=${params.season}`;
	const urlScorers = `https://api.football-data.org/v4/competitions/${params.competition}/scorers?season=${params.season}`;

	const resTable = await fetch(urlTable, {
		headers: {
			"X-Auth-Token": apiKey,
		},
	});

	const resScorers = await fetch(urlScorers, {
		headers: {
			"X-Auth-Token": apiKey,
		},
	});

	if (!resTable.ok) {
		console.error("Error fetching data:", resTable.status);
		throw new Error("Failed to fetch data");
	}

	if (!resScorers.ok) {
		console.error("Error fetching data:", resScorers.status);
		throw new Error("Failed to fetch data");
	}

	const dataTable = await resTable.json();
	const Table = dataTable.standings[0].table;

	const dataScorers = await resScorers.json();
	const Scorers = dataScorers.scorers;

	return (
		<div className="p-8 bg-gray-50 min-h-screen">
			<SeasonSelector competition={params.competition} />
			<h1 className="text-4xl font-bold mb-4 text-blue-800">
				{params.competition} Standings for Season {params.season}
			</h1>
			<ul className="mt-4 bg-white shadow-lg rounded-lg p-4">
				{Table.map((team) => (
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
			<h2 className="text-3xl font-bold mt-8 text-blue-600">Top Scorers</h2>
			<ul className="mt-4 bg-white shadow-lg rounded-lg p-4">
				{Scorers.map((player) => (
					<li
						key={player.id}
						className="flex justify-between border-b last:border-b-0 py-2"
					>
						<span>
							{player.player.name} ({player.player.nationality}) -{" "}
							{player.team.name}
						</span>
						<span className="font-semibold">{player.goals} goals</span>
					</li>
				))}
			</ul>
		</div>
	);
}
