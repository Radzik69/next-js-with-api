"use client"; // Required for client-side functionality in Next.js
import Link from "next/link";

export default function Competitions() {
	const competitions = [
		{
			code: "PL",
			name: "Premier League",
			imgUrl: "https://banner2.cleanpng.com/20180626/sxk/aazvdh5yb.webp",
		},
		{
			code: "PD",
			name: "La Liga",
			imgUrl:
				"https://i.pinimg.com/1200x/75/c7/0b/75c70bf13f3d7324b17934cae94f40cc.jpg",
		},
		{
			code: "BL1",
			name: "Bundesliga",
			imgUrl:
				"https://banner2.cleanpng.com/20181126/ijf/kisspng-2-bundesliga-football-fc-bayern-munich-germany-lo-2-bundesliga-hertha-steigt-wieder-auf-extremne-1713918184650.webp",
		},
		{
			code: "SA",
			name: "Serie A",
			imgUrl:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Swy1cy88i2gzsk3xRAgES2W8C9Tr6Rle-g&s",
		},
		{
			code: "FL1",
			name: "Ligue 1",
			imgUrl:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuSbRg5bv4mD7OXk4Qdvv2BJgBUxmv3mVfHw&s",
		},
		{
			code: "DED",
			name: "Eredivisie",
			imgUrl:
				"https://upload.wikimedia.org/wikipedia/commons/4/46/Eredivisie_nuovo_logo.png",
		},
		{
			code: "PPL",
			name: "Primeira Liga",
			imgUrl:
				"https://logowik.com/content/uploads/images/primeira-liga-portugal1725.jpg",
		},
		{
			code: "BSA",
			name: "Campeonato Brasileiro Série A",
			imgUrl:
				"https://upload.wikimedia.org/wikipedia/en/0/04/Campeonato_Brasileiro_S%C3%A9rie_A.png",
		},
		{
			code: "ELC",
			name: "Championship",
			imgUrl:
				"https://logowik.com/content/uploads/images/efl-championship2118.jpg",
		},
	];

	return (
		<div className="p-8 bg-gray-100 min-h-screen">
			<h1 className="text-5xl font-bold mb-10 text-center text-blue-800">
				Football Competitions
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
				{competitions.map((competition) => (
					<Link
						href={`/FootballApi/${competition.code}`}
						key={competition.code}
					>
						<div className="border rounded-lg p-6 text-center bg-white shadow-md hover:shadow-lg transition-shadow transform hover:scale-105">
							<img
								src={competition.imgUrl}
								alt={competition.name}
								className="w-full h-32 object-cover mb-4 rounded-md"
							/>
							<p className="text-lg font-semibold text-gray-800">
								{competition.name}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
