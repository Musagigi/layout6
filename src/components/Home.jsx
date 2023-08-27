import "../css/main.css";
import { useEffect, useState } from "react";
// import Fashion from "./pages/fashion/Fashion";

const categoryId = {
	index: 0,
	fashion: 3,
	tech: 1,
	politics: 4,
	sport: 2,
};

const categoryName = {
	index: "главная",
	fashion: "мода",
	tech: "технологии",
	politics: "политика",
	sport: "спорт",
};

export default function Home() {
	const [category, setCategory] = useState("index");
	const [articles, setArticles] = useState({
		items: [],
		categories: [],
		sources: [],
	});

	function onNavClick(event) {
		event.preventDefault();
		setCategory(event.currentTarget.dataset.href);
	}

	useEffect(() => {
		fetch(
			"https://frontend.karpovcourses.net/api/v2/ru/news/" +
				categoryId[category] || ""
		)
			.then((response) => response.json())
			.then((data) => {
				setArticles(data);
			});
	}, [category]);

	console.log(articles);

	return (
		<div className="container max-2xl:max-w-none h-screen grid grid-rows-layout gap-[135px]">
			<header className="flex mt-9">
				<a
					className="mr-[50px] shrink-0"
					href="/index.html"
					data-href="index"
					onClick={onNavClick}
				>
					<img
						className="w-full h-[90px]"
						src="/img/logo.svg"
						alt="logo"
					/>
				</a>
				<nav>
					<ul className="flex gap-[60px] font-bold text-2xl">
						{["index", "fashion", "tech", "politics", "sport"].map(
							(element) => {
								return (
									<li key={element}>
										<a
											className=" hover:text-orange"
											href="#"
											data-href={element}
											onClick={onNavClick}
										>
											{categoryName[element]}
										</a>
									</li>
								);
							}
						)}
					</ul>
				</nav>
			</header>

			<main className="flex justify-between gap-[90px]">
				<section
					id="main-news"
					className="flex flex-col gap-[50px]"
				>
					{articles.items.slice(0, 3).map((item) => {
						return (
							<article
								key={item.id}
								className="flex flex-row-reverse gap-5"
							>
								<div className="flex flex-col justify-between shrink grow-[3] basis-2/3">
									<h1 className="text-[42px] leading-[50px] font-medium">
										{item.title}
									</h1>
									<span className="text-sm leading-6 font-medium text-orange uppercase -order-1">
										{
											articles.categories.find(
												(catId) => catId.id === item.category_id
											).name
										}
									</span>
									<p className="leading-[26px] mt-8">{item.description}</p>
									<span className="text-sm leading-none font-normal text-grey uppercase">
										{
											articles.sources.find(
												(source) => source.id === item.source_id
											).name
										}
									</span>
								</div>
								<div className="grow shrink-0 basis-1/3">
									<img
										className="object-cover"
										src={encodeURI(item.image)}
										alt="article image"
									/>
								</div>
							</article>
						);
					})}
				</section>
				<aside>
					<ul
						id="second-news"
						className="flex flex-col gap-[35px]"
					>
						{articles.items.slice(3, 12).map((item) => {
							return (
								<li key={item.id}>
									<article className="border-l-8 pl-2">
										<h2>{item.title}</h2>
										<span className="text-xl font-normal leading-6 text-orange uppercase">
											{new Date(item.date).toLocaleDateString("ru-RU", {
												month: "long",
												day: "numeric",
											})}
										</span>
										<span className="ml-1.5 text-xl font-normal leading-6 text-grey uppercase">
											{
												articles.sources.find(
													(source) => source.id === item.source_id
												).name
											}
										</span>
									</article>
								</li>
							);
						})}
					</ul>
				</aside>
			</main>

			<footer className="relative text-white before:bg-dark before:w-[100vw] before:absolute before:top-[0] before:bottom-[0] before:right-[0] before:left-[calc((-100vw+100%)/2)] before:-z-10">
				<div className="flex items-center mt-[22px]">
					<a
						className="mr-[50px] shrink-0"
						href="/index.html"
					>
						<img
							className="w-full h-[33px]"
							src="/img/logo.svg"
							alt="logo"
						/>
					</a>
					<nav>
						<ul className="flex gap-[60px] font-bold text-2xl">
							{["index", "fashion", "tech", "politics", "sport"].map(
								(element) => {
									return (
										<li key={element}>
											<a
												className=" hover:text-orange"
												href="#"
												data-href={element}
												onClick={onNavClick}
											>
												{categoryName[element]}
											</a>
										</li>
									);
								}
							)}
						</ul>
					</nav>
				</div>
				<div className="flex mt-12">
					<div className="mr-auto">
						Сделано на Frontend курсе в
						<a
							className="text-orange inline-block underline"
							href="#"
						>
							Karpov.Courses
						</a>
					</div>
					<span className="">© 2021</span>
				</div>
			</footer>
		</div>
	);
}
